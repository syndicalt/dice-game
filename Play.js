const inquirer = require('inquirer')

const playGame = game => {
    return new Promise((resolve,reject) => {
        let players = game.players,
            finalScores = game.finalScores,
            index = game.index,
            round = game.round,
            maxScore = game.maxScore,
            lastRoundFlag = game.lastRoundFlag

        players.forEach(el => {
            console.log(el.Name)
        })
    });
}

const nextPlayer = data => {

}

const setMaxScore = game => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([{
            type: 'number',
            message: 'What is the max game score? ',
            name: 'maxScore'
        }]).then(answer => {
            game.setMaxScore(answer.maxScore)
            resolve()
        })
    })
}

module.exports = { setMaxScore, playGame }