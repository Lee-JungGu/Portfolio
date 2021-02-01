let strikeNumber = [];

let prepareGame = {
    randomStrikeNumber: function(){
        let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for(let i = 0; i < 3; i++){
            let randomNum = Math.floor(Math.random() * (10 - i));
            strikeNumber[i] = rangeNumber[randomNum];
            rangeNumber.splice(randomNum, 1);
        }
    },
    hideStartImage: function(){
        setTimeout(function(){
            document.getElementById('start_img').style.display = 'none';
        }, 1600)
    },    
    drawInputBox: function(){
        document.getElementById('content').innerHTML =
        '<input id="textbox" type="textbox" maxlength="3" onchange="judgement.drawJudgement()">'
        + '<div id="judgeBox"><p id="strike"></p>'
        + '<p id="ball">&nbsp;Ready</p>'
        + '<p id="out"></p>'
        + '<p id="record"></p></div>'
        + '<div id="keypad"><div><button data-num="1">1</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="2">2</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="3">3</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="4">4</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="5">5</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="6">6</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="7">7</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="8">8</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button data-num="9">9</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button id="del" data-num="">Del</button></div>'
        + '<div><button data-num="0">0</button><img src="images/baseball.png" alt="야구공이미지"></div>'
        + '<div><button id="throw" data-num="">Throw</button></div>'
        + '</div>';
    },
}

let judgement = {
    
    strike: 0,
    ball: 0,
    out: 0,
    numberOfAttempts: 0,
    
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
        this.numberOfAttempts++;

        document.getElementById('strike').innerHTML = this.strike + ' Strike';
        document.getElementById('ball').innerHTML = this.ball + ' Ball';
        document.getElementById('out').innerHTML = this.out + ' Out';
        document.getElementById('record').innerHTML += this.numberOfAttempts + '.&nbsp;' + document.getElementById('textbox').value + '<br>';
        document.getElementById('textbox').value = '';

    },

    clickKeypad: function(){
        let keyButtons = document.querySelectorAll('#keypad div button');
        keyButtons.forEach(function(keyButton){
            keyButton.addEventListener('click', function(){
                let throwBall = document.getElementById('throw');
                let delNumber = document.getElementById('del');
                let checkData = this.dataset.num;
                if(this == throwBall){
                    if(document.getElementById('textbox').value.length == 3){
                        judgement.drawJudgement();
                        document.querySelectorAll('.flip_ball').forEach(function(flipBall){
                            flipBall.setAttribute('class', '');
                        });
                    }
                }else if(this == delNumber){
                    document.getElementById('textbox').value = "";
                    document.querySelectorAll('.flip_ball').forEach(function(flipBall){
                        flipBall.setAttribute('class', '');
                    });
                }
                if(document.getElementById('textbox').value.length < 3){
                    document.getElementById('textbox').value += this.dataset.num;
                }
                if(!checkData == ""){
                    if(document.getElementsByClassName('flip_ball').length < 6){
                        this.setAttribute('class', 'flip_ball');
                        this.nextSibling.setAttribute('class', 'flip_ball');
                    }
                }
            });
        });
    },

    sucessGame: function(){
        if(judgement.strike == 3){
            document.querySelector('#baseball_display img').style.display = 'none';
            document.getElementById('succes').style.display = 'block';
            document.getElementById('succes').play();
            document.getElementById('record').innerHTML = '횟수:' + this.numberOfAttempts;
            this.numberOfAttempts = 0;
            setTimeout(function(){
                prepareGame.randomStrikeNumber();
                document.getElementById('strike').innerHTML = "";
                document.getElementById('ball').innerHTML = "&nbsp;Ready";
                document.getElementById('out').innerHTML = "";
                document.getElementById('record').innerHTML = "";
                document.getElementById('succes').style.display = 'none';
                document.querySelector('#baseball_display img').style.display = 'block';
            }, 9400);
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

prepareGame.randomStrikeNumber();
prepareGame.hideStartImage();
prepareGame.drawInputBox();
judgement.clickKeypad();

