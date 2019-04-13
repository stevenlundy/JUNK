var pieces = [
    ["","Pyotr Ilyich Tchaikovsky","1812 Overture",""],
    ["","Victor Hely-Hutchinson","A Carol Symphony",""],
    ["","Leroy Anderson","A Christmas Festival",""],
    ["","Johannes Brahms","Academic Festival Overture",""],
    ["","Elizabeth Raum","Banquet Hall","Sir Gawain and the Green Knight"],
    ["","Mykola Leontovych","Carol of the Bells",""],
    ["","Stanley Myers","Cavatina","The Deerhunter"],
    ["","Antonín Dvořák","Cello Concerto in B minor, Op. 104",""],
    ["","Otto Nicolai","Christmas Overture",""],
    ["","John Finnegan","Christmas Singalong",""],
    ["","Carl Maria von Weber","Concerto for Clarinet",""],
    ["","Johann Sebastian Bach","Concerto for Oboe and Violin in C minor",""],
    ["","Antonio Vivaldi","Concerto for Two Trumpets in C major, RV 537",""],
    ["","Bedřich Smetana","Dance of the Comedians","The Bartered Bride"],
    ["","Nikolai Rimsky-Korsakov","Dance of the Tumblers","The Snow Maiden"],
    ["","Georges Bizet","Danse Bohême","Carmen Suite No. 2"],
    ["","Camille Saint-Saëns","Danse Macabre, Op. 40",""],
    ["","Giacomo Puccini","Duet from Act I","Tosca"],
    ["","Giuseppe Verdi","È strano Sempre Libera","La Traviata"],
    ["","Maurice Ravel","Empress of the Pagodas","Mother Goose Suite"],
    ["","John Williams","End Title","Star Wars Suite"],
    ["","Camille Saint-Saëns","Excerpts","Carnival of the Animals"],
    ["","Sergei Prokofiev","Excerpts","Peter and the Wolf"],
    ["","Gustav Holst","Excerpts","The Planets"],
    ["","Pyotr Ilyich Tchaikovsky","Excerpts from Swan Lake Suite, Op. 20",""],
    ["","Dmitri Shostakovich","Festive Overture",""],
    ["","Cécile Chaminade","Flute Concertino in D Major, Op. 107",""],
    ["","Pietro Yon","Gesù Bambino",""],
    ["","Modest Mussorgsky","Great Gate of Kiev","Pictures at an Exhibition"],
    ["","John Williams","Harry Potter and the Prisoner of Azkaban Concert Suite",""],
    ["","Pietro Mascagni","Intermezzo","Cavalleria Rusticana"],
    ["","Calvin Custer","It's Christmastime",""],
    ["","Hubert Parry","Jerusalem",""],
    ["","Carl Maria von Weber","Konzertstück Finale",""],
    ["","Astor Piazzolla","Libertango",""],
    ["","Maurice Ravel","Little Ugly Girl","Mother Goose Suite"],
    ["","Percy Grainger","Mock Morris",""],
    ["","Giacomo Puccini","Nessun dorma","Turandot"],
    ["","Modest Mussorgsky","Night on Bald Mountain",""],
    ["","Edward Elgar","Nimrod","Enigma Variation"],
    ["","Adolphe Adams","O Holy Night",""],
    ["","Johann Sebastian Bach","Orchestral Suite No. 2 in B minor",""],
    ["","Leonard Bernstein","Overture to Candide",""],
    ["","Carl Maria von Weber","Overture to Der Freischütz",""],
    ["","Wolfgang Amadeus Mozart","Overture to Don Giovanni",""],
    ["","Engelbert Humperdink","Overture to Hänsel and Gretel",""],
    ["","César Franck","Panis Angelicus",""],
    ["","Sergei Prokofiev","Peter and the Wolf",""],
    ["","Frédéric Chopin","Piano Concerto",""],
    ["","Camille Saint-Saëns","Piano Concerto No. 2 in G Minor, Op. 22, 1st mvmt.",""],
    ["","Ottorino Respighi","Pines of the Appian Way","The Pines of Rome"],
    ["","Isaias Garcia","Polish Rhapsody",""],
    ["","Pyotr Ilyich Tchaikovsky","Polonaise","Eugene Onegin"],
    ["","Alexander Borodin","Polovtsian Dances","Prince Igor"],
    ["","Edward Elgar","Pomp and Circumstance March No. 1",""],
    ["","V Grindin","Rassypukha",""],
    ["","Maurice Ravel","Rigaudon","Le Tombeau de Couperin"],
    ["","Pyotr Ilyich Tchaikovsky","Romeo and Juliet Fantasy Overture",""],
    ["","Thomas Arne","Rule Britannia",""],
    ["","Pyotr Ilyich Tchaikovsky","Russian Dance: Trepak","The Nutcracker"],
    ["","Felix Mendelssohn","Ruy Blas Overture",""],
    ["Carl Strommen","","Salute to the Cinema",""],
    ["","Nikolai Rimsky-Korsakov","Scheherazade",""],
    ["","Pyotr Ilyich Tchaikovsky","Selections","Nutcracker Suite No. 1"],
    ["","Claude-Michel Schönberg","Selections","Les Misérables"],
    ["","Frederick Loewe","Selections","My Fair Lady"],
    ["","Lionel Bart","Selections","Oliver"],
    ["","Hans Zimmer","Symphonic Highlights","Pirates of the Caribbean"],
    ["","Johannes Brahms","Symphony No. 1 in C minor, Op. 68",""],
    ["","Jean Sibelius","Symphony No. 2 in D major",""],
    ["","Sergei Rachmaninoff","Symphony No. 2 in E minor, Op. 27",""],
    ["","Wolfgang Amadeus Mozart","Symphony No. 29",""],
    ["","Camille Saint-Saëns","Symphony No. 3 in C minor, Op. 78",""],
    ["","Ludwig van Beethoven","Symphony No. 7 in A major",""],
    ["","Ludwig van Beethoven","Symphony No. 9 in D minor, Op. 125",""],
    ["","Antonín Dvořák","Symphony No. 9 in E minor, From the New World, Op. 95",""],
    ["","Modest Mussorgsky","The Hut of Baba Yaga","Pictures at an Exhibition"],
    ["","John Williams","Throne Room","Star Wars Suite"],
    ["","Georges Bizet","Toreador Song","Carmen"],
    ["","Franz Liszt","Totentanz",""],
    ["","Wolfgang Amadeus Mozart","Tu Virginum Corona and Alleluja","Exsultate Jubilate"],
    ["","Bill Holcombe","Twas the Night before Christmas",""],
    ["","Ruggero Leoncavallo","Vesti la giubba","I Pagliacci"],
    ["","Dmitri Kabalevsky","Violin Concerto in C Major, Op. 48, 1st mvmt.",""],
    ["","Johannes Brahms","Violin Concerto in D major, Op. 77",""],
    ["","Felix Mendelssohn","Violin Concerto in E minor",""],
    ["","Camille Saint-Saëns","Violin Concerto No. 3 in B Minor, Op. 61, 1st mvmt.",""],
    ["","Giacomo Puccini","Vissi d'arte","Tosca"],
    ["","Pyotr Ilyich Tchaikovsky","Waltz Finale and Apothesis",""],
    ["","Pyotr Ilyich Tchaikovsky","Waltz","Sleeping Beauty, Op. 66"],
    ["","Antonio Vivaldi","Winter","The Four Seasons"]
];

