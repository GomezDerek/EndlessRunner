// tame the javashrek
"use strict";

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Runner ]
};

//define game
let game = new Phaser.Game(config);

// global variables
const SCALE = 0.5;
const tileSize = 35;
var spaceBar;
var music;
const obstacleWidth = 100;
const obstacleHeight = 300;
let obstacle = null;
let centerX = game.config.width/2;