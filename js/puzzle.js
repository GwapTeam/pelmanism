window.onload = function() {

    var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage(canvas);

    stage.enableMouseOver();

    var canWidth = 600;
    var canHeight = 600;

    var field = new createjs.Container();
    stage.addChild(field);

    for (let i = 0; i < 10; i++) {
        let rect = new createjs.Shape();
        rect.x = Math.random() * 500;
        rect.y = Math.random() * 500;
        rect.id = i;
        rect.name =  "0" + i;
        rect.graphics
            .beginFill("brack")
            .drawRect(0, 0, 60, 80);
        rect.rotation = Math.random() * 90;

        rect.addEventListener(
            "click",
            function () {
                rect.graphics.clear()
                    .setStrokeStyle(2)
                    .beginStroke("green")
                    .drawRect(0, 0, 60, 80);

                var text = new createjs.Text(i, "80px Arial", "red");
                text.x = rect.x + 10;
                text.y = rect.y;
                text.rotation = rect.rotation;

                field.addChild(text);
            }
        )

        field.addChild(rect);

    }

    createjs.Ticker.addEventListener(
        "tick",
        function () {
            stage.update();
        }
    );

}
