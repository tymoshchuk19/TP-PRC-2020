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
    var date = today.getFullYear()+'-'+pad(today.getMonth()+1, 2)+'-'+pad(today.getDate()+1, 2);
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
    var date = today.getFullYear()+'-'+pad(today.getMonth()+1, 2)+'-'+pad(today.getDate()+1, 2);
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
                select ?name ?rating ?background_image ?released where { 
                    gew:${slug} rdf:type gew:Games ;
                    gew:name ?name ;
                    gew:rating ?rating ;
                    gew:background_image ?background_image ;
                    gew:released ?released .`

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
                    console.log(prefixes + query)
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

// Games.getGame = async function(slug){
//     var query = `
//     select ?g ?name ?rating ?background_image ?released where {
//         ?g rdf:type gew:Games .
//         filter( str(?g) = ${slug}) .
//         ?g gew:name ?name .
//         ?g gew:rating ?rating .
//         ?g gew:background_image ?background_image .
//         ?g gew:released ?released .
//     }`

//     var encoded = encodeURIComponent(prefixes + query)

//     try{
//         var response = await axios.get(getLink + encoded)
//         return myNormalize(response.data)
//     }
//     catch(e){
//         throw(e)
//     } 
// }

Games.getGames = async function(name){
    s = slugs()[0]
    var games = []
    var slug = ''
    var top = 10
    for(var i = 0; i < s.length && top != 0; i++){
        if (matches(s[i], name)) {
            slug = s[i].split('#')[1]
            var query = `
            select ?g ?name ?rating ?background_image ?released where { 
                gew:${slug} rdf:type gew:Games ;
                gew:name ?name ;
                gew:rating ?rating ;
                gew:background_image ?background_image ;
                gew:released ?released .
            }`
    
            var encoded = encodeURIComponent(prefixes + query)
    
            try {
                var response = await axios.get(getLink + encoded)
                var arr = myNormalize(response.data)
                if (arr[0] != null){
                    games.push(arr[0]);
                    top--;
                }
            }
            catch(e){
                console.log('error: ' + slug)
            }
        }
    }
    return games
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