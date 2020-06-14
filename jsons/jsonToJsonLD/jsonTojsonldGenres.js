const fs = require('fs')

try {
    const jsonString = fs.readFileSync('../genres.json')
    const genres = JSON.parse(jsonString)
    var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
    var genresld = [];

    genres.results.forEach(element => {
        var newGenre = {
            "@id": prefix + element.slug,
            "@type": [ "http://www.w3.org/2002/07/owl#NamedIndividual", prefix + "Genres" ],
            "http://www.semanticweb.org/prc/2020/gamingWiki#name": [{
                "@value": element.name
            }] 
        }
        genresld.push(newGenre);
    });
    console.log(genresld);
    const genresString = JSON.stringify(genresld);
    fs.writeFile('../../individuals/genres.jsonld', genresString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
} catch(err) {
    console.log(err)
}