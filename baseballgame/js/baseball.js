let strikeNumber = [];

function randomStrikeNumber(){
    let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 3; i++){
        let randomNum = Math.floor(Math.random() * (10 - i));
        strikeNumber[i] = rangeNumber[randomNum]
        rangeNumber.splice(randomNum, 1) ;
    }
}

function drawInputBox(){
    document.getElementById('content').innerHTML =
    '<input id="textbox" type="textbox" onchange="drawJudgment()">'
    + '<button>확인</button>'
    + '<p id="result1"></p>'
    + '<p id="result2"></p>'
    + '<p id="result3"></p>';
}

function judgeNumber(){
    let findInput = document.getElementById('textbox').value;
    let firstNumber = Math.floor(findInput / 100);
    let secondNumber = Math.floor((findInput % 100) / 10);
    let thirdNumber = (findInput % 100) % 10;
    let strike = 0;
    let ball = 0;
    let out = 0;

    function compareNumber(numericOrder, indexNum1, indexNum2, indexNum3){
        if(numericOrder == strikeNumber[indexNum1]){
            strike++;
        }else if(numericOrder == strikeNumber[indexNum2]){
            ball++;
        }else if(numericOrder == strikeNumber[indexNum3]){
            ball++;
        }else{
            out++;
        }
    }

    function drawNumber(){
        document.getElementById('result1').innerHTML = strike + ' Strike';
        document.getElementById('result2').innerHTML = ball + ' Ball';
        document.getElementById('result3').innerHTML = out + ' Out';
    }
    
    compareNumber(firstNumber, 0, 1, 2);
    compareNumber(secondNumber, 1, 0, 2);
    compareNumber(thirdNumber, 2, 0, 1);

    drawNumber();
    
    return strike;
}

function drawJudgment(){
    judgeNumber();
    sucessGame();
}

function sucessGame(){
    var strike = judgeNumber();
    if(strike == 3){
        alert('게임 성공!!!!!')
    }
}

randomStrikeNumber();
drawInputBox();