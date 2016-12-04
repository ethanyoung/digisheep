window.onload = function () {
    var game = new Phaser.Game("100%","100%", Phaser.CANVAS, 'game-screen', { preload: preload, create: create, update: update });


    function preload() {
        game.load.spritesheet('sheep', 'assets/images/sheep32x32.png', 32, 32);
    }

    var sheep;
    var burger;
    var feedAnim;
    var feedBurger;

    const WALK = 0;
    const SLEEP = 1;
    const EAT = 2;
    var status;

    function create () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#2d2d2d';

        //  This sprite was created with the Phaser Gen Paint app
        //  also available in the Phaser Examples repo and on the Phaser site.
        var pixelWidth = 6;
        var pixelHeight = 6;

        sheep = game.add.sprite(0, 0, 'sheep');
        sheep.alignIn(game.world.bounds, Phaser.CENTER, 0, 0);
        sheep.scale.set(3);
        sheep.smoothed = false;
        sheep.anchor.set(0.5);
        sheep.animations.add('walk', [0, 1]);
        sheep.animations.add('sleep', [2, 3]);
        feedAnim = sheep.animations.add('eat', [4, 5]);
        // sheep.animations.play('sleep', 1, true);

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
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        burger = game.add.sprite(150, 400, 'burger').alignIn(game.world.bounds, Phaser.BOTTOM_CENTER);

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

    }

    function update () {
        if (isDaytime()) walk();
        if (isMealTime()) eat();
        if (isNightTime()) sleep();
    }

    function isNightTime () {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 22 || hours < 9;
    }

    function isDaytime () {
        const now = new Date();
        const hours = now.getHours();
        return !isNightTime() && !isMealTime();
    }

    function isMealTime () {
        return isLunchTime() || isDinnerTime();
    }

    function isLunchTime () {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 12 && hours < 13;
    }

    function isDinnerTime () {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 6 && hours < 7;
    }

    function feed (burger, pointer) {
        if (status !== EAT){
            feedBurger = game.add.sprite(0, 0, 'burger').alignTo(sheep, Phaser.RIGHT_BOTTOM, -32, 12);
            feedAnim.onLoop.add(animationLooped, this);
            feedAnim.play(1, true);
        }
    }

    function walk () {
        if (status !== WALK) {
            sheep.animations.play('walk', 1, true);
            status = WALK;
        }
    }
    function eat () {
        if (status !== EAT) {
            sheep.animations.play('eat', 1, true);
            status = EAT;
        }
    }

    function animationLooped(sprite, animation) {
        if (animation.loopCount === 5) {
            feedBurger.destroy();
            animation.loop = false;
            status = null;
        }
    }

    function sleep () {
        if (status !== SLEEP){
            sheep.animations.play('sleep', 1, true);
            status = SLEEP;
        }
    }
};
