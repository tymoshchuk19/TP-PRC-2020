var Games = module.exports
var slugs = require('../config/slugs').slugs;
const axios = require('axios')
var host = require('../config/databases').host;


var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX gew: <http://www.semanticweb.org/prc/2020/gamingWiki#>
`

var getLink = host + "?query=" 


Games.getLaunched = async function(){
    var today = new Date();
    var date = today.getFullYear()+'-'+pad(today.getMonth()+1, 2)+'-'+pad(today.getDate(), 2);
    var dateTime = date+'T'+'00:00:00+00:00';
    var query = `
    select ?slug ?released where {
        ?slug rdf:type gew:Games .
        ?slug gew:released ?released .
        ?slug gew:tba false .
        filter(?released <= "${dateTime}"^^xsd:dateTime) .
    }
    ORDER BY DESC(?released)
    ` 

    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Games.getUpcoming = async function(){
    var today = new Date();
    var date = today.getFullYear()+'-'+pad(today.getMonth()+1, 2)+'-'+pad(today.getDate(), 2);
    var dateTime = date+'T'+'00:00:00+00:00';
    var query = `
    select ?slug ?released where {
        ?slug rdf:type gew:Games .
        ?slug gew:released ?released .
        ?slug gew:tba false .
        filter(?released > "${dateTime}"^^xsd:dateTime) .
    }
    ORDER BY ?released
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Games.getTBA = async function(){
    var query = `
    select ?slug ?released where {
        ?slug rdf:type gew:Games .
        ?slug gew:released ?released .
        ?slug gew:tba true .
    }
    ORDER BY DESC(?released)
    ` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Games.getPage = async function(page, tab, filter){
    s = slugs()[tab];
    var games = []
    let res = {};
    var slug = ''
    while(games.length < 5){
        for (i = (5 * page); i < (5 * (page + 1)); i++){
            if(s[i]){
                slug = s[i].split('#')[1]
                var query = `
                select ?slug ?name ?rating ?background_image ?released where { 
                    gew:${slug} rdf:type gew:Games ;
                    gew:name ?name ;
                    gew:rating ?rating ;
                    gew:background_image ?background_image ;
                    gew:released ?released .
                    bind(str('${slug}') as ?slug) . `

                if(filter.hasGenre){
                    query += `
                    gew:${slug} gew:hasGenre gew:${filter.hasGenre}.`
                }
                if(filter.developed){
                    query += `
                    gew:${filter.developed} gew:developed gew:${slug}.`
                }
                if(filter.existsFor){
                    query += `
                    gew:${slug} gew:existsFor gew:${filter.existsFor}.`
                }

                query += '}'

                var encoded = encodeURIComponent(prefixes + query)
                try{
                    var response = await axios.get(getLink + encoded)
                    var arr = myNormalize(response.data)
                    if (arr[0] != null){
                        games.push(arr[0])
                    }
                }
                catch(e){
                    console.log(`error: ${slug} ---> ${e}`)
                } 
            }else {
                page++;
                res = {
                    offset: page,
                    games: games
                }
                return res}
        }
        page++;
    }
    res = {
        offset: page,
        games: games
    }
    return res
}

Games.getSearchGames = async function(search) {
    s = slugs()[0].concat(slugs()[1].concat(slugs()[2]))
    var games = []
    var slug = ''
    var searchSlug = search.split(' ').join('-').toLowerCase()
    var i = 0
    while(games.length < 10){
        if(s[i]){
            slug = s[i].split('#')[1]
            if(slug.includes(searchSlug)) {
                var query = `
                select ?name ?slug ?rating ?background_image ?released where { 
                    gew:${slug} rdf:type gew:Games ;
                    gew:name ?name ;
                    gew:rating ?rating ;
                    gew:background_image ?background_image ;
                    gew:released ?released .
                    bind(str('${slug}') as ?slug).
                }`
                
                var encoded = encodeURIComponent(prefixes + query)

                try{
                    var response = await axios.get(getLink + encoded)
                    var arr = myNormalize(response.data)
                    if (arr[0] != null){
                        games.push(arr[0])
                    }
                }
                catch(e){
                    console.log(`error: ${search} ---> ${e}`)
                } 
            }
        }else break
        i++
    }
    return games
}

Games.getGame = async function(slug){
    var query = `
    select ?slug ?name ?rating ?background_image ?released ?description where { 
        gew:${slug} rdf:type gew:Games ;
        gew:name ?name ;
        gew:rating ?rating ;
        gew:background_image ?background_image ;
        gew:description ?description ;
        gew:released ?released .
        bind(str('${slug}') as ?slug).
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            let developers = await Games.getGameDevs(slug)
            arr[0].developers = developers;

            let platforms = await Games.getGamePlatforms(slug)
            arr[0].platforms = platforms;

            let achievements = await Games.getAchievements(slug)
            arr[0].achievements = achievements;

            let screenshots = await Games.getScreenshots(slug)
            arr[0].short_screenshots = screenshots;

            return arr[0]
        }
    }
    catch(e){
        console.log('error: ' + slug)
    }
}

Games.getAchievements = async function(slug){
    var query = `
    select ?name ?description ?background_image where { 
        ?a rdf:type gew:Achievements ;
        gew:isAchievementOf gew:${slug} ;
        gew:name ?name ;
        gew:description ?description ;
        gew:background_image ?background_image .
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção dos achievements de ' + slug)
    }
}

Games.getGameDevs = async function(slug){
    var query = `
    select ?name where { 
        ?dev gew:developed gew:${slug};
        gew:name ?name.
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção dos achievements de ' + slug)
    }
}

Games.getGamePlatforms = async function(slug){
    var query = `
    select ?name where { 
        gew:${slug} gew:existsFor ?platform .
        ?platform gew:name ?name.
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        console.log(arr)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção dos achievements de ' + slug)
    }
}

Games.getScreenshots = async function(slug){
    var query = `
    select ?screenshot where { 
        gew:${slug} gew:short_screenshots ?screenshot.
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção dos screenshots de ' + slug)
    }
}

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function matches(s, n){
    names = n.split(' ')
    ret = false
    for(var i = 0; i<names.length; i++)
        if(s.includes(names[i].toLowerCase())) {
            ret = true
        } else {
            ret = false;
            break;
        }
    return ret
}