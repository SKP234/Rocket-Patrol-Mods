class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        // place tile sprite
        this.space = this.add.tileSprite(0, 0, 640, 480, 'space').setOrigin(0, 0)
        this.starfieldbackground = this.add.tileSprite(0, 0, 640, 480, 'starfieldbackground').setOrigin(0, 0)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0)
        // add moon
        this.moon = new Moon(this, -80, Math.random()*280+120, 'moon', 0).setOrigin(0, 0)
        this.moon.alpha = 0.4
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        // display time
        let timeConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#ffffff',
          color: '#000000',
          align: 'left',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        // display time changes
        let missConfig = {
          fontFamily: 'Courier',
          fontSize: '34px',
          backgroundColor: '#00FF00',
          color: '#912f41',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        let hitConfig = {
          fontFamily: 'Courier',
          fontSize: '34px',
          backgroundColor: '#00FF00',
          color: '#29368c',
          align: 'center',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.timeRemaining = game.settings.gameTimer / 1000
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding - timeConfig.fixedWidth, borderUISize + borderPadding*2, this.timeRemaining, timeConfig)
        this.missText = this.add.text((game.config.width - borderUISize - borderPadding - (timeConfig.fixedWidth/2)) / 2, borderUISize + borderPadding*2 + 5, "-5s", missConfig)
        this.missText.setVisible(false)
        this.hitText = this.add.text((game.config.width - borderUISize - borderPadding - (timeConfig.fixedWidth/2)) / 2, borderUISize + borderPadding*2 + 5, "+5s", hitConfig)
        this.hitText.setVisible(false)
        // GAME OVER flag
        this.gameOver = false

        // // 60-second play clock
        // scoreConfig.fixedWidth = 0
        // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5)
        //     this.gameOver = true
        // }, null, this)
        // countdown timer
        this.timer = this.time.addEvent({
          delay: 1000,
          callback: () => {
            if(this.timeRemaining > 0){
            this.timeRemaining -= 1
            this.timeRight.text = this.timeRemaining
            }
            else{
              scoreConfig.fixedWidth = 0
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5)
              this.gameOver = true
            }
          },
          loop: true
        });

    }

    update() {
                // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        this.starfield.tilePositionX -= 1
        this.starfieldbackground.tilePositionX -= 0.5
        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.checkRocket(this.p1Rocket)
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.moon.update()
        } 
        // check collisions
  if(this.checkCollision(this.p1Rocket, this.ship03)) {
    this.p1Rocket.reset()
    this.hitRocket(this.ship03)
    this.shipExplode(this.ship03)   
  }
  if (this.checkCollision(this.p1Rocket, this.ship02)) {
    this.p1Rocket.reset()
    this.hitRocket(this.ship02)
    this.shipExplode(this.ship02)
  }
  if (this.checkCollision(this.p1Rocket, this.ship01)) {
    this.p1Rocket.reset()
    this.hitRocket(this.ship01)
    this.shipExplode(this.ship01)
  }
    }

    checkRocket(rocket){
        if(rocket.y <= borderUISize * 3 + borderPadding){
            rocket.isFiring = false
            rocket.y = game.config.height - borderUISize - borderPadding
            this.missedRocket()
        }
    }
    missedRocket(){
      this.timeRemaining -= 5
      this.timeRight.text = this.timeRemaining
      this.blink = this.time.addEvent({
        delay: 100,
        callback: () => {
          this.missText.setVisible(true)
          this.time.delayedCall(50, () =>{
            this.missText.setVisible(false)
          })
        },
        repeat: 5
      });

    }
    hitRocket(ship){
      let timeChange = ship.points / 10
      this.timeRemaining += timeChange
      this.timeRight.text = this.timeRemaining
      this.hitText.text = '+' + timeChange + 's'
      this.blink = this.time.addEvent({
        delay: 100,
        callback: () => {
          this.hitText.setVisible(true)
          this.time.delayedCall(50, () =>{
            this.hitText.setVisible(false)
          })
        },
        repeat: 5
      });
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
      }

      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let explodes = this.add.particles(ship.x, ship.y, 'explodeparticle', {
          lifespan: 2000,
          speed: 100,
          scale: 0.3,
        })
        explodes.explode(16)
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })   
                
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        let sounds = ['sfx-explosion', 'sfx-explosion2', 'sfx-explosion3', 'sfx-explosion4', 'sfx-explosion5']
        this.sound.play(sounds[Math.floor(Math.random() * sounds.length)])         
      }

}