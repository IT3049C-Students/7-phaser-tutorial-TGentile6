class scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("background", "phaser/images/background.png");
        this.load.spritesheet("ship", "phaser/spritesheets/ship.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2", "phaser/spritesheets/ship2.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3", "phaser/spritesheets/ship3.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion", "phaser/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame");
    }
}