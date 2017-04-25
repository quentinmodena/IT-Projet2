
function weapon(idWeapon)
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