window.onload = function() {


    var canvas = document.getElementById("canvas");

    var stage = new createjs.Stage(canvas);

    stage.enableMouseOver();

    var canWidth = 600;
    var canHeight = 600;
    var rectList = [];
    var rect;
    var j = 0;
    var rx;
    var ry;
    var rr;


    var field = new createjs.Container();
    stage.addChild(field);
    for (var i = 0; i < 10; i++){
        rect = new createjs.Shape();
        rect.x = Math.random() * 500;
        rect.y = Math.random() * 500;
        rect.id = i;
        rect.name =  "0" + i;
        rect.graphics
                .beginFill("brack")
                .drawRect(0, 0, 60, 80);
            rect.rotation = Math.random() * 90;
        field.addChild(rect);

        rectList[i] = rect;
    }


//    alert(rectList[1].id);
//    alert(rectList[1].name);

    function textAdd() {
        var text = new createjs.Text(j, "80px Arial", "red");
        text.x = rx;
        text.y = ry;
        text.rotation = rr;


        field.addChild(text);
    }


    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        rectList[0].addEventListener("click", handleClick0);
        function handleClick0(event) {
            rx = rectList[0].x + 10;
            ry = rectList[0].y;
            rr = rectList[0].rotation;
            j = 0;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[1].addEventListener("click", handleClick1);
        function handleClick1(event) {
            rx = rectList[1].x + 10;
            ry = rectList[1].y;
            rr = rectList[1].rotation;
            j = 1;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();

        }
        rectList[2].addEventListener("click", handleClick2);
        function handleClick2(event) {
            rx = rectList[2].x + 10;
            ry = rectList[2].y;
            rr = rectList[2].rotation;
            j = 2;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[3].addEventListener("click", handleClick3);
        function handleClick3(event) {
            rx = rectList[3].x + 10;
            ry = rectList[3].y;
            rr = rectList[3].rotation;
            j = 3;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[4].addEventListener("click", handleClick4);
        function handleClick4(event) {
            rx = rectList[4].x + 10;
            ry = rectList[4].y;
            rr = rectList[4].rotation;
            j = 4;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[5].addEventListener("click", handleClick5);
        function handleClick5(event) {
            rx = rectList[5].x + 10;
            ry = rectList[5].y;
            rr = rectList[5].rotation;
            j = 5;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[6].addEventListener("click", handleClick6);
        function handleClick6(event) {
            rx = rectList[6].x + 10;
            ry = rectList[6].y;
            rr = rectList[6].rotation;
            j = 6;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[7].addEventListener("click", handleClick7);
        function handleClick7(event) {
            rx = rectList[7].x + 10;
            ry = rectList[7].y;
            rr = rectList[7].rotation;
            j = 7;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[8].addEventListener("click", handleClick8);
        function handleClick8(event) {
            rx = rectList[8].x + 10;
            ry = rectList[8].y;
            rr = rectList[8].rotation;
            j = 8;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        rectList[9].addEventListener("click", handleClick9);
        function handleClick9(event) {
            rx = rectList[9].x + 10;
            ry = rectList[9].y;
            rr = rectList[9].rotation;
            j = 9;
            rectList[j].graphics.clear()
                                .setStrokeStyle(2)
                                .beginStroke("green")
                                .drawRect(0, 0, 60, 80);
            textAdd();
        }
        stage.update();
    }
}
