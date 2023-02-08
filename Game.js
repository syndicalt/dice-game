const colors = require('colors')
const inquirer = require('inquirer')

class Game {
    constructor() {
        this.players = [],
        this.finalScores = [],
        this.index = 0,
        this.round = 1,
        this.maxScore = 0,
        this.lastRoundFlag = 0
    }

    async init() {
        let res

        await inquirer.prompt([{
            type: 'confirm',
            message: colors.blue('Welcome to Dice Game Scorer! Start?'),
            name:'welcome'
        }]).then(answer => { 
            if(answer.welcome) { 
                res = true
            } else { 
                res = false
            }
        })

        return res
    }

    async addPlayer(val) {
        this.players.push(val)
    }

    addToScore(n, s) {
        let player = this.players.find(el => el.name == n)
        player.score = player.score + s
        
        if(player.score >= this.maxScore || lastRoundFlag === 1) {
            this.finalScores.push(player)
            this.players = this.players.filter(el => el != player)
            this.lastRoundFlag = 1
        }
    }

    setMaxScore(val) {
        this.maxScore = val
    }

    nextRound() {
        this.round++
    }

    quit() {
        console.clear()
        console.log('Thanks for using Dice Game Scorer!')
        process.exit(1)  
    }
}

module.exports = Game