var Toast = cc.Class.extend({
  space: null,
  sprite: null,
  body: null,
  shape: null,
  ctor: function( space, runnerWidth, runnerHeight ){
    var aniFrames = [],
        i, str, frame,
        animation, action,
        radius, body, contentSize;

    this.space = space;
    
    // init toast animation
    //for ( i = 0; i < 8; i++) {
    //  str = "toast" + i + ".png";
    //  frame = cc.spriteFrameCache.getSpriteFrame(str);
    //  animFrames.push(frame);
    //}

    //animation = new cc.Animation(animFrames, 0.2);
    //action = new cc.RepeatForever(new cc.Animate(animation));

    this.sprite = new cc.PhysicsSprite(res.toast_png);
    contentSize = this.sprite.getContentSize();

    this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    this.body.p = cc.p( g_runnerStartX + (runnerWidth/2), g_groundHeight + (runnerHeight / 2)); 
    this.body.applyImpulse(cp.v(400, 100), cp.v( 400, 0));

    this.space.addBody(this.body);
    
    this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
    this.shape.setCollisionType(SpriteTag.toast);
    this.shape.setSensor(true); //Sensors only call collision callbacks, and never generate real collisions
            
    this.space.addShape(this.shape);

    this.sprite.setBody(this.body);
    
  },
  removeFromParent:function () {
    this.space.removeShape(this.shape);
    this.shape = null;
    this.body.removeBody(this.body);
    this.body = null;
    this.sprite.removeFromParent();
    this.sprite = null;
  }

});

