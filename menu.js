//Menu start game onclick button
var menu = {
	create: function()
	{
		game.stage.backgroundColor = 'black';

		game.add.tileSprite(0, 100, 1120, 700, 'backgroundMenu');

		var styleTitre = { font: "70px truelies", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		titre = game.add.text(0, 150, '',styleTitre);
		titre.setTextBounds(0, 0, 1120, 300);

		var style = { font: "32px truelies ", fill :"#6bd80b",align:'center', boundsAlignH: "center"};
		text = game.add.text(0 , 270, '',style);
		text.setTextBounds(0, 0, 1120, 300);
		text2 = game.add.text(0 , 320, '', style);
		text2.setTextBounds(0, 0, 1120, 300);

		button = game.add.button(game.world.centerX - 132, 400, 'buttonPlay', this.start,this);
	},
	render: function()
	{	
		titre.setText('Zombie infection');
		text.setText('Deplace le personnage avec les touches directionnelles');
		text2.setText('Tire avec la souris');
	},
	start: function()
	{
		game.state.start('launchGame');
	}
}
