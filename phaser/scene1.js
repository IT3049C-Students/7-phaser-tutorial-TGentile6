class scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("background", "phaser/images/background.png");
        this.load.image("ship", "phaser/images/ship.png");
        this.load.image("ship2", "phaser/images/ship2.png");
        this.load.image("ship3", "phaser/images/ship3.png");
    }

    create() {
        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame");
    }
}