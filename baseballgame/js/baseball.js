let strikeNumber = [];

function randomStrikeNumber(){
    let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 3; i++){
        let randomNum = Math.floor(Math.random() * (10 - i));
        strikeNumber[i] = rangeNumber[randomNum];
        rangeNumber.splice(randomNum, 1);
    }
}

function drawInputBox(){
    document.getElementById('content').innerHTML =
    '<input id="textbox" type="textbox" onchange="judgement.drawJudgement()">'
    + '<button>확인</button>'
    + '<p id="strike"></p>'
    + '<p id="ball"></p>'
    + '<p id="out"></p>';
}

let judgement = {
    
    strike: 0,
    ball: 0,
    out: 0,
    
    compareNumber: function(numericOrder, indexNum1, indexNum2, indexNum3){
        if(numericOrder == strikeNumber[indexNum1]){
            this.strike++;
        }else if(numericOrder == strikeNumber[indexNum2]){
            this.ball++;
        }else if(numericOrder == strikeNumber[indexNum3]){
            this.ball++;
        }else{
            this.out++;
        }
    },

    drawNumber: function(){
        document.getElementById('strike').innerHTML = this.strike + ' Strike';
        document.getElementById('ball').innerHTML = this.ball + ' Ball';
        document.getElementById('out').innerHTML = this.out + ' Out';
    },

    sucessGame: function(){
        if(judgement.strike == 3){
            alert('게임 성공!!!!!')
        }
    },

    drawJudgement: function(){
        let findInput = document.getElementById('textbox').value;
        let firstNumber = Math.floor(findInput / 100);
        let secondNumber = Math.floor((findInput % 100) / 10);
        let thirdNumber = (findInput % 100) % 10;

        this.compareNumber(firstNumber, 0, 1, 2);
        this.compareNumber(secondNumber, 1, 0, 2);
        this.compareNumber(thirdNumber, 2, 0, 1);
        this.drawNumber();
        this.sucessGame();
        
        this.strike = 0;
        this.ball = 0;
        this.out = 0;
    },

}

drawInputBox();
randomStrikeNumber();