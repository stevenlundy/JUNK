var fs = require('fs');
var dictionaryPath = '/usr/share/dict/words';

function getWordsFromDictFile(dictionaryPath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(dictionaryPath,'utf8', function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            var lines = data.split(/\r?\n/);
            resolve(lines);
        });
    });
}

function isAlphabetical(word) {
    word = word.toLowerCase();
    for(var i = 1; i < word.length; i++) {
        if (word[i] < word[i-1]) return false;
    }
    return true;
}

function getAlphabeticalWords(words) {
    return words.filter(isAlphabetical);
}

function groupByLength(items) {
    var buckets = {};
    for (var i = 0; i < items.length; i++) {
        var bucket = buckets[item[i].length] || [];

        bucket.push(item);
        buckets[item[i].length] = bucket;
    }
    return buckets;
}

getWordsFromDictFile(dictionaryPath).then(function(words) {
    var abcWords = getAlphabeticalWords(words);
    abcWords.sort(function(a, b) {
        return a.length - b.length;
    });
    console.log(abcWords);
});

