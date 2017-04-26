var load= {
	preload: function()
	{
		game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('ground_1x1', 'assets/ground_1x1.png');
	    game.load.image('walls_1x2', 'assets/walls_1x2.png');
	    game.load.image('tiles2', 'assets/tiles2.png');
	    game.load.image('char', 'assets/char.png');
	    game.load.image('zombie', 'assets/ennemy.png');
	    game.load.image('bullet', 'assets/bullet.png');
	    game.load.image('bulletEnnemy', 'assets/bulletEnnemy.png');
	    game.load.image('buttonPlay', 'assets/button-play.png');
	    game.load.image('backgroundMenu', 'assets/background-menu.jpg');
	    game.load.image('shooter', 'assets/soldier.png');
	    game.load.image('black', 'assets/black.png');
	    game.load.image('shotgun', 'assets/shotgun.png');
	    game.load.image('nuke', 'assets/bomb.png')
	},

	create:function()
	{
		game.state.start('menu');
	}
}