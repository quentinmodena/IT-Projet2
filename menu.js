var menu = {
	create: function()
	{
		game.stage.backgroundColor = 'black';

		game.add.tileSprite(0, 100, 1120, 700, 'backgroundMenu');

		var styleTitre = { font: "70px truelies", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		titre = game.add.text(0, 150, 'Zombie infection',styleTitre);
		titre.setTextBounds(0, 0, 1120, 300);

		button = game.add.button(game.world.centerX - 132, 400, 'buttonPlay', this.start,this);
	},
	start: function()
	{
		game.state.start('launchGame');
	}
}
