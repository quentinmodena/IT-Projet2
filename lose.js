var lose = {
	create: function()
	{
		game.stage.backgroundColor = 'black';
		game.add.tileSprite(0, 100, 1120, 700, 'backgroundMenu');


		var styleTitre = { font: "70px truelies", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		titre = game.add.text(0, 150, 'Zombie infection',styleTitre);
		titre.setTextBounds(0, 0, 1120, 300);


		var style = { font: "32px truelies ", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		text = game.add.text(0 , 300, 'Perdu ! Niveau : '+level, style);
		text.setTextBounds(0, 0, 1120, 300);

		button = game.add.button(game.world.centerX - 132, 450, 'buttonPlay', this.start,this);

	},
	start: function()
	{
		level=1;
		game.state.start('launchGame');
	}
}
