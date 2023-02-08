const inquirer = require('inquirer')
const colors = require('colors')
const name = 'DICE GAME SCOREKEEPER', dev = 'Nicholas Blanchard'

let gameData = [], finalScores = [], maxScore, tempScore, index, round 

const startGame = (name, dev) => {
    console.clear()
    console.log(colors.blue(`WELCOME TO ${name}, DEVELOPED BY ${colors.red(dev)}`))

    gameData = []
    addPlayers()
}

const addPlayers = () => {
    inquirer.prompt([{
        type: "input",
        message: colors.magenta("What is the player's name?"),
        name: "addPlayer"
    }]).then(answers => {
        switch(answers.addPlayer) {
            case '':
                console.log('You must add a name!')
                addPlayers()
                break
            default:
                gameData.push({
                    "Name":answers.addPlayer, "Score":0
                })
                console.clear()
                inquirer.prompt([{
                    type: "input",
                    message: "Add another player? (y/n)",
                    name: "addAnother"
                }]).then(answers => {
                    switch(answers.addAnother) {
                        case "n":
                            console.clear()
                            setMaxScore()
                            break
                        default:
                            console.clear()
                            addPlayers()
                    }
                })
        }
    })
}

const playGame = (data, index, round, maxScore, tempScore) => {
    let i = index ? index : 0,
        r = round ? round : 1,
        player = data[i].Name

    console.log('Target Score: ', maxScore)
    console.log(colors.cyan('Round', r))

    new inquirer.prompt([{
        type: 'number',
        message: `${ player }'s Turn! Enter ${ player }'s Roll Score: `,
        name: 'newRoll'
    }]).then(answers => {
        if(answers.newRoll) {
            new inquirer.prompt([{
                type: 'list',
                choices: ['yes', 'no', 'bust'],
                message: 'Roll Again, No, or Bust?',
                name: 'rollResult'
            }]).then(result => {
                switch(result.rollResult){
                    case 'no':
                        data[i].Score = tempScore ? data[i].Score + parseInt(tempScore) + parseInt(answers.newRoll) : data[i].Score + parseInt(answers.newRoll)
                        console.log('Scores: ', data)
                        nextPlayer(data, i, r, maxScore)
                        return
                    case 'bust':
                        console.log('Scores: ', data) 
                        nextPlayer(data, i, r, maxScore)
                        return
                    default:
                        intTemp = tempScore ? tempScore + answers.newRoll : answers.newRoll
                        playGame(data, i, r, maxScore, intTemp)
                        return
                }
            })        
        } else {
            new inquirer.prompt([{
                type: 'list',
                choices: ['bust'],
                message: 'Bust!',
                name: 'rollResult'
            }]).then(result => {
                console.log('Scores: ', data) 
                nextPlayer(data, i, r, maxScore)
            }) 
        }
    })

}

const lastRoundPlay = (data, index = 0, round = 0, maxScore, tempScore) => {
    let i = index,
        r = round,
        player = data[i].Name

    new inquirer.prompt([{
        type: 'number',
        message: `${ player }'s Last Turn! Enter ${ player }'s Roll Score: `,
        name: 'newRoll'
    }]).then(answers => 
        new inquirer.prompt([{
            type: 'list',
            choices: ['yes', 'no', 'bust'],
            message: 'Roll Again, No, or Bust?',
            name: 'rollResult'
        }]).then(result => {
            switch(result.rollResult){
                case 'no':
                    data[i].Score = tempScore ? data[i].Score + parseInt(tempScore) + parseInt(answers.newRoll) : data[i].Score + parseInt(answers.newRoll)
                    finalScores.push(data[i])
                    data = data.filter(el => { return el.Name !== player })
                    data.length === 0 ? tallyScores(finalScores) : nextPlayer(data, i, r, maxScore)
                    return
                case 'bust':
                    finalScores.push(data[i])
                    data = data.filter(el => { return el.Name !== player })
                    data.length === 0 ? tallyScores(finalScores) : nextPlayer(data, i, r, maxScore)
                    return
                default:
                    intTemp = tempScore ? tempScore + answers.newRoll : answers.newRoll
                    lastRoundPlay(data, i, r, maxScore, intTemp)
                    return
            }
        })
    )
}

const nextPlayer = (gameData, index, round, maxScore) => {
    let newIndex, newRound, endGame, firstMax
    if(gameData) {
        gameData.forEach(el => {
            if(el.Score >= maxScore) {
                endGame = true
                firstMax = el.Name
            }
        })

        if(index == gameData.length - 1) {
            newIndex = 0
            newRound = round + 1
        } else {
            newIndex = index + 1
            newRound = round
        }

        if(endGame) {
            lastRound(gameData, firstMax, maxScore)
            return
        } else {
            playGame(gameData, newIndex, newRound, maxScore)
        }
    } else {
        tallyScores(finalScores)
    }
}

const setMaxScore = () => {
    new inquirer.prompt([{
        type: 'number',
        message: 'What is the target score?',
        name: 'maxScore'
    }]).then(answers => {
        maxScore = answers.maxScore
        console.clear()
        playGame(gameData,null, null, maxScore)
    })
}

const lastRound = (data, firstMax, maxScore) => {
     data.forEach(el => {
        if(el.Name === firstMax) finalScores.push(el)
    })

    let newArray = data.filter(el => {
        return el.Name !== firstMax
    })

    if(newArray.length > 0) {
        lastRoundPlay(newArray, 0, null, maxScore)
        return
    } else {
        tallyScores(finalScores)
    }
}

const tallyScores = data => {
    let winner,
        winScore = 0

    console.clear()
    data.map(el => {
        if(el.Score > winScore) {
            winner = el.Name
            winScore = el.Score
        }
    })

    console.log(colors.green(`${ winner } is the winner with a score of ${ winScore }!`))
    console.log('\n')

    new inquirer.prompt([{
        type: 'list',
        message: 'Play another game?',
        choices: ['yes', 'no'],
        name: 'playAgain'
    }]).then(answers => {
        switch(answers.playAgain){
            case 'yes':
                startGame(name, dev)
                return
            case 'no':
                return false
            default:
                return false
        }
    })
}

startGame(name, dev)