var gameSettings = {
    playerSpeed: 200,
}

const config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [scene1, scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }

}

window.onload = function(){
    var game = new Phaser.Game(config);
}
