// Kyle Nguyen
// Rocket Patrol Modded
//
// Approx Time: 5 hours
//
// Mods:
// Create a new scrolling tile sprite for the background (1)
// Create 4 new explosion sound effects and randomize which one plays on impact (3)
// Implement parallax scrolling for the background (3)
// Display the time remaining (in seconds) on the screen (3)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
//
// Sources:
// sfx-explosion 2: https://www.youtube.com/watch?v=MXibe4aNdGg
// sfx-explosion 3: https://www.youtube.com/watch?v=tUlthCngK9U 
// sfx-explosion 4: https://www.youtube.com/watch?v=soOSI2xE7c4
// sfx-explosion 5: https://www.youtube.com/watch?v=ZuocSHaG7rw 
// timer: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
// emitter: https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/particle%20emitter/explode%20emitter.js

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}


let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
