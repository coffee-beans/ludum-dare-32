
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var spriteBG = new cc.Sprite(res.helloBG_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);

        cc.MenuItemFont.setFontSize(60);

        var menuItemPlay = new cc.MenuItemSprite(
          new cc.Sprite(res.start_n_png),
          new cc.Sprite(res.start_s_png),
          this.onPlay,
          this //not sure what this param is - look up, o ok so this is the target node... weird how this param can be one or the other thing..
        );

        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerPos);
        this.addChild(menu);

        return true;
    },

    onPlay: function() {
      cc.log("tpapped");
      cc.director.runScene(new PlayScene());
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
