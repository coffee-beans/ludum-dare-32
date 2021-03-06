
var PlayScene = cc.Scene.extend({
    space:null,
    ninjaSpace:null,
    shapesToRemove:[],
    gameLayer:null,

    // init space of chipmunk
    initPhysics:function() {
        this.space = new cp.Space();
        // Gravity
        this.space.gravity = cp.v(0, -350);
        // set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);

        this.ninjaSpace = new cp.Space();
        this.ninjaSpace.gravity = cp.v(0, -350);
        var ninjaWallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_ninjaGroundHeight),// start point
            cp.v(4294967295, g_ninjaGroundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.ninjaSpace.addStaticShape(ninjaWallBottom);


        //add a ninja floor here too... wall bottom?

        // setup chipmunk CollisionHandler
        //this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
        //this.collisionCoinBegin.bind(this), null, null, null);
        //how does it know which sprites have which tags!??!?!?!?!?
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
          this.collisionRockBegin.bind(this), null, null, null);
        this.space.addCollisionHandler(SpriteTag.toast, SpriteTag.rock,
          this.collisionToastBegin.bind(this), null, null, null);
    },

    collisionCoinBegin:function (arbiter, space) {
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);

        //cc.audioEngine.playEffect(res.pickup_coin_mp3);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },

    collisionRockBegin:function (arbiter, space) {
        cc.log("==game over");

        //stop bg music
        cc.audioEngine.stopMusic();

        cc.director.pause();
        this.addChild(new GameOverLayer());
    },
    collisionToastBegin: function (arbiter, space) {
      cc.log("==box destroyed");
      var shapes = arbiter.getShapes();
      this.shapesToRemove.push(shapes[1]);
    },
    onNinjaCatch:function() {
        cc.audioEngine.stopMusic();

        cc.director.pause();
        this.addChild(new GameOverLayer());
    },
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new NinjaAnimationLayer(this.ninjaSpace), 0, TagOfLayer.NinjaAnimation);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        //add background music
        // cc.audioEngine.playMusic(res.background_ogg, true);

        this.scheduleUpdate();

    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);
        this.ninjaSpace.step(dt);

        // Simulation cpSpaceAddPostStepCallback
        for(var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
        }
        this.shapesToRemove = [];

        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
        var ninjaAnimationLayer = this.gameLayer.getChildByTag(TagOfLayer.NinjaAnimation);
        //our runner
        var runner = animationLayer.sprite;
        var ninja = ninjaAnimationLayer.sprite;
        // cc.log("runner x: " + runner.getPositionX());
        if(runner.getPositionX() >= ninja.getPositionX()) {
          cc.log("GAME OVAR YOU WIN");
          this.onNinjaCatch();
        }

        var eyeX = animationLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX,0));
    }
});
