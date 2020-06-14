const axios = require('axios');
const fs = require('fs');

function getPage(page, fileindex){
    axios.get(`https://api.rawg.io/api/developers?page_size=40&page=${page}`)
        .then(dados => {
            console.log(`GET: https://api.rawg.io/api/developers?page_size=40&page=${page}`);
            dados.data.results.forEach(element => {
                var gamesslugs = []
                element.games.forEach(el => gamesslugs.push(el.slug))
                newObject = {
                    name: element.name,
                    slug: element.slug,
                    games: gamesslugs
                }
                var objString = JSON.stringify(newObject) + ',';
                fs.appendFile(`./jsons/devs/totaldevs${fileindex}.json`, objString, function (err) {
                    if (err) throw err;
                });
            });
        })
        .catch(err => console.log(err));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function milhoes1() {
    for(var i = 1; i <= 450 ; i++){
        getPage(i, 1);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs1.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs1.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes1();

async function milhoes2() {
    for(var i = 451; i <= 900 ; i++){
        getPage(i, 2);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs2.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs2.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes2();

async function milhoes3() {
    for(var i = 901; i <= 1350 ; i++){
        getPage(i, 3);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs3.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs3.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes3();

async function milhoes4() {
    for(var i = 1351; i <= 1800 ; i++){
        getPage(i, 4);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs4.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs4.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes4();

async function milhoes5() {
    for(var i = 1801; i <= 2050 ; i++){
        getPage(i, 5);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs5.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs5.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes5();

async function milhoes6() {
    for(var i = 2051; i <= 2500 ; i++){
        getPage(i, 6);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs6.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs6.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes6();

async function milhoes7() {
    for(var i = 2501; i <= 2950 ; i++){
        getPage(i, 7);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs7.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs7.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes7();

async function milhoes8() {
    for(var i = 2951; i <= 3400 ; i++){
        getPage(i, 8);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs8.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs8.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes8();

async function milhoes9() {
    for(var i = 3401; i <= 3850 ; i++){
        getPage(i, 9);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs9.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs9.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes9();

async function milhoes10() {
    for(var i = 3850; i <= 4429 ; i++){
        getPage(i, 10);
        await sleep(1000)
    }

    fs.appendFile('./jsons/devs/totaldevs10.json', ']', function (err) {
        if (err) throw err;
        console.log('Saved: ]');
    });
}

fs.appendFile('./jsons/devs/totaldevs10.json', '[', function (err) {
    if (err) throw err;
    console.log('Saved: [');
});

milhoes10();