var dashify = function(str) {
    str = str.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/[ ']/g, "-");
    str = str.replace(/[\.,:]/g, "");
    return str;
};

var getComposerPage = function(composerName) {
    return "/models/composers/" + dashify(composerName) + "/";
};
var newID = 10000;

var pages = pieces.map(function(piece) {
    var arranger = piece[0];
    var arrangerPage = arranger ? getComposerPage(arranger) : undefined;
    var composer = piece[1];
    var composerPage = composer ? getComposerPage(composer) : undefined;
    var title = piece[2];
    var origin = piece[3];

    var name = title;
    name = origin ? name + " from " + origin : name;
    name = dashify(name);
    return {
        "type": "ProcessWire:Page",
        "path": "/models/repertoire/" + name + "/",
        "class": "ProcessWire\\Page",
        "template": "piece",
        "settings": {
            "id": newID++,
            "name": name,
            "status": 1025
        },
        "data": {
            "title": title,
            "composer": [composerPage],
            "arranger": [arrangerPage],
            "origin": origin
        }
    };
});

var myImport = {
    "type": "ProcessWire:PageArray",
    "created": "2018-05-21 13:47:16",
    "version": "3.0.98",
    "user": "admin",
    "host": "eporchestra.ca",
    "pages": pages,
    "fields": {
        "title": {
            "type": "FieldtypePageTitle",
            "label": "Title",
            "version": "1.0.0",
            "id": 1,
            "blankValue": "",
            "importable": true,
            "test": false,
            "returnsPageValue": true,
            "requiresExportValue": false,
            "restoreOnException": false
        },
        "composer": {
            "type": "FieldtypePage",
            "label": "Composer",
            "version": "1.0.4",
            "id": 107,
            "blankValue": "class:PageArray",
            "importable": true,
            "test": true,
            "returnsPageValue": true,
            "requiresExportValue": false,
            "restoreOnException": false
        },
        "arranger": {
            "type": "FieldtypePage",
            "label": "Arranger",
            "version": "1.0.4",
            "id": 108,
            "blankValue": "class:PageArray",
            "importable": true,
            "test": true,
            "returnsPageValue": true,
            "requiresExportValue": false,
            "restoreOnException": false
        },
        "origin": {
            "type": "FieldtypeText",
            "label": "Origin",
            "version": "1.0.0",
            "id": 105,
            "blankValue": "",
            "importable": true,
            "test": false,
            "returnsPageValue": true,
            "requiresExportValue": false,
            "restoreOnException": false
        }
    },
    "timer": "0.0083"
};
