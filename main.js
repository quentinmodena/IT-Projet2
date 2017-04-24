var game = new Phaser.Game(1120, 770, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() 
{

    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.atlas('character', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
	game.load.image('ground_1x1', 'assets/ground_1x1.png');
    game.load.image('walls_1x2', 'assets/walls_1x2.png');
    game.load.image('tiles2', 'assets/tiles2.png');
    game.load.image('char', 'assets/char.png');
    game.load.image('ennemy', 'assets/ennemy.png');
    game.load.image('bullet', 'assets/bullet.png');

}

var cursors;
var layer;
var map;
var ennemys;


function create() 
{

	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d'

	map = game.add.tilemap('map');

	map.addTilesetImage('ground_1x1');
    map.addTilesetImage('walls_1x2');
    map.addTilesetImage('tiles2');

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    //weapon
    weapon = game.add.weapon(30, 'bullet');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 60;

    //  Add a variance to the bullet angle by +- this value
    weapon.bulletAngleVariance = 10;


    //personnage
    map.setCollisionBetween(1, 12);

	char = game.add.sprite(200, 200, 'char');
	char.anchor.setTo(0.5, 0.5);

	game.physics.enable(char, Phaser.Physics.ARCADE);

    game.camera.follow(char);

    cursors = game.input.keyboard.createCursorKeys();

    char.body.collideWorldBounds=true;

    weapon.trackSprite(char, 14, 0);

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);



    //ennemy
    spawnEnnemys(500);
    /*ennemys = game.add.group();
    ennemys.enableBody = true;
    ennemys.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 10; i++)
    {
        var ennemy = ennemys.create(560,0, 'ennemy');

        //This allows your sprite to collide with the world bounds like they were rigid objects
        ennemy.body.collideWorldBounds=true;
        ennemy.body.bounce.setTo(0.9, 0.9);
        
    }*/

    



}

function update() 
{
    game.physics.arcade.collide(char, layer);

    ennemys.forEach(function(ennemy) {
	  	game.physics.arcade.collide(ennemy, layer);
	  	game.physics.arcade.collide(ennemy, char , function(){
	  		choiseLabel = game.add.text(500, 400, 'PERDU', { font: '30px Arial', fill: '#fff' });
	  		game.paused = true;
	  	});
	  	game.physics.arcade.moveToObject(ennemy, char, ennemy.vitesse);
	});
    

    

    //console.log(game.physics.arcade.angleBetween(char, ennemys));

    /*if(ennemys.body.position.x>char.body.position.x+1)
    {
    	
    }
    else
    {*/
    	
    //}

    char.body.velocity.x = 0;
    char.body.velocity.y = 0;

    if (cursors.up.isDown)
    {
        char.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        char.body.velocity.y = 200;
    }

    if (cursors.left.isDown)
    {
        char.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        char.body.velocity.x = 200;
    }

    /*if (fireButton.isDown)
    {
    	weapon.fireAngle=game.physics.arcade.angleToPointer(char);
        weapon.fire();
    }*/
    

}

function render() 
{

    game.debug.text('Click to swap tiles', 32, 32, 'rgb(0,0,0)');
    game.debug.text('Tile X: ' + layer.getTileX(char.x), 32, 48, 'rgb(0,0,0)');
    game.debug.text('Tile Y: ' + layer.getTileY(char.y), 32, 64, 'rgb(0,0,0)');

}


function spawnEnnemys(nbr)
{
	ennemys=[];
	for(var i=0;i<nbr;i++)
	{
		var x;
		var y;

		switch(Math.floor(Math.random() * 4) + 1)
		{
			case 1:
				x = 560;
				y = 0;
				break;
			case 2:
				x = 0;
				y = 385;
				break;
			case 3:
				x = 1100;
				y = 385;
				break;
			case 4:
				x = 560;
				y = 770;
				break;
		}  
		ennemys[i] = game.add.sprite(x, y, 'ennemy');
		ennemys[i].vitesse = 90 + Math.floor(Math.random() * 50) + 1;
    	game.physics.enable(ennemys[i], Phaser.Physics.ARCADE);
	}
	
}

