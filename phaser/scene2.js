class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        this.add.text(20, 20, "Playing Game...", {font: "25px Arial", fill: "yellow"});
    }
}