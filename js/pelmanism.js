

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
    const cardNum = 3;

    var field = new createjs.Container();
    stage.addChild(field);

    //処理の終了
    function end() {
        resultElement.innerText = "";
        var endText = new createjs.Text("おめでとう！", "80px Arial", "red");
        endText.x = canWidth / 2;
        endText.y = canHeight / 2;
        endText.textAlign = "center";
        endText.textBaseline = "middle";
        field.addChild(endText);


    }

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
                field.addChild(text);
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
                  field.removeChild(text);
            }

            rect.match = function() {
                  field.removeChild(text);
                  field.removeChild(rect);
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
            field.addChild(rect);

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
                        } else {
                            isMatch = false;
                            resultElement.innerText = "間違い！";
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
                                resultElement.innerText = "正解数：" + limit;
                                // 選択中のカードをなくす
                                selectRect = undefined;
                                // クリック判定を無効化
                                waitingFlag = false;
                                if (limit >= cardNum){
                                    end();
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
