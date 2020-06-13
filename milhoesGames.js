const axios = require('axios');
const fs = require('fs');

function getPage(page){
    axios.get(`https://api.rawg.io/api/games?page_size=40&page=${page}`)
        .then(dados => {
            console.log(`GET: https://api.rawg.io/api/games?page_size=40&page=${page}`);
            dados.data.results.forEach(element => {
                var objString = JSON.stringify(element) + ',';
                fs.appendFile('./jsons/totalgames.json', objString, function (err) {
                    if (err) throw err;
                });
            });
        })
        .catch(err => console.log(err));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function milhoes() {
    for(var i = 1; i <= 9467 ; i++){
        getPage(i);
        await sleep(2500)
    }

    fs.appendFile('./jsons/totalgames.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/totalgames.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes();