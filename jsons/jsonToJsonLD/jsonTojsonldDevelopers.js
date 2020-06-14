const fs = require('fs')
var al = [10]
var developersld1 = []; 
var developersld2 = []; 
var developersld3 = []; 
var developersld4 = []; 
var developersld5 = [];
var developersld6 = [];
var developersld7 = [];
var developersld8 = []; 
var developersld9 = []; 
var developersld10 = []; 
try {
<<<<<<< HEAD:jsons/jsonToJsonLD/jsonTojsonldDevelopers.js
    const jsonString = fs.readFileSync('../developers.json')
    const developers = JSON.parse(jsonString)
    var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
    var developersld = [];
=======
    for(var i = 1; i < 11; i++){
        const jsonString = fs.readFileSync(`./jsons/devs/totaldevs${i}.json`)
        const developers = JSON.parse(jsonString)
        var prefix = "http://www.semanticweb.org/prc/2020/gamingWiki#"
>>>>>>> 68606bb952dfbecfc55f5fcbe7af3757dcf82006:jsonTojsonldDevelopers.js

        developers.forEach(element => {
            var developed = [];
            element.games.forEach(elem => {
                developed.push({
                    "@id": prefix + elem
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

        if (i == 1)
            developersld1.push(newDeveloper);
        else if (i == 2)
            developersld2.push(newDeveloper);
        else if ( i == 3)
            developersld3.push(newDeveloper);
        else if ( i == 4)
            developersld4.push(newDeveloper);
        else if ( i == 5)
            developersld5.push(newDeveloper);
        else if ( i == 6)
            developersld6.push(newDeveloper);
        else if ( i == 7)
            developersld7.push(newDeveloper);
        else if ( i == 8)
            developersld8.push(newDeveloper);
        else if ( i == 9)
            developersld9.push(newDeveloper);
        else 
            developersld10.push(newDeveloper)
        });
<<<<<<< HEAD:jsons/jsonToJsonLD/jsonTojsonldDevelopers.js
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
    fs.writeFile('../../individuals/developers.jsonld', developersString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
=======

    }


    al[0] = developersld1;
    al[1] = developersld2;
    al[2] = developersld3;
    al[3] = developersld4;
    al[4] = developersld5;
    al[5] = developersld6;
    al[6] = developersld7;
    al[7] = developersld8;
    al[8] = developersld9;
    al[9] = developersld10;

    for (var i = 1; i < 11; i++) {
        const developersString = JSON.stringify(al[i-1]);
        fs.writeFile(`./individuals/devs/developers${i}.jsonld`, developersString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }
>>>>>>> 68606bb952dfbecfc55f5fcbe7af3757dcf82006:jsonTojsonldDevelopers.js
} catch(err) {
    console.log(err)
}