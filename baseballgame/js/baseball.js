import { startImgText, baseballDisplay, content } from "./content.js";

const LENGTH_OF_STRIKE_NUMBER = 3;
const strikeNumber = [];

const prepareGame = {
  randomStrikeNumber: function () {
    let rangeNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < LENGTH_OF_STRIKE_NUMBER; i++) {
      let randomNum = Math.floor(Math.random() * (10 - i));
      strikeNumber[i] = rangeNumber[randomNum];
      rangeNumber.splice(randomNum, 1);
    }
  },
  hideStartImage: function () {
    setTimeout(function () {
      document.querySelector("#start_img").style.display = "none";
    }, 1600);
  },
  drawUserInterface: function () {
    document.querySelector("#start_img").innerHTML = startImgText;
    document.querySelector("#baseball_display").innerHTML = baseballDisplay;
    document.querySelector("#content").innerHTML = content;
  },
};

const judgement = {
  strike: 0,
  ball: 0,
  out: 0,
  numberOfAttempts: 0,

  compareNumber: function (numericOrder, indexNum1, indexNum2, indexNum3) {
    if (numericOrder === strikeNumber[indexNum1]) return this.strike++;
    if (numericOrder === strikeNumber[indexNum2]) return this.ball++;
    if (numericOrder === strikeNumber[indexNum3]) return this.ball++;
    return this.out++;
  },
  compareNumbers: function () {
    // 입력된 3자리 값을 백의 자리, 십의 자리, 일의 자리를 각각 추출
    let checkValue = document.querySelector("#textbox").value;
    let firstNumber = Math.floor(checkValue / 100);
    let secondNumber = Math.floor((checkValue % 100) / 10);
    let thirdNumber = (checkValue % 100) % 10;

    this.compareNumber(firstNumber, 0, 1, 2);
    this.compareNumber(secondNumber, 1, 0, 2);
    this.compareNumber(thirdNumber, 2, 0, 1);
  },

  drawNumber: function () {
    this.numberOfAttempts++;

    document.querySelector("#strike").innerHTML = `${this.strike} Strike`;
    document.querySelector("#ball").innerHTML = `${this.ball} Ball`;
    document.querySelector("#out").innerHTML = `${this.out} Out`;
    document.querySelector("#record").innerHTML +=
      //
      `${this.numberOfAttempts} ${document.querySelector("#textbox").value}` +
      "<br>";

    document.querySelector("#textbox").value = "";
  },

  clickKeypad: function () {
    const keyButtons = document.querySelectorAll("#keypad button");
    keyButtons.forEach(function (keyButton) {
      keyButton.addEventListener("click", function () {
        const throwBall = document.querySelector("#throw");
        const delNumber = document.querySelector("#del");
        const enteredNumber = document.querySelector("#textbox");
        const checkData = this.dataset.num;

        // throw 버튼 클릭시 이벤트
        if (this === throwBall) {
          // 숫자가 3개 모두 입력되었을 때만 throw 버튼 작동
          if (enteredNumber.value.length === LENGTH_OF_STRIKE_NUMBER) {
            judgement.drawJudgement();
            document
              .querySelectorAll(".flip_ball")
              .forEach(function (flipBall) {
                flipBall.classList.remove("flip_ball");
              });
          }
        }

        // del 버튼 클릭시 이벤트
        if (this === delNumber) {
          document.querySelector("#textbox").value = "";
          document.querySelectorAll(".flip_ball").forEach(function (flipBall) {
            flipBall.classList.remove("flip_ball");
          });
        }

        // 3개 이상의 숫자가 입력되지 않도록 방지
        if (enteredNumber.value.length < LENGTH_OF_STRIKE_NUMBER) {
          enteredNumber.value += checkData;
        }

        // throw 버튼과 del 버튼을 제외한 버튼만 뒤집히는 애니메이션 적용
        if (checkData != "") {
          document.getElementsByClassName("flip_ball").length <
            LENGTH_OF_STRIKE_NUMBER * 2 && this.classList.add("flip_ball");
          this.nextElementSibling.classList.add("flip_ball");
        }

        // 게임 규칙 설명 버튼 클릭시 이벤트
        if (this === document.querySelector("#game_info")) {
          alert(
            "게임규칙 : 0~9까지 중복되지 않는 3개의 숫자를 숫자와 순서 모두 맞추는 게임 \n 1. 중복되지 않는 숫자 3개를 골라 Throw를 눌러주세요. \n 2. 숫자 3개 중 정답 숫자와 일치하고 순서까지 맞으면 Strike 정답 숫자와 일치하지만 순서가 맞지 않으면 Ball 해당되는 숫자가 없으면 Out입니다. \n 3. 3 Strike가 되면 게임 성공~!"
          );
        }
      });
    });
  },

  sucessGame: function () {
    if (judgement.strike === LENGTH_OF_STRIKE_NUMBER) {
      // 게임 성공시 동영상 재생 및 시도 총 횟수 표시
      document.querySelector("#baseball_display img").style.display = "none";
      document.querySelector("#succes").style.display = "block";
      document.querySelector("#succes").play();
      document.querySelector("#record").innerHTML =
        "횟수:" + this.numberOfAttempts;
      this.numberOfAttempts = 0;
      // 성공 동영상이 끝나면 게임 초기화
      setTimeout(function () {
        prepareGame.randomStrikeNumber();
        document.querySelector("#strike").innerHTML = "";
        document.querySelector("#ball").innerHTML = "&nbsp;Ready";
        document.querySelector("#out").innerHTML = "";
        document.querySelector("#record").innerHTML = "";
        document.querySelector("#succes").style.display = "none";
        document.querySelector("#baseball_display img").style.display = "block";
      }, 10000);
    }
  },

  drawJudgement: function () {
    this.compareNumbers();
    this.drawNumber();
    this.sucessGame();

    // 값 초기화
    this.strike = 0;
    this.ball = 0;
    this.out = 0;
  },
};

prepareGame.randomStrikeNumber();
prepareGame.hideStartImage();
prepareGame.drawUserInterface();
judgement.clickKeypad();
