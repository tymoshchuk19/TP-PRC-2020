var Users = module.exports
const axios = require('axios')
var host = require('../config/databases').host
var qs = require('querystring')



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


Users.getUser = async function(name){
    var query = `
    select ?name ?password ?email where {
        gew:${name} rdf:type gew:Users ;
        gew:name ?name ;
        gew:password ?password ;
        gew:email ?email .
    } 
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)[0]
    }
    catch(e){
        throw(e)
    } 
}

Users.newUser = async function(newUser){
    var updateLink = host + "/statements?update=" 

    var query = `
    INSERT DATA
    { 
        graph <http://www.semanticweb.org/prc/2020/gamingWiki#> 
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
        console.log(getLink + encoded)
        var response = await axios.get(updateLink + encoded)            

        console.log(`Registo do utilizador.`)
        return newUser
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