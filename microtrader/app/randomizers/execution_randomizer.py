import numpy as np

class ExecutionRandomizer:
    '''
    Randomizer of execution success or failure

    Parameters:
        prob (string)    : probability distribution. Can be None, 'uniform' or 'normal'.
        threshold (float): threshold of success execution. 0.0 means all executions are succeeded.
        seed (int)       : seed for random number generator.
    '''

    def __init__(self, prob=None, threshold=0.0, seed=None):
        self.prob = prob
        self.threshold = threshold
        np.random.seed(seed)

    def check(self):
        '''
        return True/False of execution status
        '''
        if self.prob == None:
            return True
        elif self.prob == 'uniform':
            value = np.random.uniform()
        elif self.prob == 'normal':
            value = np.random.normal()
        return value >= self.threshold
