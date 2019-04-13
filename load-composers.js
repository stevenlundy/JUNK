var composers = ["Aaron Copland",
    "Albert Hague",
    "Charles Gounod",
    "Claude Debussy",
    "Elmer Bernstein",
    "Ennio Morricone",
    "Georges Bizet",
    "Giuseppe Verdi",
    "Gustav Holst",
    "Hans Zimmer",
    "Harry Freedman",
    "Hector Berlioz",
    "Henry Mancini",
    "Jerry Goldsmith",
    "Joaquín Rodrigo",
    "Johannes Brahms",
    "John Williams",
    "Ludwig van Beethoven",
    "Nikolai Rimsky-Korsakov",
    "Oskar Morawetz",
    "Otto Nicolai",
    "Pyotr Ilyich Tchaikovsky",
    "Richard Strauss",
    "Richard Wagner",
    "Sergei Rachmaninoff",
    "Wolfgang Amadeus Mozart",
    "Émile Waldteufel"];

var newID = 10000;

var pages = composers.map(function(composer) {
    var title = composer;
    var name = title;
    name = name.toLowerCase();
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    name = name.replace(" ", "-");
    return {
        "type": "ProcessWire:Page",
        "path": "/models/composers/" + name + "/",
        "class": "ProcessWire\\Page",
        "template": "composer",
        "settings": {
            "id": newID++,
            "status": 1025,
            "name": name
        },
        "data": {
            "title": title
        }
    }
})

var myImport = {
    "type": "ProcessWire:PageArray",
    "created": "2018-05-21 12:55:34",
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
        }
    },
    "timer": "0.0137"
}
