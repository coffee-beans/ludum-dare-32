var PlayScene = cc.Scene.extend({
  space: null,
  shapesToRemove: [],
  gameLayer: null,

  onEnter: function() {
    this._super();

    this.gameLayer = new cc.Layer();
  }
});
