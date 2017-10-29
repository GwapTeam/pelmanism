window.onload = function() {

  // 使用するcanvasを取得
    var canvas = document.getElementById("canvas");

  // ステージを関連付ける
    var stage = new createjs.Stage(canvas);

    stage.enableMouseOver();

    var circle = new createjs.Shape();
    circle.graphics.beginFill("#FFFF00");
    circle.graphics.drawCircle(0, 0, 50);

    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    var rect = new createjs.Shape();
    rect.graphics.beginFill("#FF0000");
    rect.graphics.drawRect(0, 0, 40, 40);
    stage.addChild(rect);

    var poly = new createjs.Shape();
    poly.graphics.beginFill("#0000FF");
    poly.graphics.drawPolyStar(0, 0, 40, 5, 0.5, -90);
    stage.addChild(poly);

    var strokeCircle = new createjs.Shape();
    strokeCircle.graphics.beginStroke("red");
    strokeCircle.graphics.setStrokeStyle(2);
    strokeCircle.graphics.drawCircle(0, 0, 20);
    strokeCircle.x = 100;
    strokeCircle.y = 100;
    stage.addChild(strokeCircle);

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {

        var mx = stage.mouseX;
        var my = stage.mouseY;

        poly.x = mx;
        poly.y = my;

        stage.update();
    }

/*    stage.addEventListener("click", handleRectClick);

    function handleRectClick(event) {

        var mxRect = stage.mouseX;
        var myRect = stage.mouseY;

        rect.x = mxRect;
        rect.y = myRect;
        stage.update();
    } */

   circle.addEventListener("mousedown", handleDown);
   circle.addEventListener("pressmove", handleMove);
   circle.addEventListener("pressup", handleUp);

    function handleDown(event) {
        circle.alpha = 0.5;
    }

    function handleMove(event) {
        var mxMove = stage.mouseX;
        var myMove = stage.mouseY;

        circle.x = mxMove;
        circle.y = myMove;
    }

    function handleUp(event) {
        circle.alpha = 1;
    }







}
