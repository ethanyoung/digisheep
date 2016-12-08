/*jshint esversion: 6 */

window.onload = function () {
    var game = new Phaser.Game("100%","100%", Phaser.CANVAS, 'game-screen', { preload: preload, create: create, update: update });

    function preload() {
        game.load.spritesheet('sheep', 'app/assets/images/sheep32x32.png', 32, 32);
        game.load.audio('mie', 'app/assets/audio/sheep_voice.wav');
    }

    var sheep;
    var mie;
    var book;
    var burger;
    var feedAnim;
    var feedBurger;

    const WALK = 0;
    const SLEEP = 1;
    const EAT = 2;
    const READ = 3;
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
        sheep.animations.add('read', [6, 7]);

        sheep.inputEnabled = true;
        sheep.events.onInputDown.add(love, this);

        mie = game.add.audio('mie');

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
        burger = game.add.sprite(0, 0, 'burger').alignIn(game.world.bounds, Phaser.BOTTOM_CENTER);

        burger.inputEnabled = true;
        burger.events.onInputDown.add(feed, this);
        const heartData = [
            '............',
            '..443..443..',
            '.4444344243.',
            '444444444243',
            '444444444443',
            '.4444444443.',
            '..44444443..',
            '...444443...',
            '....4443....',
            '.....43.....',
            '............',
            '............'
            ];
        game.create.texture('heart', heartData, pixelWidth, pixelHeight, 0);

        var bookData = [
            '................',
            '....EEEEEEE.....',
            '...E111D111E....',
            '..E1222D2221E...',
            'EE12112D21121EE.',
            'D121222D222121D.',
            'D122112D211221D.',
            'D121222D222121D.',
            'D122112D211221D.',
            'D121222D222121D.',
            'D122112D211221D.',
            'D121222D222121D.',
            'D122DDDDDDD221D.',
            'D12D.......D21D.',
            'D1D.........D1D.',
            'DD...........DD.'
        ];
        game.create.texture('book', bookData, pixelWidth, pixelHeight, 0);

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
        // sheepFront = game.add.sprite(0, 0, 'sheepFront').alignIn(game.world.bounds, Phaser.BOTTOM_RIGHT);

    }

    function update () {
        if (isDaytime()) {
            if (isMealTime()) {
                eat();
            } else if (isReadTime()) {
                read();
            } else {
                walk();
            }
        }
        else {
            sleep();
        }
    }

    function isReadTime() {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 9 && hours < 10 || hours >= 2 && hours < 4;
    }

    function isDaytime () {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 8 && hours < 22;
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
            feedBurger = game.add.sprite(0, 0, 'burger').alignTo(sheep, Phaser.RIGHT_BOTTOM, -32, 30);
            feedAnim.onLoop.add(animationLooped, this);
            feedAnim.play(1, true);
        }
    }

    function love (sheep, pointer) {
        console.log('love');
        mie.play();
        const heart = game.add.sprite(0, 0, 'heart').alignTo(sheep, Phaser.TOP_RIGHT, 16, 0);
        setTimeout(function(){
            heart.destroy();
        }, 1000);
    }
    function cleanItems() {
        if (status === EAT) {
            feedBurger.destroy();
        }
    }
    function walk () {
        if (status !== WALK) {
            cleanItems();
            sheep.animations.play('walk', 1, true);
            status = WALK;
        }
    }
    function eat () {
        if (status !== EAT) {
            feedBurger = game.add.sprite(0, 0, 'burger').alignTo(sheep, Phaser.RIGHT_BOTTOM, -32, 30);
            sheep.animations.play('eat', 1, true);
            status = EAT;
        }
    }

    function read() {
        if (status !== READ) {
            book = game.add.sprite(0, 0, 'book').alignTo(sheep, Phaser.TOP_CENTRAL, 0, 0);
            sheep.animations.play('read', 1, true);
            status = READ;
        }
    }

    function animationLooped(sprite, animation) {
        if (animation.loopCount === 3) {
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
