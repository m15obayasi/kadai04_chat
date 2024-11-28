$(".field, .answer, .form, .kekka-form, .kekka-button, .score-board").hide();
var correctAnswers = 0;

// 問題一覧
const flags = [
    ["./img/Afghanistan.svg", "アフガニスタン"],
    ["./img/Albania.svg", "アルバニア"],    
    ["./img/Algeria.svg","アルジェリア"],
    ["./img/Andorra.svg","アンドラ"],
    ["./img/Angola.svg","アンゴラ"],
    ["./img/Argentine.svg","アルゼンチン"],
    ["./img/Armenia.svg","アルメニア"],
    ["./img/Azerbaijan.svg","アゼルバイジャン"],
    ["./img/Iceland.svg","アイスランド"],
    ["./img/Ireland.svg","アイルランド"],
];

// ランダムな問題を取得する関数
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    const randomFlag = flags[randomIndex][0];
    const randomCountry = flags[randomIndex][1];
    return { flag: randomFlag, country: randomCountry };
}

// 問題を表示する関数
function displayQuestion(quizData) {
    $(".question-area").html(`<img src="${quizData.flag}" alt="国旗">`);
    console.log("正解 = " + quizData.country);
}

// 回答動作
$(".start-button").on("click", function () {
    let quizData = getRandomQuestion();
    displayQuestion(quizData);
    $(".seiseki").html("正解数：0");
    $(".field, .answer, .form").show();
    $(".start-button").hide();
    $(".text").keydown(function (e) {
        if (e.keyCode == 13) {
            const ansCountry = $(".text").val();
            $(".seikai p, .huseikai p").html("");
            $(".seikai, .huseikai").css({
                "background-color":"#324A6C",
                "border":"solid,#324A6C"
            });
            console.log("回答 = " + ansCountry);
            const currentQuizData = quizData;
            if (ansCountry === currentQuizData.country) {
                console.log("正解！！");
                console.log("----------------");
                correctAnswers++;
                $(".seiseki").html("正解数：" + correctAnswers);
                console.log(correctAnswers);
                const newQuizData = getRandomQuestion();
                $(".seikai p").html("〇 正解");
                $(".seikai").css({
                    "background-color":"#786031",
                    "border":"solid"
                });
                quizData = newQuizData;
                displayQuestion(newQuizData);
            } else {
                console.log("不正解");
                $(".huseikai p").html("× 不正解");
                $(".huseikai").css({
                    "background-color":"#6C7831",
                    "border":"solid"
                });
            }
        $(".text").val("");    
        };
    });
});

// 残り時間
$(".start-button").on("click", function () {
    const timerDisplay = $(".timer");
    var count = 30;
    var intervalId = setInterval(function() {
    count--;
    timerDisplay.text("残り時間：" + count + "秒");
    // 時間が0になったらタイマーを停止し、アラートを表示
    if (count === 0) {
        clearInterval(intervalId);
        $(".field, .answer, .form, .seikai, .huseikai").hide();
        $(".kekka-form, .kekka-button").show();
        $(".title").html("あなたのスコアは……　" + correctAnswers + "問　正解！");
        $(".seiseki, .timer").html("");
    }
    }, 1000);
});

$(".kekka-button").on("click", function () {
    $(".score-board").show();
});