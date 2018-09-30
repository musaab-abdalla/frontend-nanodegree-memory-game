# Matching Memory Game

## Overview

The game board consists of 16 "cards" organized in a grid. The deck is made of eight extraordinary pairs of cards, every with distinct symbols on one side. The playing cards are organized randomly at the grid with the symbols face down. The gameplay rules are very simple: flip over  hidden cards at a time to discover the ones that match!.

## Getting Started

### Screenshot

![alt text](https://raw.githubusercontent.com/musaab-abdalla/frontend-nanodegree-memory-game/master/screenshot.jpg "Memory game")

### Live

[Play Memory Game](https://musaab-abdalla.github.io/frontend-nanodegree-memory-game)

## Instructions

### How to load the game'?'

#### Locally

**1.** Clone this repo:

```git
git clone https://github.com/musaab-abdalla/frontend-nanodegree-memory-game.git
```

**2.** Gulp Installation:

To use Gulp, you need to install it as a global module first throught `npm`

```npm
sudo npm install --global gulp
```

Now download Gulp and its plugins to your project. I will specify the plugins we're about to use in `package.json`:

```npm
"devDependencies": {
        "browser-sync": "^2.21.0",
        "gulp": "^3.9.1",
        "gulp-concat": "^2.6.1",
        "gulp-sass": "^3.1.0"
    },
    "dependencies": {
        "animate.css": "^3.5.2",
        "sweetalert2": "^7.1.2"
    }
```

Now install the dependencies by running:

```npm
npm install
```

To run the task open the terminal, navigate to the root of the project and run `gulp` command and task name as a parameter, like this:

```gulp
gulp
```

### How to play the game'?'

* The _**player**_ flips one card over to _**reveal**_ its _**underlying symbol**_.
* The _**player**_ then _**turns over**_ a second card, trying to find the _**corresponding card with the same symbol**_.
* If the _**cards match**_, both cards _**stay flipped over**_.
* If the _**cards do not match**_, both cards are _**flipped face down**_.
* The _**game ends**_ once _**all cards**_ have been correctly _**matched**_.
