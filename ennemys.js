//Spawn ennemies
var spawnEnnemys = function (lvl)
{
	i=0;
	ennemys=[];
	spawnEnnemysTime(lvl*2,'zombie',100,150,2,0);
	spawnEnnemysTime(lvl,'shooter',50,90,1,2);
}

var spawnEnnemysTime = function (nbr,ennemyType,vitesseMax,vitesseMin,health,shotsPerSeconds)
{	
	setTimeout(function () {
		if(game.state.current=='launchGame')
		{
			switch(Math.floor(Math.random() * 4))
			{
				case 0:
					x = 1100;
					y = 385;
					break;
				case 1:
					x = 0;
					y = 385;
					break;;
				case 2:
					x = 560;
					y = 0;
					break;
				case 3:
					x = 560;
					y = 740;
					break;
			}  
			ennemys[i] = game.add.sprite(x, y, ennemyType);
			ennemys[i].type=ennemyType;
			ennemys[i].vitesse = Math.floor(Math.random()*(vitesseMax-vitesseMin+1)+vitesseMin);
			ennemys[i].health = health;

			if(ennemyType=='shooter')
			{
				ennemys[i].shotsPerSeconds = shotsPerSeconds;
				ennemys[i].weapon = setWeapon('shooter');
	    		ennemys[i].weapon.trackSprite(ennemys[i], 16, 16);
			}
			
	    	game.physics.enable(ennemys[i], Phaser.Physics.ARCADE);
			i++;
			if (i < nbr) 
			{ 
				spawnEnnemysTime(nbr,ennemyType,vitesseMax,vitesseMin,health);
			}
		}
	}, 500);
}

var killEnnemy = function(ennemy)
{
	ennemy.kill();
	kills+=1;
	if(kills%15 == 0)
	{
		newBonus();
	}

	var nextWave=true;

	nextWave=!ennemys.some(exist);

	if(nextWave==true)
	{
		level += 1;
		transition.setText('LEVEL ' + level);
		ennemys.forEach(function(ennemy) {
		  	if(ennemy.type=='shooter')
		  	{
		  		ennemy.weapon.bullets.destroy();
		  	}
		});
		spawnEnnemys(level);
	}
}