var Games = require('../controllers/games')

slugs = []
const loadSlugs = async () => {
    console.log('[Games] loading')
    await Games.getLaunched()
        .then(dados => {
            dados.forEach(game => { 
                slugs.push(game.slug); 
            })
        })
        .catch(e => console.log(`Erro na listagem dos jogos: ${e}`))
    console.log('[Games] loaded')
}

exports.loadSlugs = loadSlugs
exports.slugs = () => { return slugs }