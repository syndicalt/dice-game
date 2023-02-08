const inquirer = require('inquirer')
const colors = require('colors')
const addPlayer = require('./Player')
const { setMaxScore, playGame } = require('./Play')
const Game = require('./Game')
const game = new Game()

const startGame = async game => {
    await playGame(game).then(res => {
        console.log('play again?')
    })
}

game.init()
    .then(res => { 
        if(res) {
            addPlayer(game)
                .then(res => {
                    console.clear()
                    console.log('Players: ', game.players)
                    console.log('\n\n')
                    setMaxScore(game)
                        .then(res => {
                            startGame(game)
                        })
                })
        } else {
            game.quit()
        }
    })

//console.log(game)    