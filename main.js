
var game = new Phaser.Game(1120, 770, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

var cursors;
var layer;
var map;
var ennemys;
var level=1;
var play=false;

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




function create() 
{
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#2d2d2d';
	game.time.advancedTiming = true;

	map = game.add.tilemap('map');

	map.addTilesetImage('ground_1x1');
	map.addTilesetImage('walls_1x2');
	map.addTilesetImage('tiles2');

	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();

	

	
	

    //weapon
    weapon = weapon(1);


    //personnage
    map.setCollisionBetween(1, 12);

	char = game.add.sprite(200, 200, 'char');
	char.anchor.setTo(0.5, 0.5);

	game.physics.enable(char, Phaser.Physics.ARCADE);

    game.camera.follow(char);

    cursors = game.input.keyboard.createCursorKeys();

    char.body.collideWorldBounds=true;

    weapon.trackSprite(char, 0, 0);

    spawnEnnemys(2);

    if(!play)
    {
    	/*game.paused = true;
    	button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0); */
    }
	
}

function update() 
{
    game.physics.arcade.collide(char, layer);

    ennemys.forEach(function(ennemy) {
	  	//game.physics.arcade.collide(ennemy, layer);
	  	game.physics.arcade.collide(ennemy, char , function(){
	  		choiseLabel = game.add.text(500, 400, 'PERDU', { font: '30px Arial', fill: '#fff' });
	  		game.paused = true;
	  	});
	  	game.physics.arcade.moveToObject(ennemy, char, ennemy.vitesse);
	  	game.physics.arcade.overlap(weapon.bullets, ennemy, bulletHitEnnemy);
	});
   

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

    if (game.input.activePointer.isDown)
    {
        weapon.fireAtPointer();
    }   

}

function render() 
{

    game.debug.text('Level : ' + level, 32, 32, 'rgb(0,0,0)');
    game.debug.text('Ennemys : ' + ennemys.length, 32, 48, 'rgb(0,0,0)');
    game.debug.text('FPS : ' + game.time.fps, 32, 64, 'rgb(0,0,0)');
}

function exist(element) {
  return element.exists;
}

function bulletHitEnnemy(ennemy, bullet)
{
	if(ennemy.health-- <= 0)
		ennemy.kill();
	bullet.kill();

	var nextWave=true;

	nextWave=!ennemys.some(exist);

	if(nextWave==true)
	{
		level += 1;
		
		spawnEnnemys(level*level);
	}

	
}



var i;
var x;
var y;

function spawnEnnemys(nbr)
{
	i=0;
	ennemys=[];
	spawnEnnemysTime(nbr);
}

function spawnEnnemysTime(nbr)
{
	console.log(nbr);
	
	setTimeout(function () {

		switch(x)
		{
			case 560:
				switch(y)
				{
					case 0:
						x = 1100;
						y = 385;
						break;
					case 770:
						x = 0;
						y = 385;
						break;
				}
				break;
			case 0:
				x = 560;
				y = 0;
				break;
			case 1100:
				x = 560;
				y = 770;
				break;
			default:
				x = 560;
				y = 0;
				break;
		}  
		ennemys[i] = game.add.sprite(x, y, 'ennemy');
		ennemys[i].vitesse = 90 + Math.floor(Math.random() * 50) + 1;
		ennemys[i].health = 2;
    	game.physics.enable(ennemys[i], Phaser.Physics.ARCADE);
		i++;
		if (i < nbr) 
		{ 
			spawnEnnemysTime(nbr);
		}
	}, 500);
	
}
