import numpy

deterministic_mode = True # default is deterministic.

def set_deterministic_mode(flag):
    global deterministic_mode
    deterministic_mode = flag

def set_random_seed(seed):
    numpy.random.seed(seed)

def get_randomized_data_log_normal(orig, vol):
    if deterministic_mode:
        return orig
    else:
        return numpy.random.lognormal(sigma = vol) * orig

