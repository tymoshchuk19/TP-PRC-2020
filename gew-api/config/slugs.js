var Games = require('../controllers/games')

slugs = [[],[],[]]
const loadLaunched = async () => {
    console.log('[Launched] loading')
    await Games.getLaunched()
        .then(dados => {
            dados.forEach(game => { 
                slugs[0].push(game.slug); 
            })
        })
        .catch(e => console.log(`Erro na listagem dos jogos: ${e}`))
    console.log('[Launched] loaded')
}

const loadUpcoming = async () => {
    console.log('[Upcoming] loading')
    await Games.getUpcoming()
        .then(dados => {
            dados.forEach(game => { 
                slugs[1].push(game.slug); 
            })
        })
        .catch(e => console.log(`Erro na listagem dos jogos: ${e}`))
    console.log('[Upcoming] loaded')
}

const loadTBA = async () => {
    console.log('[TBA] loading')
    await Games.getTBA()
        .then(dados => {
            dados.forEach(game => { 
                slugs[2].push(game.slug); 
            })
        })
        .catch(e => console.log(`Erro na listagem dos jogos: ${e}`))
    console.log('[TBA] loaded')
}

exports.loadLaunched = loadLaunched
exports.loadUpcoming = loadUpcoming
exports.loadTBA = loadTBA
exports.slugs = () => { return slugs }