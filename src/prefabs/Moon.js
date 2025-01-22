class Moon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
    }
    update(){
        this.x += 0.2
        if(this.x > 620){
            this.x = -80
            this.y = Math.random()*280+120
        }
    }
    reset(){
        this.x = game.config.width
    }
}