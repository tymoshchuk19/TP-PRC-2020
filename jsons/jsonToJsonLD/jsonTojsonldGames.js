const fs = require('fs')
var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
var al = [16]
var gamesld1 = []; 
var gamesld2 = []; 
var gamesld3 = []; 
var gamesld4 = []; 
var gamesld5 = [];
var gamesld6 = [];
var gamesld7 = [];
var gamesld8 = []; 
var gamesld9 = []; 
var gamesld10 = []; 
var gamesld11 = []; 
var gamesld12 = [];
var gamesld13 = [];
var gamesld14 = [];
var gamesld15 = [];
var gamesld16 = [];


try {
<<<<<<< HEAD:jsons/jsonToJsonLD/jsonTojsonldGames.js
    const jsonString = fs.readFileSync('../games.json')
    const games = JSON.parse(jsonString)
    var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
    var gamesld = [];
=======
    for(var i = 1; i < 68; i++){
        const jsonString = fs.readFileSync(`./jsons/games/games${i}.json`)
        const games = JSON.parse(jsonString)
        games.forEach(element => {
            var screenShots = [];
            element.short_screenshots.forEach(elem => {
                screenShots.push({
                    "@value": prefix + elem.image
                })
            });
            var genres = [];
            element.genres.forEach(elem => {
                genres.push({
                    "@id": prefix + elem.slug
                })
            });

            var newgame = {
                "@id": prefix + element.slug,
                "@type": [ "http://www.w3.org/2002/07/owl#NamedIndividual", prefix + "Games" ],
                "http://www.semanticweb.org/prc/2020/gamingWiki#short_screenshots": screenShots, 
                "http://www.semanticweb.org/prc/2020/gamingWiki#name": [{
                    "@value": element.name
                }],
                "http://www.semanticweb.org/prc/2020/gamingWiki#background_image": [{
                    "@value": element.background_image
                }],
                "http://www.semanticweb.org/prc/2020/gamingWiki#rating": [{
                    "@value": element.rating
                }],
                "http://www.semanticweb.org/prc/2020/gamingWiki#released": [{
                    "@type" : "http://www.w3.org/2001/XMLSchema#dateTime",
                    "@value": element.released + 'T00:00:00'
                }],
                "http://www.semanticweb.org/prc/2020/gamingWiki#tba": [{
                    "@value": element.tba
                }],
                "http://www.semanticweb.org/prc/2020/gamingWiki#hasGenre" : genres
            }
>>>>>>> 68606bb952dfbecfc55f5fcbe7af3757dcf82006:jsonTojsonldGames.js

            if (i < 5)
                gamesld1.push(newgame);
            else if ( i > 4 && i < 9)
                gamesld2.push(newgame);
            else if ( i > 8 && i < 13)
                gamesld3.push(newgame);
            else if ( i > 12 && i < 17)
                gamesld4.push(newgame);
            else if ( i > 16 && i < 21)
                gamesld5.push(newgame);
            else if ( i > 20 && i < 25)
                gamesld6.push(newgame);
            else if ( i > 24 && i < 29)
                gamesld7.push(newgame);
            else if ( i > 28 && i < 33)
                gamesld8.push(newgame);
            else if ( i > 32 && i < 37)
                gamesld9.push(newgame);
            else if ( i > 36 && i < 41)
                gamesld10.push(newgame);
            else if ( i > 40 && i < 45)
                gamesld11.push(newgame);
            else if ( i > 44 && i < 49)
                gamesld12.push(newgame);
            else if ( i > 48 && i < 53)
                gamesld13.push(newgame);
            else if ( i > 52 && i < 57)
                gamesld14.push(newgame);
            else if ( i > 56 && i < 61)
                gamesld15.push(newgame);
            else 
                gamesld16.push(newgame);
        });
<<<<<<< HEAD:jsons/jsonToJsonLD/jsonTojsonldGames.js
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
    fs.writeFile('../../individuals/games.jsonld', gamesString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
=======
    }

    al[0] = gamesld1;
    al[1] = gamesld2;
    al[2] = gamesld3;
    al[3] = gamesld4;
    al[4] = gamesld5;
    al[5] = gamesld6;
    al[6] = gamesld7;
    al[7] = gamesld8;
    al[8] = gamesld9;
    al[9] = gamesld10;
    al[10] = gamesld11;
    al[11] = gamesld12;
    al[12] = gamesld13;
    al[13] = gamesld14;
    al[14] = gamesld15;
    al[15] = gamesld16;

    for (var i = 1; i < 17; i++) {
        const gamesString = JSON.stringify(al[i-1]);
        fs.writeFile(`./individuals/games/games${i}.jsonld`, gamesString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }
>>>>>>> 68606bb952dfbecfc55f5fcbe7af3757dcf82006:jsonTojsonldGames.js
} catch(err) {
    console.log(err)
}