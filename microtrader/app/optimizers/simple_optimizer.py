import scipy.optimize
import numpy as np

def return_optimizer_with_constraint(
    strategyObj,
    startDate,
    endDate,
    paramsSpace = None, # dictionary with key being param, and value being the range of the param..
    initialParams = None,
    fixParams = None,
    maxDrawDownLimit = None,
    volLimit = None
):
    # this function assumes all params for optimization are scalars - more adaptions needed to apply it to non-scalar cases
    # construct a target function by ret with cost on maxDrawDown and vol.
    paramKeys = list(paramsSpace.keys())
    paramRanges = list(paramsSpace.values()) # tuple of (min, max), set to None for no limit on either side
    initGuess = np.array([initialParams[key] for key in paramKeys])

    def target_return_func(params):
        for i in range(len(params)):
            (lower, upper) = paramRanges[i]
            if (lower != None and params[i] < lower) or (upper != None and params[i] > upper):
                return -1

        paramsToUpdate = {paramKeys[i]:params[i] for i in range(len(params))}
        paramsMerged = {**paramsToUpdate, **fixParams}
        strategyObj.update(**paramsMerged)

        strategyObj.get_values(startDate, endDate)
        stats = strategyObj.get_values_stats(startDate, endDate)
        print(paramsMerged)
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
    strategyObj.update(**bestParamMerged)
    strategyObj.get_values(startDate, endDate)
    stats = strategyObj.get_values_stats(startDate, endDate)
    stats["bestParams"] = bestParamDict

    return stats




