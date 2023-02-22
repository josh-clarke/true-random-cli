const fs = require('fs')
const yaml = require('js-yaml')
const chalk = require('chalk')
const RandomOrg = require('random-org')

// Prepare global variables

let args = process.argv.slice(2)  // Process command line variables
let configs = {}                  // Object holding config.yml data

// Setup dice parameters

let dice = {
  coin : {
    n: 1,
    min: 1,
    max: 2
  },
  d4 : {
    min: 1,
    max: 4
  },
  d6 : {
    min: 1,
    max: 6
  },
  d8 : {
    min: 1,
    max: 8
  },
  d10 : {
    min: 1,
    max: 100
  },
  d12 : {
    min: 1,
    max: 4
  },
  d20 : {
    min: 1,
    max: 20
  },
  threeCoin : {
    length: 3,
    min: 2,
    max: 3
  }
}

let hexLines = {
  '6':  '--- x ---',
  '7':  '---------',
  '8':  '---   ---',
  '9':  '----o----'
}

let helpText = `
Please include the die to throw in the format "1d6+2" where:

  - "1" is the number of die to throw
  - "d6" is the number of sides of the die
  - (OPTIONAL) "+2" is a modifier to the roll (+ or -)

Available dice: d4, d6, d8, d10, d12, and d20.

You can also flip a coin with "coin" or receive an
I Ching hexagram using the three coin method by typing "iching".`

// Load YAML configuration

try {
  let configFile = fs.readFileSync('./config.yml', 'utf-8')
  configs = yaml.load(configFile)
  // console.log(configs)
} catch (e) {
  console.log(e)
}

// Get random numbers

function getNumbers(params) {
  let randomNum = new RandomOrg({apiKey: configs.apiKey})

  return randomNum.generateIntegers(params)
    //.then(result => result.random.data)
}

// Get sequences of random numbers 

function getSequences(params) {
  let randomSeq = new RandomOrg({apiKey: configs.apiKey})

  return randomSeq.generateIntegerSequences(params)
    //.then(result => result.random.data)
}

function getCoinFlip() {
  let flip = getNumbers(dice.coin)
    flip.then(result => {
      let final = result.random.data[0]
      let side = final == 1 ? "heads" : (final == 2 ? "tails" : "uncertain")
      console.log(`Your coin landed on `, chalk.bold(`${side}.`))
    })
}

function getDiceRoll(rollArgs) {
  let diceArgs    = rollArgs.split(/d|D/)
  if(diceArgs.length == 1) diceArgs.unshift(1)
  let diceRolls   = diceArgs[0]
  let diceModAdd  = diceArgs[1].search(/\+/) > -1 ? true : false
  let diceModSub  = diceArgs[1].search(/-/) > -1 ? true : false
  let die         = diceArgs[1].split(/\+|-/)
  let dieParams   = dice['d' + die[0]]
    dieParams.n   = diceArgs[0]
  let roll        = getNumbers(dieParams)
    roll.then(result => {
      let final = result.random.data.reduce((a,b) => +a + +b) + (diceModAdd ? +die[1] : 0) + (diceModSub ? (+die[1] * -1) : 0)
      console.log(`Your roll of `, chalk.bold(rollArgs), ` resulted in `, chalk.bold(`${final}.`), chalk.dim(`\n(Individual die rolls: ${result.random.data})`))
    })
}

function getHex() {
  let hexParams = dice.threeCoin
    hexParams.n = 6
  let hexRoll   = getSequences(hexParams)
    hexRoll.then(result =>{
      buildHex(result.random.data)
    })
}

function buildHex(hexRoll) {
  // I Ching is built bottom up, console writes top down, so to display the hex properly we have to reverse the order of the rolls
  let hexNums = []
  let hexGlyphs = []
  
  hexRoll.forEach(line => hexNums.unshift(line.reduce((a,b) => +a + +b)))
  hexNums.forEach(line => hexGlyphs.push(hexLines[+line]))
  console.log(chalk.dim(`
Individual line rolls - bottom is first, top is sixth:

  ${hexRoll[5]} (${hexNums[0]})
  ${hexRoll[4]} (${hexNums[1]})
  ${hexRoll[3]} (${hexNums[2]})
  ${hexRoll[2]} (${hexNums[3]})
  ${hexRoll[1]} (${hexNums[4]})
  ${hexRoll[0]} (${hexNums[5]})
  `),`
Here is your hexagram:
  `,
  chalk.bold.bgWhite(`
             
  ${hexGlyphs[0]}  
  ${hexGlyphs[1]}  
  ${hexGlyphs[2]}  
  ${hexGlyphs[3]}  
  ${hexGlyphs[4]}  
  ${hexGlyphs[5]}  
             `), 
  chalk.red(`
  
Look up your hexagram here: https://www.jamesdekorne.com/GBCh/hexkey.htm`)
  )
}

// Read the die roll argument from the command line

function rollDice(args) {
  let rollArgs = args[0]
  let checker = new RegExp(/^\d*(d|D)(?:4|6|8|10|12|20)(?:\+|-)?\d*$/)

  if(args[1] != undefined){
    console.log('Only one dice roll command at a time. The first command will be used.')
  }

  if(rollArgs == 'coin'){
    getCoinFlip()
  }else if(rollArgs == 'iching'){
    getHex()
  }else if(checker.test(rollArgs)){
    getDiceRoll(rollArgs)
  }else{
    console.log(helpText)
  }
}

rollDice(args)
