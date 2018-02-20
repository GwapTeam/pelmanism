function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

window.onload = function() {
    createjs.Ticker.addEventListener(
        "tick",
        function () {
            stage.update();
        }
    );

    var canvas = document.getElementById("canvas");
    var resultElement = document.getElementById("result");

    var stage = new createjs.Stage(canvas);
    var canWidth = 600;
    var canHeight = 600;

    var selectRect = undefined;
    var waitingFlag = false;

    var limit = 0;
    var mark = ["♧", "♢"];
    var cardNum = 3;


    function end(text) {
        resultElement.innerText = "";
        endText = new createjs.Text(text, "80px Arial", "red");
        endText.x = canWidth / 2;
        endText.y = canHeight / 2 - 100;
        endText.textAlign = "center";
        endText.textBaseline = "middle";
        stage.addChild(endText);
    }



    for (let j = 0; j < 2; j++) {
        for (let i = 1; i <= cardNum; i++) {

            let rect = new createjs.Shape();

            let text = new createjs.Text(mark[j] + i, "28px Arial", "blue");

            rect.open = function() {
                rect.graphics.clear()
                    .setStrokeStyle(2)
                    .beginStroke("black")
                    .beginFill("green")
                    .drawRect(0, 0, 60, 80);
                stage.addChild(rect);
                stage.addChild(text);
            }

            rect.close = function() {
                  rect.graphics.clear()
                      .setStrokeStyle(2)
                      .beginStroke("black")
                      .beginFill("red")
                      .drawRect(0, 0, 60, 80);
                  stage.removeChild(text);
            }

            rect.match = function() {
                  stage.removeChild(text);
                  stage.removeChild(rect);
            }

            let x = getRandom(50, 500);
            let y = getRandom(50, 500);
            let rotation = getRandom(0, 90);

            rect.x = x;
            rect.y = y;

            rect.number = i;
            rect.rotation = rotation;

            rect.close();
            stage.addChild(rect);

            text.x = x;
            text.y = y;
            text.rotation = rotation;

            rect.addEventListener(
                "click",
                function () {
                    if (waitingFlag || selectRect == rect) {
                       return
                    }
                    rect.open();

                    if (selectRect == undefined) {
                        selectRect = rect;
                    } else {
                        var isMatch;
                        if (selectRect.number == rect.number) {
                            isMatch = true;
                            resultElement.innerText = "正解！";
                        } else {
                            isMatch = false;
                            resultElement.innerText = "間違い！";
                        }

                        waitingFlag = true;

                        setTimeout(
                            function () {
                                if (isMatch) {
                                    selectRect.match();
                                    rect.match();
                                    limit++;
                                } else {
                                    selectRect.close();
                                    rect.close();
                                }
                                resultElement.innerText = "正解数：" + limit;
                                selectRect = undefined;
                                waitingFlag = false;
                                if (limit >= cardNum){
                                    end("おめでとう");
                                }
                            },
                            2000
                        )

                    }
                }
            )
        }
    }
}
