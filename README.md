# true-random-dice-roller

A node.js script for generating dice rolls on the command line using true random numbers from Random.org's API.

## Why a true random dice roller?

Even though the psuedorandom number generators that come standard in most computer systems give pretty good relative randomness, as a developer it is always in the back of my mind that the results are deterministic. For dice rolls, I like the sense that I'm getting something more... _uncertain_. 

The numbers for this dice roller (and I Ching hexagram caster) are fetched from Random.org which uses [atmospheric noise](https://www.random.org/randomness/) to create its non-deterministic true random numbers. 

## Setup

1. Make sure you have [node.js](https://nodejs.org) on your device
2. Clone this repo to your device: `git clone https://github.com/josh-clarke/true-random-dice-roller`
3. Get a free [developer API key](https://api.random.org/dashboard) at Random.org
4. Copy your API key into `config.yml.sample` and rename the file `config.yml`
5. Install dependencies with `yarn` or `npm install`

## Usage

Execute the script with `node roller.js [DICE OPTION]` inside the directory.

The script takes one argument, which is your dice roll in the format `1d6+2`, where '1' is the number of dice, 'd6' is the size of the dice, and '+2' is a modifier to be added to the final total. You can also use a negative modifier, i.e., '-2'. 

**Available dice:**
- **d4**
- **d6**
- **d8**
- **d10**
- **d12**
- **d20**
- **d100**

**In addition to standard dice, there are two special rolls:**
- **coin** - Initiates a simple coin flip
- **iching** - Casts an I Ching hexagram using the three coin method (six sequences of three coin tosses, with heads weighing 3 and tails weighing 2). I Ching mode also builds the hexagram visually and in the correct order in which the lines are cast (first line on the bottom up to the sixth line on the top). No definitions are offered, but a link is provided for you to look up your result. Note that a `--- x ---` is a changing yin line and a `----o----` is a changing yang line.

### Example Ouput

```cli
$ node roller.js 1d20+3           
Your roll of 1d20+3 resulted in  12. 
(Individual die rolls: 9)
```

```cli
$ node roller.js d4
Your roll of d4 resulted in 4. 
(Individual die rolls: 4)
```

```cli
$ node roller.js coin
Your coin landed heads up.
```

```cli
$ node roller.js iching

Individual line rolls - bottom is first, top is sixth:

  3,3,2 (8)
  2,3,2 (7)
  3,2,2 (7)
  2,3,3 (8)
  3,2,2 (7)
  2,3,3 (8)
   
Here is your hexagram:
  
  ---   ---  
  ---------  
  ---------  
  ---   ---  
  ---------  
  ---   ---  
  
Look up your hexagram here: https://www.jamesdekorne.com/GBCh/hexkey.htm
```

## Notes

This is a simple straight-forward script. I may play with it in the future to teach myself how to make it into a module, rewrite it in TypeScript, or something I haven't thought of yet. I'm also open to your ideas and contributions if you have any!

## Credit and Gratitude

This script is made possible by the brilliant work that went into developing and maintaining these node modules:

- [random-org](https://github.com/willfrew/node-random-org)
- [chalk](https://github.com/chalk/chalk)
- [js-yaml](https://github.com/nodeca/js-yaml)