//Generation "aleatoire" position bonus
var newBonus = function ()
{
	if(typeof bonus == 'undefined' || !bonus.visible)
	{
		var pox,posy,typeBonus;
		switch(Math.floor(Math.random() * 20))
		{
			case 0: posx = 200; posy = 200; break;
			case 1: posx = 300; posy = 225; break;
			case 2: posx = 400; posy = 264; break;
			case 3: posx = 500; posy = 140; break;
			case 4: posx = 600; posy = 182; break;
			case 5: posx = 700; posy = 278; break;
			case 6: posx = 800; posy = 126; break;
			case 7: posx = 900; posy = 250; break;
			case 8: posx = 900; posy = 305; break;
			case 9: posx = 900; posy = 405; break;
			case 10: posx = 900; posy = 506; break;
			case 11: posx = 800; posy = 550; break;
			case 12: posx = 700; posy = 570; break;
			case 13: posx = 600; posy = 620; break;
			case 14: posx = 500; posy = 635; break;
			case 15: posx = 400; posy = 510; break;
			case 16: posx = 300; posy = 568; break;
			case 17: posx = 235; posy = 555; break;
			case 18: posx = 200; posy = 655; break;
			case 19: posx = 200; posy = 385; break;
		}  

		switch(Math.floor(Math.random() * 10))
		{
			case 0:
			case 1:
				typeBonus='nuke';
				break;
			default:
				typeBonus='shotgun';
				break;
		}
		
		newBonusShow(posx, posy, typeBonus);
	}
}

var newBonusShow = function (posx, posy, type)
{
	bonus = game.add.sprite(posx, posy, type);
	bonus.type=type;
	game.physics.enable(bonus, Phaser.Physics.ARCADE);
}

var charGetBonus = function()
{
	bonus.kill();
	switch(bonus.type)
	{
		case 'shotgun':
			char.weapon = setWeapon('charShotgun');
			char.weapon.trackSprite(char, 0, 0);
			game.time.events.add(Phaser.Timer.SECOND * 4, setBaseWeapon, this);
			break;
		case 'nuke':
			ennemys.forEach(function(ennemy) {
				killEnnemy(ennemy);
			});
			break;

	}
	
}

var setBaseWeapon = function()
{
	char.weapon = setWeapon('char');
	char.weapon.trackSprite(char, 0, 0);
}