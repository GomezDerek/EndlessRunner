///////////////////////////////////////////////////////////////
//                                                           //
//                     LUNAS'S ODYSSEY                       //
//                  Completed: 05/03/2020                    //
//                                                           //
//                                                           //
//  Created by:      Grecia Salazar B)                       //
//                   Gabrielle Serna C:                      //
//                   Derek Gomez ;P                          //
//                                                           //
//  Created for:     CMPM 163 Game Design Experience         //
//                   UCSC Spring 2020                        //     
//                                                           //                      
///////////////////////////////////////////////////////////////
//                                                           //
//            WE STOLE CODE FROM THESE PLACES                // 
//                                                           //       
//            https://github.com/nathanaltice                //
//            https://phaser.io/examples/v3                  //
//            https://github.com/photonstorm/phaser          //
//                                                           //
//                                                           //
//            MUSIC & SOUND:                                 //
//            "Dragon Lady Theme" by Christina Bulosan       //
//            cbulosann@gmail.com                            //
//                                                           //       
///////////////////////////////////////////////////////////////






// "tame the javashrek" - Nathan Altice
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

// define game
var game = new Phaser.Game(config);

// global variables
const SCALE = 0.5;
const tileSize = 35;
var spaceBar;
var music;
const obstacleWidth = 100;
const obstacleHeight = 300;
let obstacle = null;
let centerX = game.config.width/2;