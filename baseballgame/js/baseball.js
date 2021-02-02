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
        '<input id="textbox" type="textbox" maxlength="3" onchange="judgement.drawJudgement()" placeholder="중복되지 않는 숫자 3개 입력">'
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
        + '<button id="game_info" data-num="">게임 규칙 설명</button>'
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
        let keyButtons = document.querySelectorAll('#keypad button');
        keyButtons.forEach(function(keyButton){
            keyButton.addEventListener('click', function(){
                let throwBall = document.getElementById('throw');
                let delNumber = document.getElementById('del');
                let checkData = this.dataset.num;
                // throw 버튼 클릭시 이벤트
                if(this == throwBall){
                    if(document.getElementById('textbox').value.length == 3){
                        judgement.drawJudgement();
                        document.querySelectorAll('.flip_ball').forEach(function(flipBall){
                            flipBall.setAttribute('class', '');
                        });
                    }
                }
                // del 버튼 클릭시 이벤트
                if(this == delNumber){
                    document.getElementById('textbox').value = "";
                    document.querySelectorAll('.flip_ball').forEach(function(flipBall){
                        flipBall.setAttribute('class', '');
                    });
                }
                // 3개 이상의 숫자가 입력되지 않도록 방지
                if(document.getElementById('textbox').value.length < 3){
                    document.getElementById('textbox').value += this.dataset.num;
                }
                // throw 버튼과 del 버튼을 제외한 버튼만 뒤집히는 애니메이션 적용
                if(!checkData == ""){
                    if(document.getElementsByClassName('flip_ball').length < 6){
                        this.setAttribute('class', 'flip_ball');
                        this.nextSibling.setAttribute('class', 'flip_ball');
                    }
                }
                // 게임 규칙 설명 버튼 클릭시 이벤트
                if(this == document.getElementById('game_info')){
                    alert('게임규칙 : 0~9까지 중복되지 않는 3개의 숫자를 숫자와 순서 모두 맞추는 게임 \n 1. 중복되지 않는 숫자 3개를 골라 Throw를 눌러주세요. \n 2. 숫자 3개 중 정답 숫자와 일치하고 순서까지 맞으면 Strike 정답 숫자와 일치하지만 순서가 맞지 않으면 Ball 해당되는 숫자가 없으면 Out입니다. \n 3. 3 Strike가 되면 게임 성공~!');
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
            }, 10000);
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

