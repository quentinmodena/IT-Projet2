var lose = {
	create: function()
	{
		var style = { font: "32px Arial", backgroundColor:'white', borderRadius:'50px' };
		//game.state.start('game');
		game.add.text(game.world.centerX - 95, 200, 'Perdu !', style);
		game.add.text(game.world.centerX - 95, 250, 'Niveau : '+level, style);
		button = game.add.button(game.world.centerX - 95, 400, 'buttonPlay', this.start,this);
	},
	start: function()
	{
		level=1;
		game.state.start('launchGame');
	}
}
