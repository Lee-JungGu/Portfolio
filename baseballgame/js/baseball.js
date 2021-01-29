let strikeNumber = [];

function randomStrikeNumber(){
    let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 3; i++){
        let randomNum = Math.floor(Math.random() * (10 - i));
        strikeNumber[i] = rangeNumber[randomNum];
        rangeNumber.splice(randomNum, 1);
    }
    console.log(strikeNumber);
}

function drawInputBox(){
    document.getElementById('content').innerHTML =
    '<input id="textbox" type="textbox" maxlength="3" onchange="judgement.drawJudgement()">'
    + '<div id="judgeBox"><p id="strike"></p>'
    + '<p id="ball"></p>'
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
}

function clickKeypad(){
    let keyButtons = document.querySelectorAll('#keypad div button');
    keyButtons.forEach(function(keyButton){
        keyButton.addEventListener('click', function(){
            let throwBall = document.getElementById('throw');
            let delNumber = document.getElementById('del');
            let checkData = this.dataset.num;
            if(this == throwBall){
                judgement.drawJudgement();
                document.querySelectorAll('.flip_ball').forEach(function(flipBall){
                    flipBall.setAttribute('class', '');
                });
                document.getElementById('record').innerHTML += document.getElementById('textbox').value + '<br>';
                document.getElementById('textbox').value = '';
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
    
    playAnimation: function(){
        if(this.out == 3){
            document.getElementById('threeOut').style.display = 'block';
            document.getElementById('threeOut').play();
            document.getElementById('threeOut').addEventListener('ended', function(){
                document.getElementById('threeOut').style.display = 'none';
            });
        }else if(this.out == 2){
            document.getElementById('twoOut').style.display = 'block';
            document.getElementById('twoOut').play();
            document.getElementById('twoOut').addEventListener('ended', function(){
                document.getElementById('twoOut').style.display = 'none';
            });
        }else if(this.out == 1){
            document.getElementById('oneOut').style.display = 'block';
            document.getElementById('oneOut').play();
            document.getElementById('oneOut').addEventListener('ended', function(){
                document.getElementById('oneOut').style.display = 'none';
            });
        }else if(this.out == 0 && this.ball != 0){
            document.getElementById('oneOut').style.display = 'block';
            document.getElementById('oneOut').play();
            document.getElementById('oneOut').addEventListener('ended', function(){
                document.getElementById('oneOut').style.display = 'none';
            });
        }
    },

    sucessGame: function(){
        if(judgement.strike == 3){
            // alert('게임 성공!!!!!')
            document.getElementById('succes').style.display = 'block';
            document.getElementById('succes').play();
            document.getElementById('record').innerHTML = '';
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
        this.playAnimation();
        this.sucessGame();
        
        this.strike = 0;
        this.ball = 0;
        this.out = 0;
    },
    
}

randomStrikeNumber();
drawInputBox();
clickKeypad();

