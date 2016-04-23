var Game = function(game){}

Game.prototype = {
    create:function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.world.setBounds(0,0,360,700);
        
        this.levelData = JSON.parse(this.game.cache.getText('level'));
        this.player = this.game.add.sprite(this.levelData.playerStart.x,this.levelData.playerStart.y,'player',3);
       //doy animación
    this.player.animations.add('walking',[0,1,2,1],6,true);
    //capturo las teclas de cursores
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.anchor.setTo(0.5);
    //agrego física al player
    this.game.physics.arcade.enable(this.player);
    
    this.player.body.collideWorldBounds = true;
    
    
    //crea grupo de plataformas
    this.platformGroup = this.game.add.group();
    
    this.platformGroup.enableBody = true;
    this.levelData.platformData.forEach(function(element){
        this.platformGroup.create(element.x,element.y,'platform');
    },this);
    this.platformGroup.setAll('body.immovable',true);
    this.platformGroup.setAll('body.allowGravity',false);
    this.ground = this.game.add.sprite(0,638,'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.barrilGroup = this.game.add.group();
    this.elapsed = 0;
    this.barrilFrequency = this.levelData.barrelFrequency * 1000;
    }
}