def prime_generator():
    primes = [2]
    yield 2
    value = 3
    while True:
        stop_value = value**0.5
        for p in primes:
            if value % p == 0:
                break
            if p > stop_value:
                primes.append(value)
                yield value
                break
        value += 2


def get_prime_factors(n):
    prime_factors = []
    for p in prime_generator():
        if n == 1:
            return prime_factors
        while n % p == 0:
            prime_factors.append(p)
            n /= p


def proper_fractions(n):
    number_of_fractions = n - 1
    for prime_factor in set(get_prime_factors(n)):
        if prime_factor < n:
            number_of_fractions -= prime_factor - 1
    return number_of_fractions
