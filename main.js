window.onload = function() {
    var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'game-screen', { preload: preload, create: create, update: update });

    // var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

    function preload() {

        game.load.spritesheet('sheep', 'assets/images/sheep24x30.png', 24, 30);

    }
    var sheep;
    var burger;
    var cursors;
    var sheepFront;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#2d2d2d';

        //  This sprite was created with the Phaser Gen Paint app
        //  also available in the Phaser Examples repo and on the Phaser site.
        var pixelWidth = 6;
        var pixelHeight = 6;
        
        sheep = game.add.sprite(150, 240, 'sheep');
        sheep.scale.set(3);
        sheep.smoothed = false;
        sheep.anchor.set(0.5);
        sheep.animations.add('walk');
        sheep.animations.play('walk', 1, true);

        game.physics.arcade.enable(sheep);

        var burgerData = [
            '................',
            '................',
            '................',
            '.....7277276....',
            '....727777776...',
            '....777277276...',
            '....888888887...',
            '....555555550...',
            '....BBBBBBBBA...',
            '....3333BB333...',
            '....777777776...',
            '................',
            '................',
            '................',
            '................',
            '................'
        ];
        game.create.texture('burger', burgerData, pixelWidth, pixelHeight, 0);
        burger = game.add.sprite(150, 400, 'burger');

        burger.inputEnabled = true;
        burger.events.onInputDown.add(feed, this);

        // var sheepFrontData = [
        //     '................',
        //     '.....222222.....',
        //     '....22222222....',
        //     '...7220770227...',
        //     '..772777777277..',
        //     '....24777742....',
        //     '....27666672....',
        //     '....26766762....',
        //     '....22655622....',
        //     '....22222222....',
        //     '....27422472....',
        //     '.....242242.....',
        //     '.....222222.....',
        //     '......2..2......',
        //     '......2..2......',
        //     '......7..7......'
        // ];
        // game.create.texture('sheepFront', sheepFrontData, pixelWidth, pixelHeight, 0);

        // cursors = game.input.keyboard.createCursorKeys();

        // // setInterval(function(){}, 200)
        // game.input.onDown.addOnce(changeMummy, this);

    }
    function changeMummy() {

        sheep.loadTexture('sheepFront', 0);
    }

    function update() {

        // sheep.body.velocity.x = 0;
        // sheep.body.velocity.y = 0;

        // if (cursors.left.isDown)
        // {
        //     sheep.body.velocity.x = -200;
        //     sheep.scale.x = 1;
        // }
        // else if (cursors.right.isDown)
        // {
        //     sheep.body.velocity.x = 200;
        //     sheep.scale.x = -1;
        // }

        // if (cursors.up.isDown)
        // {
        //     sheep.body.velocity.y = -200;
        // }
        // else if (cursors.down.isDown)
        // {
        //     sheep.body.velocity.y = 200;
        // }

    }

    function feed(burger, pointer) {
        console.log('feed!');
    }


};
