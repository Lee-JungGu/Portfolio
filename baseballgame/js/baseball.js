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

function compareNumber(numericOrder, resultNum, indexNum1, indexNum2, indexNum3){
    if(numericOrder == strikeNumber[indexNum1]){
        document.getElementById(resultNum).innerHTML = 'Strike';
    }else if(numericOrder == strikeNumber[indexNum2]){
        document.getElementById(resultNum).innerHTML = 'Ball';
    }else if(numericOrder == strikeNumber[indexNum3]){
        document.getElementById(resultNum).innerHTML = 'Ball';
    }else{
        document.getElementById(resultNum).innerHTML = 'Out';
    }
}

function drawJudgment(){
    let findInput = document.getElementById('textbox').value;
    let firstNumber = Math.floor(findInput / 100);
    let secondNumber = Math.floor((findInput % 100) / 10);
    let thirdNumber = (findInput % 100) % 10;
    compareNumber(firstNumber, 'result1', 0, 1, 2);
    compareNumber(secondNumber, 'result2', 1, 0, 2);
    compareNumber(thirdNumber, 'result3', 2, 0, 1);
    sucessGame();
}

function sucessGame(){
    let checkJudgment1 = document.getElementById('result1');
    let checkJudgment2 = document.getElementById('result2');
    let checkJudgment3 = document.getElementById('result3');
    if(checkJudgment1.innerHTML == 'Strike' && checkJudgment2.innerHTML == 'Strike' && checkJudgment3.innerHTML == 'Strike'){
        alert('게임 성공!!!!!')
    }
}
randomStrikeNumber();
drawInputBox();