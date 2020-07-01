var Games = require('../controllers/games')

slugs = [[],[],[]]
const loadLaunched = async () => {
    console.log('[Launched] loading')
    await Games.getLaunched()
        .then(dados => {
            dados.forEach(game => { 
                slugs[0].push(game.slug); 
            })
            console.log('[Launched] loaded')
        })
        .catch(e => console.log(`Erro na listagem dos jogos lançados: ${e}`))
}

const loadUpcoming = async () => {
    console.log('[Upcoming] loading')
    await Games.getUpcoming()
        .then(dados => {
            dados.forEach(game => { 
                slugs[1].push(game.slug); 
            })
            console.log('[Upcoming] loaded')
        })
        .catch(e => console.log(`Erro na listagem dos jogos por lançar: ${e}`))
}

const loadTBA = async () => {
    console.log('[TBA] loading')
    await Games.getTBA()
        .then(dados => {
            dados.forEach(game => { 
                slugs[2].push(game.slug); 
            })
            console.log('[TBA] loaded')
        })
        .catch(e => console.log(`Erro na listagem dos jogos por anunciar: ${e}`))
}

exports.loadLaunched = loadLaunched
exports.loadUpcoming = loadUpcoming
exports.loadTBA = loadTBA
exports.slugs = () => { return slugs }