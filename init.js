var game = new Phaser.Game(1120, 770, Phaser.CANVAS, 'gameFull');
game.state.add('boot',boot);
game.state.add('load',load);
game.state.add('menu',menu);
game.state.add('launchGame',launchGame);
game.state.add('lose',lose);

game.state.start('boot');

