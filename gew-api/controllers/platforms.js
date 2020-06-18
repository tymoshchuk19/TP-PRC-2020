var Platforms = module.exports
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


Platforms.getPlatforms = async function(){
    var query = `
    select ?slug where {
        ?g rdf:type gew:Platforms .
        bind(strafter(str(?g),'#') as ?slug) 
    }
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