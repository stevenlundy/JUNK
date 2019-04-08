def dec_to_base(number, base, characters='0123456789abcdefghijklmnopqrstuvwxyz'):
    if base < 2 or base > len(characters):
        raise ValueError("Base value must be between 2 and 36")

    if number == 0:
        return '0'

    if number < 0:
        sign = '-'
        number = -number
    else:
        sign = ''

    result = ''
    while number:
        result = characters[number % (base)] + result
        number //= base

    return sign + result

def get_smallest_version_of_number(str_num):
    return "".join(sorted([c for c in str_num]))

def is_ascending_number(num, base=10):
    str_num = dec_to_base(num, base)
    for v, w in zip(str_num[:-1], str_num[1:]):
        if w < v:
            return False
    return True

def next_ascending_number(num, base=10):
    next_number = num + 1
    if is_ascending_number(next_number, base):
        return next_number

    str_num = dec_to_base(next_number, base)
    digits = []
    for largest_significant, next_digit in zip(str_num[:-1], str_num[1:]):
        digits.append(largest_significant)
        if next_digit < largest_significant:
            break

    digits += [largest_significant for d in range(len(str_num) - len(digits))]
    return int("".join(digits), base)

# persistence_cache_by_base = {}
"""
A cache by base of the form:
{
    <base>: {
        <hash of num (e.g. 123 for 231, 123, or 321>: <persistence>
    }
}

"""

def multiplicative_persistence(num, base=10):
    # cache = persistence_cache_by_base.get(base, {})
    persistence = 0
    str_num = dec_to_base(num, base)
    while len(str_num) > 1:
        # str_num = get_smallest_version_of_number(str_num)
        # if cache.get(str_num):
        #     persistence += cache.get(str_num)
        #     break
        product = 1
        for d in str_num:
            product *= int(d, base)
        str_num = dec_to_base(product, base)
        persistence += 1
    # cache[get_smallest_version_of_number(dec_to_base(num, base))] = persistence
    # persistence_cache_by_base[base] = cache
    return persistence

def find_highest_persistence_in_base(base, max_search=999999999999):
    persistences = {}
    num = 1
    while num <= max_search:
        p = multiplicative_persistence(num, base)
        persistences[p] = persistences.get(p, dec_to_base(num, base))
        num = next_ascending_number(num, base)
    return persistences
