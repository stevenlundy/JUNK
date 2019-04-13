import random

def random_numbers(quantity, max=1):
    return [random.random()*max for i in range(quantity)]

def choose_best_after(numbers, max_search=0.37):
    best_yet = numbers[0]
    for i, num in enumerate(numbers):
        if num > best_yet:
            if i >= max_search * len(numbers):
                return num
            else:
                best_yet = num

NUM_SAMPLES = 100
LIST_SIZE = 10

for i in range(10):
    results = [choose_best_after(random_numbers(LIST_SIZE), i/10.0) for s in range(NUM_SAMPLES)]
    valid_results = [r for r in results if r]  # remove None results
    print "Threshold: {}".format(i/10.0)
    print "{} failed selections".format(NUM_SAMPLES - len(valid_results))
    print "Average outcome: {}".format(sum(valid_results)/NUM_SAMPLES)
