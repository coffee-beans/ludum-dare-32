var g_groundHeight = 57;
var g_runnerStartX = 80;
var g_runningSpeed = 200;
var g_ninjaGroundHeight = 77;

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.NinjaAnimation = 1;
    TagOfLayer.Animation = 2;
    TagOfLayer.GameLayer = 3;
    TagOfLayer.Status = 4;
}

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 0;
    SpriteTag.coin = 1;
    SpriteTag.rock = 2;
    SpriteTag.toast = 3;
    SpriteTag.ninja = 4;
}
