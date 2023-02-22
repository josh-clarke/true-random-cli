# True Random Dice Roller

A node.js script for generating dice rolls on the command line using true random numbers from Random.org's API.

## Why a true random dice roller?

Even though the psuedorandom number generators that come standard in most computer systems give pretty good relative randomness, as a developer it is always in the back of my mind that the results are deterministic. For dice rolls, I like the sense that I'm getting something more... _uncertain_. 

The numbers for this dice roller are fetched from Random.org which uses [atmospheric noise](https://www.random.org/randomness/) to create its non-deterministic true random numbers. 

And it can also cast an _I Ching_ hexagram for you using the three coin method!

## Setup

1. Make sure you have [node.js](https://nodejs.org) 
2. Clone this repo: `git clone https://github.com/josh-clarke/true-random-dice-roller`
3. Get a free [developer API key](https://api.random.org/dashboard) at Random.org
4. Copy your API key into `config.yml.sample` and rename the file `config.yml`
5. Install dependencies with `yarn` or `npm install`

## Usage

Execute the script inside the directory with:

```cli
node roller.js [DICE OPTION]
``` 

The script takes one argument, which is your dice roll in the format `1d6+2`, where:
- `1` is the number of dice, 
- `d6` is the size of the die, and 
- `+2` is an _optional_ modifier to be added to the final total. You can also use a negative modifier, i.e., `-2`. 

**Available dice:**
- **d4**
- **d6**
- **d8**
- **d10**
- **d12**
- **d20**
- **d100**

**In addition to standard dice, there are two special rolls:**
- **coin** - Initiates a simple heads-or-tails coin flip
- <a name="iching"></a>**iching** - Casts an _I Ching_ hexagram using the three coin method<sup>[1](#threecoinmethod)</sup>. _I Ching_ mode also builds the hexagram visually and in the correct order in which the lines are cast<sup>[2](#hexagrambuilding)</sup>. No definitions are offered, but a link is provided for you to look up your result. Note that a `--- x ---` is a changing yin line and a `----o----` is a changing yang line.

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
$ node roller.js 9d100 
Your roll of 9d100 resulted in 463. 
(Individual die rolls: 56,3,71,51,88,54,88,8,44)
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

---

1. <a name="threecoinmethod"></a> _The three coin method builds a hexagram through six sequences of three-coin tosses. Heads weigh 3 and tails weigh 2. The total of the line determines one of four lines: 6 = old yin (changing), 7 = young yang, 8 = young yin, 9 = old yang (changing)._ [↩︎](#iching)
2. <a name="hexagrambuilding"></a> _When you generate a hexagram, the first line that you cast goes on the bottom and each successive line stacks on top. The final sixth line is at the top. Your hexagram rolls and the hexagram visualization are both shown in this order._ [↩︎](#iching)