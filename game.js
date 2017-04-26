/* TODO
*
BUGS:
*	character bloque
*	hitbox carrée
*
*
*/


var launchGame = {
	create:function()
	{
		//Init map
		game.stage.backgroundColor = '#2d2d2d';
		game.time.advancedTiming = true;

		map = game.add.tilemap('map');

		map.addTilesetImage('ground_1x1');
		map.addTilesetImage('walls_1x2');
		map.addTilesetImage('tiles2');

		map.setCollisionBetween(1, 12);

		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();

		
		var style2 = { font: "30px truelies", fill :"black"};
		viewKills = game.add.text(32, 32, 'KILLS : ' + kills,style2);
		viewFps = game.add.text(32, 76, 'FPS : ' + game.time.fps,style2);
		var style3 = { font: "50px truelies ", fill :"black",align:'center', boundsAlignH: "center",boundsAlignV: "center"};		
		transition = game.add.text(0, 360, 'level '+level,style3);
		transition.setTextBounds(0, 0, 1120, 300);


	    //Init character
		char = game.add.sprite(200, 200, 'char');
		char.anchor.setTo(0.5, 0.5);
		char.health=1;

		game.physics.enable(char, Phaser.Physics.ARCADE);

	    game.camera.follow(char);

	    cursors = game.input.keyboard.createCursorKeys();

	    char.body.collideWorldBounds=true;

	    //Init Weapon Character
	    char.weapon = setWeapon('char');
	    char.weapon.trackSprite(char, 0, 0);

	    //Spawn ennemies (only lvl 1)
	    spawnEnnemys(level);


	    
	},
	update: function()
	{
		//Collision map / character
		game.physics.arcade.collide(char, layer);

		//Collision bonus / char
		game.physics.arcade.overlap(char, bonus, charGetBonus);

		//Collision bullet / layer
		game.physics.arcade.collide(layer, char.weapon.bullets,  bulletsHitLayer);

		//Gestion ia
	    ennemys.forEach(function(ennemy) {
	    	game.physics.arcade.collide(ennemy, layer);

		  	if(ennemy.type=='zombie' && ennemy.exists)
		  	{
		  		//if (!ennemy.isBlocked)
		  		//{
		  			game.physics.arcade.moveToObject(ennemy, char, ennemy.vitesse);
		  		//}

		  		game.physics.arcade.overlap(char, ennemy, zombieHitChar);
		  	}
		  	else if (ennemy.type=='shooter')
		  	{
		  		if (game.physics.arcade.distanceBetween(char, ennemy) < 600 && ennemy.exists)
			    {

			        ennemy.weapon.fireAtSprite(char);
			    }
			    else
			    {

			    	game.physics.arcade.moveToObject(ennemy, char, ennemy.vitesse);
			    	
			    }
			    game.physics.arcade.overlap(char, ennemy.weapon.bullets,  zombieHitChar);
			    game.physics.arcade.collide(layer, ennemy.weapon.bullets,  bulletsHitLayer);

		  	}
		  	game.physics.arcade.overlap(char.weapon.bullets, ennemy, bulletHitEnnemy);
		});
	   
	    //Deplacement character
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

	    //Tir personnage
	    if (game.input.activePointer.isDown)
	    {
	        char.weapon.fireAtPointer();

	    } 
	},
	render: function()
	{
		viewFps.setText('FPS : ' + game.time.fps);
		viewKills.setText('Kills : ' + kills);
	}
}

//pause / unpause
document.onkeydown = function(e) {
  if (game.paused)
  	game.paused=false;
  else if (e.keyCode === 27) 
  	game.paused=true;
};




var cursors;
var layer;
var map;
var ennemys;
var level=1;
var play=false;
var kills=0;
var bonus;

var i;
var x;
var y;

var exist = function (element) {
  return element.exists;
}

var bulletHitEnnemy = function (ennemy, bullet)
{
	bullet.kill();
	ennemy.health--;
	if(ennemy.health <= 0)
	{
		killEnnemy(ennemy);
	}	
}

var bulletsHitLayer = function(bullet,layer)
{
	bullet.kill();
}

var zombieHitChar = function (ennemy, char)
{
	char.health--
	if(char.health <= 0)
		game.state.start('lose');
}
/*
var ennemyCollideLayer = function (ennemy, layer)
{
	ennemy.isBlocked = true;

	if(ennemy.position.x==ennemy.previousPosition.x)
	{
		game.physics.arcade.moveToXY(ennemy, ennemy.position.x, ennemy.position.y-50, ennemy.vitesse, );
	}
}*/

//Init weapons argument != selon type de personnage 
var setWeapon = function (idWeapon)
{
	var weaponSet;
	switch(idWeapon)
	{
		case 'shooter':
			weaponSet = game.add.weapon(10, 'bulletEnnemy');

		    weaponSet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		    weaponSet.bulletSpeed = 150;
		    weaponSet.fireRate = 2000;
		    weaponSet.bulletAngleVariance = 10;
		    weaponSet.bulletAngleOffset= 90;
		    weaponSet.bulletLifespan=5;
			break;
		case 'char':
			weaponSet = game.add.weapon(30, 'bullet');

		    weaponSet.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		    weaponSet.bulletSpeed = 700;
		    weaponSet.fireRate = 150;
		    weaponSet.bulletAngleVariance = 6;
		    weaponSet.bulletAngleOffset= 90;
		    weaponSet.bulletKillDistance = 600;
		    break;
		case 'charShotgun':
			weaponSet = game.add.weapon(20, 'bullet');

		    weaponSet.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		    weaponSet.bulletSpeed = 700;
		    weaponSet.fireRate = 10;
		    weaponSet.bulletAngleVariance = 15;
		    weaponSet.bulletAngleOffset= 90;
		    weaponSet.bulletKillDistance = 450;
		    break;

	}


    return weaponSet;
}




