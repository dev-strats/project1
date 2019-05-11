import scipy.optimize
import numpy as np
from app.randomizers import market_data_randomizer
from app.utils import math_funcs
from pathos.multiprocessing import ProcessingPool as Pool
import datetime

def eval_strategy_with_params(
    strategyObj,
    paramsMerged,
    startDate,
    endDate,
    mc_paths = None,
    use_multi_process = False,
    num_processes = None,
    verbose = False
    ):
    strategyObj.update(**paramsMerged)

    if mc_paths == None:
        strategyObj.clear_all_values()
        strategyObj.get_values(startDate, endDate)
        stats = strategyObj.get_values_stats(startDate, endDate)
    else:
        all_stats = {}
        if use_multi_process:
            # for each process, we need the seed to be different and deterministic
            def simulate_performance_with_seed(input_seed):
                market_data_randomizer.set_random_seed(input_seed)
                ret = []
                for mc_i in range(mc_paths//num_processes):
                    strategyObj.clear_all_values()
                    strategyObj.get_values(startDate, endDate)
                    stats = strategyObj.get_values_stats(startDate, endDate)
                    ret.append(stats)
                return ret

            input_seeds = [1234 + i * 33 for i in range(num_processes)]
            with Pool(num_processes) as pool:
                res = pool.map(simulate_performance_with_seed, input_seeds)
            all_res = []
            for item in res:
                all_res += item

            for stats in all_res:
                math_funcs.add_dict_in_place(all_stats, stats)
            all_stats = {k:all_stats[k]/len(all_res) for k in all_stats}
            stats = all_stats
        else:
            for mc_i in range(mc_paths):
                strategyObj.clear_all_values()
                strategyObj.get_values(startDate, endDate)
                stats = strategyObj.get_values_stats(startDate, endDate)
                math_funcs.add_dict_in_place(all_stats, stats)
            all_stats = {k:all_stats[k]/mc_paths for k in all_stats}
            stats = all_stats

    return stats

def return_optimizer_with_constraint(
    strategyObj,
    startDate,
    endDate,
    paramsSpace = None, # dictionary with key being param, and value being the range of the param..
    initialParams = None,
    fixParams = None,
    maxDrawDownLimit = None,
    volLimit = None,
    mc_paths = None, # if not None it is used the random mktdata perturbation case.
    use_multi_process = False,
    num_processes = None,
    verbose = False,
    vary_start_date = False, # if true will use average value of varying start dates
    start_date_freq_days = 1
):
    # this function assumes all params for optimization are scalars - more adaptions needed to apply it to non-scalar cases
    # construct a target function by ret with cost on maxDrawDown and vol.
    paramKeys = list(paramsSpace.keys())
    paramRanges = list(paramsSpace.values()) # tuple of (min, max), set to None for no limit on either side
    initGuess = np.array([initialParams[key] for key in paramKeys])

    def target_return_func(params):
        market_data_randomizer.set_random_seed(1234) # this ensures the optimization is on the same set of data
        for i in range(len(params)):
            (lower, upper) = paramRanges[i]
            if (lower != None and params[i] < lower) or (upper != None and params[i] > upper):
                return -1

        paramsToUpdate = {paramKeys[i]:params[i] for i in range(len(params))}
        if verbose:
            print(paramsToUpdate)

        paramsMerged = {**paramsToUpdate, **fixParams}

        if vary_start_date:
            test_dates = [startDate + datetime.timedelta(days = i*start_date_freq_days) for i in range(1+(endDate - startDate).days//start_date_freq_days)]
        else:
            test_dates = [startDate]

        all_stats = {}
        for test_date in test_dates:
            paramsMerged["start_date"] = test_date
            stats = eval_strategy_with_params(
                strategyObj,
                paramsMerged,
                test_date,
                endDate,
                mc_paths = mc_paths,
                use_multi_process = use_multi_process,
                num_processes = num_processes
                )

            if verbose:
                print(test_date, stats)
            math_funcs.add_dict_in_place(all_stats, stats)
        all_stats = {k:all_stats[k]/len(test_dates) for k in all_stats}
        stats = all_stats

        if verbose:
            print(stats)

        ret = stats["return"]
        if maxDrawDownLimit != None:
            if stats["max_draw_down"] < maxDrawDownLimit:
                ret += (stats["max_draw_down"] - maxDrawDownLimit) * 100

        if volLimit != None:
            if stats["volatility"] > volLimit:
                ret += (volLimit - stats["volatility"]) * 100

        return ret

    def mini_wrapper(params):
        return - target_return_func(params)

    # this fatol seems not picked up - check what is going on...
    bestParam = scipy.optimize.minimize(mini_wrapper, initGuess, method = 'Nelder-Mead', options = {"maxiter":30,"fatol":0.001,"disp":True})
    bestParam = bestParam['x']
    bestParamDict = {paramKeys[i]:bestParam[i] for i in range(len(bestParam))}
    bestParamMerged = {**bestParamDict, **fixParams}
    bestParamMerged["start_date"] = startDate
    strategyObj.update(**bestParamMerged)
    strategyObj.get_values(startDate, endDate)
    stats = strategyObj.get_values_stats(startDate, endDate)
    stats["bestParams"] = bestParamDict

    return stats




