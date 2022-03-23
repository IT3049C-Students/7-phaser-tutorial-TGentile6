const config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [scene1, scene2],
    pixelArt: true

}

window.onload = function(){
    var game = new Phaser.Game(config);
}
