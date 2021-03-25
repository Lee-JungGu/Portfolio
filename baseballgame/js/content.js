export const startImgText = `<img src="images/baseball_main.jpg" alt="게임시작이미지">`;

export const baseballDisplay =
  //
  `<img src="images/baseball_main.jpg" alt="전광판이미지">
   <video id="succes">
     <source src="images/3strike.mp4" type="video/mp4">
   </video>`;

export const content =
  //
  `<input id="textbox" type="textbox" maxlength="3" onchange="judgement.drawJudgement()" placeholder="중복되지 않는 숫자 3개 입력">
   <div id="judgeBox">
     <p id="strike"></p>
     <p id="ball">&nbsp;Ready</p>
     <p id="out"></p>
     <p id="record"></p>
   </div>
   <ul id="keypad">
     <li>
       <button data-num="1">1</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="2">2</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="3">3</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="4">4</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="5">5</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="6">6</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="7">7</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="8">8</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button data-num="9">9</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button id="del" data-num="">Del</button>
     </li>
     <li>
       <button data-num="0">0</button>
       <img src="images/baseball.png" alt="야구공이미지">
     </li>
     <li>
       <button id="throw" data-num="">Throw</button>
     </li>
     <button id="game_info" data-num="">게임 규칙 설명</button>
    </ul>`;
