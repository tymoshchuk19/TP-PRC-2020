var Users = module.exports
const axios = require('axios')
var host = require('../config/databases').host



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
var updateLink = host + "/statements?update="


Users.getUser = async function(username){
    var query = `
    select ?name ?password ?email where {
        gew:${username} rdf:type gew:Users ;
        gew:name ?name ;
        gew:password ?password ;
        gew:email ?email .
    } 
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            let favorites = await Users.getFavorites(username)
            arr[0].favorites = favorites;

            let wishes = await Users.getWishes(username)
            arr[0].wishes = wishes;
            return arr[0]
        }
    }
    catch(e){
        throw(e)
    } 
}

Users.getFavorites = async function(username){
    var query =  `
    SELECT ?fav ?name ?img where { 
        gew:${username} gew:hasFavorite ?fav .
        ?fav gew:name ?name.
        ?fav gew:background_image ?img.
    }
    `
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção da lista de favoritos de ' + username)
    }
}

Users.getWishes = async function(username){
    var query = `
    SELECT ?wish ?name ?img where { 
        gew:${username} gew:wishes ?wish .
        ?wish gew:name ?name.
        ?wish gew:background_image ?img.
    }
    `
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        var arr = myNormalize(response.data)
        if (arr[0] != null){
            return arr
        }
    }
    catch(e){
        console.log('erro na obtenção da lista de desejos de ' + username)
    }
}

Users.newUser = async function(newUser){
    var query = `
    INSERT DATA
    { 
        graph <http://www.semanticweb.org/prc/2020/gamingWikiUsers> 
        { 
            gew:${newUser.username} rdf:type gew:Users ;
            rdf:type owl:NamedIndividual ;
            gew:name "${newUser.username}" ;
            gew:password "${newUser.password}" ;
            gew:email "${newUser.email}" .
        } 
    }
    `
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.post(updateLink + encoded)            

        return newUser
    }
    catch(e){
        throw(e)
    } 
}

Users.newFavorite = async function(username, slug){
    query = `
    INSERT DATA
    { 
        graph <http://www.semanticweb.org/prc/2020/gamingWikiUsers> 
        { 
            gew:${username} gew:hasFavorite gew:${slug}.
        }
    }`
    console.log(query)
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.post(updateLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}

Users.newWish = async function(username, slug){
    query = `
    INSERT DATA
    { 
        graph <http://www.semanticweb.org/prc/2020/gamingWikiUsers> 
        { 
            gew:${username} gew:wishes gew:${slug}.
        }
    }`

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.post(updateLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
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