
def minimumEditDistance(s1, s2):
    if len(s1) > len(s2):
        s1, s2 = s2, s1
    distances = range(len(s1) + 1)
    for index2, char2 in enumerate(s2):
        new_distances = [index2 + 1]
        for index1, char1 in enumerate(s1):
            if char1 == char2:
                new_distances.append(distances[index1])
            else:
                new_distances.append(1 + min((distances[index1],
                                             distances[index1 + 1],
                                             new_distances[-1])))
        distances = new_distances
    return distances[-1]

t1 = 'For context: these files have already been anonymized using "named entity recognition" nlp tools, which is why they say "NAME". We still need to do a "final pass" because NLP is *always* probabilistic and we can\'t afford making any mistake here (for legal reasons).'
t2 = 'For context: these files have already been anonymized using "named entity recognition" NLP tools, which is why they say "NAME". We still need to do a "final pass" because NLP is *always* probabilistic and we can\'t afford making any mistake here (for legal reasons).'

