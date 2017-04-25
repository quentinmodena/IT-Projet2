var launchGame = {
	create:function()
	{
		game.stage.backgroundColor = '#2d2d2d';
		game.time.advancedTiming = true;

		map = game.add.tilemap('map');

		map.addTilesetImage('ground_1x1');
		map.addTilesetImage('walls_1x2');
		map.addTilesetImage('tiles2');

		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();

	    //weapon
	    weapon = setWeapon(1);


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
	},
	update: function()
	{
		game.physics.arcade.collide(char, layer);

	    ennemys.forEach(function(ennemy) {
		  	//game.physics.arcade.collide(ennemy, layer);
		  	game.physics.arcade.collide(ennemy, char , function(){
		  		game.state.start('lose');
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
	},
	render: function()
	{
		game.debug.text('Level : ' + level, 32, 32, 'rgb(0,0,0)');
	    game.debug.text('Ennemys : ' + ennemys.length, 32, 48, 'rgb(0,0,0)');
	    game.debug.text('FPS : ' + game.time.fps, 32, 64, 'rgb(0,0,0)');
	}
}

var cursors;
var layer;
var map;
var ennemys;
var level=1;
var play=false;

var i;
var x;
var y;

var exist = function (element) {
  return element.exists;
}

var bulletHitEnnemy = function (ennemy, bullet)
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





var setWeapon = function (idWeapon)
{
	//switch pour plusirus weapons

	var weapon = game.add.weapon(30, 'bullet');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    weapon.bulletSpeed = 700;

    weapon.fireRate = 60;

    weapon.bulletAngleVariance = 6;

    weapon.bulletAngleOffset= 90;


    return weapon;
}

var spawnEnnemys = function (nbr)
{
	i=0;
	ennemys=[];
	spawnEnnemysTime(nbr);
}

var spawnEnnemysTime = function (nbr)
{	
	setTimeout(function () {
		if(game.state.current=='launchGame')
		{
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
		}
	}, 500);
}