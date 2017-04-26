var lose = {
	create: function()
	{
		game.stage.backgroundColor = 'black';
		game.add.tileSprite(0, 100, 1120, 700, 'backgroundMenu');
		game.add.tileSprite(0, 0, 1120, 100, 'black');

		var styleTitre = { font: "70px truelies", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		titre = game.add.text(0, 150, 'Zombie infection',styleTitre);
		titre.setTextBounds(0, 0, 1120, 300);


		var style = { font: "32px truelies ", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		text = game.add.text(0 , 270, 'Perdu !',style);
		text.setTextBounds(0, 0, 1120, 300);
		text2 = game.add.text(0 , 320, 'Niveau : '+level, style);
		text2.setTextBounds(0, 0, 1120, 300);
		text3 = game.add.text(0 , 370, 'Kills : '+kills, style);
		text3.setTextBounds(0, 0, 1120, 300);

		button = game.add.button(game.world.centerX - 132, 450, 'buttonPlay', this.start,this);

	},
	start: function()
	{
		level=1;
		kills=0;
		game.state.start('launchGame');
	}
}
