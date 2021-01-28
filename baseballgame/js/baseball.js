let strikeNumber = [];

function randomStrikeNumber(){
    let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 3; i++){
        let randomNum = Math.floor(Math.random() * (10 - i));
        strikeNumber[i] = rangeNumber[randomNum]
        rangeNumber.splice(randomNum, 1) ;
    }
    console.log(strikeNumber);
}

function drawInputBox(){
    document.getElementById('content').innerHTML =
    '<input id="textbox" type="textbox" onchange="drawJudgment()">'
    + '<button>확인</button>'
    + '<p id="result1"></p>'
    + '<p id="result2"></p>'
    + '<p id="result3"></p>';
}

function compareNumber(){
    let findInput = document.getElementById('textbox').value;
    let firstNumber = Math.floor(findInput / 100);
    let secondNumber = Math.floor((findInput % 100) / 10);
    let thirdNumber = (findInput % 100) % 10;
    let strike = 0;
    let ball = 0;
    let out = 0;

    if(firstNumber == strikeNumber[0]){
        strike++;
    }else if(firstNumber == strikeNumber[1]){
        ball++;
    }else if(firstNumber == strikeNumber[2]){
        ball++;
    }else{
        out++;
    }

    if(secondNumber == strikeNumber[1]){
        strike++;
    }else if(secondNumber == strikeNumber[0]){
        ball++;
    }else if(secondNumber == strikeNumber[2]){
        ball++;
    }else{
        out++;
    }

    if(thirdNumber == strikeNumber[2]){
        strike++;
    }else if(thirdNumber == strikeNumber[0]){
        ball++;
    }else if(thirdNumber == strikeNumber[1]){
        ball++;
    }else{
        out++;
    }
    
    document.getElementById('result1').innerHTML = strike + ' Strike';
    document.getElementById('result2').innerHTML = ball + ' Ball';
    document.getElementById('result3').innerHTML = out + ' Out';

    return strike;
}

function drawJudgment(){
    compareNumber();
    sucessGame();
}

function sucessGame(){
    var strike = compareNumber();
    if(strike == 3){
        alert('게임 성공!!!!!')
    }
}

randomStrikeNumber();
drawInputBox();