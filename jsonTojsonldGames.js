const fs = require('fs')
try {
    const jsonString = fs.readFileSync('./jsons/games.json')
    const games = JSON.parse(jsonString)
    var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
    var gamesld = [];

    games.results.forEach(element => {
        var screenShots = [];
        element.short_screenshots.forEach(elem => {
            screenShots.push({
                "@value": prefix + elem.image
            })
        });
        var newgame = {
            "@id": prefix + element.slug,
            "@type": [ "http://www.w3.org/2002/07/owl#NamedIndividual", prefix + "Games" ],
            "http://www.semanticweb.org/prc/2020/gamingWiki#short_screenshots": screenShots, 
            "http://www.semanticweb.org/prc/2020/gamingWiki#name": [{
                "@value": element.name
            }],
            "http://www.semanticweb.org/prc/2020/gamingWiki#released": [{
                "@value": element.released
            }],
            "http://www.semanticweb.org/prc/2020/gamingWiki#tba": [{
                "@value": element.tba
            }]
        }
        gamesld.push(newgame);
    });
    console.log(gamesld);
    const gamesString = JSON.stringify(gamesld);
    fs.writeFile('./individuals/games.jsonld', gamesString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
} catch(err) {
    console.log(err)
}