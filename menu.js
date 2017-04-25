var menu = {
	create: function()
	{
		var style = { font: "32px Arial", backgroundColor:'white', borderRadius:'50px' };
		//game.state.start('game');
		button = game.add.button(game.world.centerX - 95, 400, 'buttonPlay', this.start,this);
	},
	start: function()
	{
		game.state.start('launchGame');
	}
}
