const fs = require('fs')
try {
    const jsonString = fs.readFileSync('./jsons/developers.json')
    const developers = JSON.parse(jsonString)
    var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
    var developersld = [];

    developers.results.forEach(element => {
        var developed = [];
        element.games.forEach(elem => {
            developed.push({
                "@id": prefix + elem.slug
            })
        });
        var newDeveloper = {
            "@id": prefix + element.slug,
            "@type": [ "http://www.w3.org/2002/07/owl#NamedIndividual", prefix + "Developers" ],
            "http://www.semanticweb.org/prc/2020/gamingWiki#developed": developed, 
            "http://www.semanticweb.org/prc/2020/gamingWiki#name": [{
                "@value": element.name
            }] 
        }
        developersld.push(newDeveloper);
    });
    console.log(developersld);
    const developersString = JSON.stringify(developersld);
    fs.writeFile('./individuals/developers.jsonld', developersString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
} catch(err) {
    console.log(err)
}