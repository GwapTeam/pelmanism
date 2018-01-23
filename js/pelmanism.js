// 指定範囲の乱数取得関数
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
    // 結果表示用Element
    var resultElement = document.getElementById("result");

    var stage = new createjs.Stage(canvas);
    // キャンバスサイズ(ここでのサイズ変更はできません)
    var canWidth = 600;
    var canHeight = 600;

    // 開いているrect
    var selectRect = undefined;
    // 結果表示中フラグ
    var waitingFlag = false;

    // 現在の正解数
    var limit = 0;
    var mark = ["♧", "♢"];
    // カードの枚数(デバッグのため 13 -> 3 に変更しています。)
    var cardNum = 0;

    var starText;
    var buttonEasy;
    var buttonNormal;
    var buttonHard;
    var buttonBattle;
    var buttonAgain;
    var endText;

    var battleFlag = false;
    var playerChangeFlag = false;
    var player = 0;
    var player1Score;
    var player2Score;
    var bgText;

    var endResult;
    var endScore1;
    var endScore2;

    var missCount= 0 ;
    var missCountLimit = 3;
    start();


    function start() {

        battleFlag = false;
        playerChangeFlag = false;
        player = 0;
        player1Score = 0;
        player2Score = 0;


        stage.removeChild(endText);
        stage.removeChild(buttonAgain);
        stage.removeChild(endResult);
        stage.removeChild(endScore1);
        stage.removeChild(endScore2);

        startText = new createjs.Text("神経衰弱ゲーム", "80px Arial", "black");
        startText.x = canWidth / 2 ;            //テキスト位置　x
        startText.y = canHeight / 2 - 100;      //テキスト位置　y
        startText.textAlign = "center";         //水平方向位置
        startText.textBaseline = "middle";      //垂直方向位置
        stage.addChild(startText);

        buttonEasy = new createjs.Container();
        buttonEasy.x = canWidth / 2 - 205;                         //ボタン位置　x
        buttonEasy.y = canHeight / 2 + 50;                         //ボタン位置　y
        stage.addChild(buttonEasy);

        buttonNormal = new createjs.Container();
        buttonNormal.x = canWidth / 2 - 65;
        buttonNormal.y = canHeight / 2 + 50;
        stage.addChild(buttonNormal);

        buttonHard = new createjs.Container();
        buttonHard.x = canWidth / 2 + 115;                         //ボタン位置　x
        buttonHard.y = canHeight / 2 + 50;                         //ボタン位置　y
        stage.addChild(buttonHard);

        buttonBattle = new createjs.Container();
        buttonBattle.x = canWidth / 2 - 55;
        buttonBattle.y = canHeight / 2 + 150;
        stage.addChild(buttonBattle);

        var buttonEasyRect = new createjs.Shape();
        buttonEasyRect.graphics                     //ボタングラフィック
                  .setStrokeStyle(2)
                  .beginStroke("black")
                  .beginFill("white")
                  .drawRect(0, 0, 90, 50);
        buttonEasy.addChild(buttonEasyRect);

        var buttonNormalRect = new createjs.Shape();
        buttonNormalRect.graphics                     //ボタングラフィック
                  .setStrokeStyle(2)
                  .beginStroke("black")
                  .beginFill("white")
                  .drawRect(0, 0, 130, 50);
        buttonNormal.addChild(buttonNormalRect);

        var buttonHardRect = new createjs.Shape();
        buttonHardRect.graphics                     //ボタングラフィック
                  .setStrokeStyle(2)
                  .beginStroke("black")
                  .beginFill("white")
                  .drawRect(0, 0, 90, 50);
        buttonHard.addChild(buttonHardRect);

        var buttonBattleRect = new createjs.Shape();
        buttonBattleRect.graphics
                  .setStrokeStyle(2)
                  .beginStroke("black")
                  .beginFill("white")
                  .drawRect(0, 0, 105, 50);
        buttonBattle.addChild(buttonBattleRect);

        var buttonEasyLabel = new createjs.Text("Easy", "40px Arial", "black");
        buttonEasy.addChild(buttonEasyLabel);

        var buttonNormalLabel = new createjs.Text("Normal", "40px Arial", "black");
        buttonNormal.addChild(buttonNormalLabel);

        var buttonHardLabel = new createjs.Text("Hard", "40px Arial", "black");
        buttonHard.addChild(buttonHardLabel);

        var buttonBattleLabel = new createjs.Text("Battle", "40px Arial", "black");
        buttonBattle.addChild(buttonBattleLabel);

        buttonAgain = new createjs.Container();
        buttonAgain.x = canWidth / 2 - 50;
        buttonAgain.y = canHeight / 2 - 50;


        var buttonAgainRect = new createjs.Shape();
        buttonAgainRect.graphics                     //ボタングラフィック
                  .setStrokeStyle(2)
                  .beginStroke("black")
                  .beginFill("white")
                  .drawRect(0, 0, 115, 50);
        buttonAgain.addChild(buttonAgainRect);

        var buttonAgainLabel = new createjs.Text("Again!", "40px Arial", "black");
        buttonAgain.addChild(buttonAgainLabel);

        buttonEasy.addEventListener(
            "click",
            function() {
                cardNum = 1;
                main();
            }
        )

        buttonNormal.addEventListener(
            "click",
            function() {
                cardNum = 3;
                main();
            }
        )

        buttonHard.addEventListener(
            "click",
            function() {
                cardNum = 13;
                main();
            }
        )

        buttonBattle.addEventListener(
            "click",
            function() {
                cardNum = 5;
                battleFlag = true;
                player = 1;
                bgText = new createjs.Text("player" + player, "80px Arial", "black");
                stage.addChild(bgText);
                main();
            }
        )
    }

    //処理の終了
    function end(text) {
        stage.removeAllChildren();
        limit = 0;
        missCount = 0;
        battleFlag = false;
        resultElement.innerText = "";
        endText = new createjs.Text(text, "80px Arial", "red");
        endText.x = canWidth / 2;
        endText.y = canHeight / 2 - 100;
        endText.textAlign = "center";
        endText.textBaseline = "middle";
        stage.addChild(endText);
        stage.addChild(buttonAgain);

        buttonAgain.addEventListener(
            "click",
            function() {
                start();
            }
        )
    }

    function endBattle(score1, score2) {
        stage.removeAllChildren();
        limit = 0;
        missCount = 0;
        battleFlag = false;
        resultElement.innerText = "";
        endScore1 = new createjs.Text("Player1:" + score1, "40px Arial", "black");
        endScore1.x = canWidth / 2;
        endScore1.y = canHeight / 2 - 200;
        endScore1.textAlign = "center";
        endScore1.textBaseline = "middle";
        stage.addChild(endScore1);
        endScore2 = new createjs.Text("Player2:" + score2, "40px Arial", "black");
        endScore2.x = canWidth / 2;
        endScore2.y = canHeight / 2 - 150;
        endScore2.textAlign = "center";
        endScore2.textBaseline = "middle";
        stage.addChild(endScore2);
        var battleResult = "";
        if(score1 > score2) {
            battleResult = "Player1の勝ち！";
        } else if (score1 == score2) {
            battleResult = "引き分け！";
        } else {
            battleResult = "Player2の勝ち！";
        }
        endResult = new createjs.Text(battleResult, "40px Arial", "black");
        endResult.x = canWidth / 2;
        endResult.y = canHeight / 2 - 100;
        endResult.textAlign = "center";
        endResult.textBaseline = "middle";
        stage.addChild(endResult);
        stage.addChild(buttonAgain);

        buttonAgain.addEventListener(
            "click",
            function() {
                start();
            }
        )
    }


    function main() {

        stage.removeChild(startText);
        stage.removeChild(buttonEasy);
        stage.removeChild(buttonNormal);
        stage.removeChild(buttonHard);
        stage.removeChild(buttonBattle);

        // 2種類のトランプを使用
        for (let j = 0; j < 2; j++) {
            // 13の数字を用意
            for (let i = 1; i <= cardNum; i++) {

                let rect = new createjs.Shape();

                let text = new createjs.Text(mark[j] + i, "28px Arial", "blue");

                // カードを開く処理
                rect.open = function() {
                    // 元のグラフィックを削除し外枠を緑に変更
                    rect.graphics.clear()
                        .setStrokeStyle(2)
                        .beginStroke("black")
                        .drawRect(0, 0, 60, 80);

                    // テキストを表示(フィールドに追加)
                    stage.addChild(text);
                }

                // カードを閉じる処理
                rect.close = function() {
                      // 元のグラフィックを削除し黒く塗りつぶす
                      rect.graphics.clear()
                          .setStrokeStyle(2)
                          .beginStroke("black")
                          .beginFill("red")
                          .drawRect(0, 0, 60, 80);
                      // テキストを非表示(フィールドから削除)
                      stage.removeChild(text);
                }

                rect.match = function() {
                      stage.removeChild(text);
                      stage.removeChild(rect);
                }
                // カードの場所
                let x = getRandom(50, 500);
                let y = getRandom(50, 500);
                let rotation = getRandom(0, 90);

                // カードの場所を設定
                rect.x = x;
                rect.y = y;
                // カード番号を登録
                rect.number = i;
                rect.rotation = rotation;
                // 初期状態として閉じる
                rect.close();
                stage.addChild(rect);

                // 数字の場所を設定
                text.x = x;
                text.y = y;
                text.rotation = rotation;

                // カードクリック時の処理を登録
                rect.addEventListener(
                    "click",
                    function () {
                        // 判定処理表示中　または　同じカードをクリックした時は処理をしない
                        if (waitingFlag || selectRect == rect) {
                           return
                        }
                        rect.open();

                        // 選択中のカードがあるか判定
                        if (selectRect == undefined) {
                            // 選択中のカードとして登録
                            selectRect = rect;
                        } else {
                            // 正解か不正解かのboolean変数
                            var isMatch;

                            // カード番号が等しいか確認
                            if (selectRect.number == rect.number) {
                                isMatch = true;
                                resultElement.innerText = "正解！";
                                switch(player) {
                                    case 1:
                                        player1Score ++;
                                        break;
                                    case 2:
                                        player2Score ++;
                                        break;
                                }

                            } else {
                                isMatch = false;
                                resultElement.innerText = "間違い！";
                                missCount += 1;
                                playerChangeFlag = true;
                            }

                            // 全てのクリック判定を無効化
                            waitingFlag = true;

                            setTimeout(
                                function () {
                                    if (isMatch) {
                                        // マッチ処理を走らす(両方とも削除)
                                        selectRect.match();
                                        rect.match();
                                        limit++;
                                    } else {
                                        // close処理を走らす(両方ともカードを閉じる)
                                        selectRect.close();
                                        rect.close();
                                    }
                                    if(playerChangeFlag == true) {
                                        missCount = 0;
                                            switch (player) {
                                                case 1:
                                                    player = 2;
                                                    break;
                                                case 2:
                                                    player = 1;
                                                    break;
                                            }
                                    }
                                    if (battleFlag == true) {
                                        bgText.text = "player" + player;
                                        resultElement.innerText = "player1:" + player1Score + "\n" + "player2:" + player2Score;
                                    }else {
                                        resultElement.innerText = "正解数：" + limit;
                                    }

                                    // 選択中のカードをなくす
                                    selectRect = undefined;
                                    // クリック判定を有効化
                                    waitingFlag = false;

                                    playerChangeFlag = false;
                                    if (limit >= cardNum){
                                        if (battleFlag == true) {
                                            endBattle(player1Score, player2Score);
                                        }else {
                                            end("おめでとう！");
                                        }
                                    } else if(missCount >= missCountLimit) {
                                        end("残念！");
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


}
