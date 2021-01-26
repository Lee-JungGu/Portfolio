let gameNumber = [];

function randomGameNumber(){
    let randomArray = [];
    for(let i = 0; i < 10; i++){
        randomArray[i] = [i];
    }
    for(let j = 0; j < 3; j++){
        let randomNum = Math.floor(Math.random() * (10 - j));
        gameNumber[j] = randomArray[randomNum]
        randomArray.splice(randomNum, 1) ;
        // console.log(randomNum);
    }
    console.log(gameNumber);
}
randomGameNumber();