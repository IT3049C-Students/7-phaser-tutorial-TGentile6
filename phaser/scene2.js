class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        //loading basic assets
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship");
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");

        //score
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.height, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);

        //player
        this.player = this.physics.add.sprite(config.width / 2-8, config.height - 64, "player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        //ship interactivity
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on("gameobjectdown", this.destroyShip, this);

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        //power ups
        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, config.width, config.height);

            if (Math.random() > 0.5) {
                powerUp.play("red");
            }
            else{
                powerUp.play("gray");
            }

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        //collision
        this.physics.add.collider(this.projectiles, this.powerUps, 
            function(projectile, powerUp){
                projectile.destroy();
            }
        );

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    }

    
    update(){
        this.background.tilePositionY -= 0.2;
        this.moveShip(this.ship1, .5);
        this.moveShip(this.ship2, 1);
        this.moveShip(this.ship3, 1.5);

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
        }
        for(var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else{
            this.player.setVelocityY(0);
        }
    }

    moveShip(ship, speed){
        ship.y += speed;
        if(ship.y > config.height){
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship){
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    shootBeam(){
        var beam = new Beam(this);
    }

    pickPowerUp(player, powerUp){
        powerUp.disableBody(true, true);
    }

    hurtPlayer(player, enemy){
        this.resetShipPos(enemy);
        player.x = config.width / 2 - 8;
        player.y = config.height - 64 ;
    }

    hitEnemy(projectile, enemy){
        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        var scoreFormatted = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormatted;
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}