const config = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [scene1, scene2]

}

window.onload = function(){
    var game = new Phaser.Game(config);
}
