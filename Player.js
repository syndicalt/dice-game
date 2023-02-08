const inquirer = require('inquirer')

const addPlayer = async (game) => {
    await inquirer.prompt([{
        type: 'input',
        message: 'Enter Player\'s Name: ',
        name: 'addPlayer'
    }]).then(answer => {
        game.addPlayer({ 'Name' : answer.addPlayer, 'Score' : 0 })
    }).then(async answer => {
        await inquirer.prompt([{
            type: 'confirm',
            message: 'Add another player?',
            name: 'addAnother'
        }]).then(async answer => {
            if(answer.addAnother) { 
                await addPlayer(game)
            } else {
                return
            }        
        })
    })

    return game.players
}

module.exports = addPlayer