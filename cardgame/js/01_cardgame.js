var frontOfCardImgs = $('.frnotOfCards img');
var backOfCardImgs = $('.backOfCards img');
var cardData = {
    firstCard: {
        backOfCardNumber: "",
        cardData: "",
        frontOfCardImg: "",
        backOfCardImg: "",
    },
    secondCard: {
        backOfCardNumber : "",
        cardData: "",
        frontOfCardImg: "",
        backOfCardImg: "",
    },
}; 



function randomCards(){
    var imgName = [];
    for(var i = 0; i < frontOfCardImgs.length / 2; i++){
        imgName[i] = i + 1;
    }
    
    // imgName + imgName을 해서 같은 4개의 숫자를 한쌍으로 만듦
    imgName = imgName.concat(imgName);
    
    // 랜덤배열
    for(var i = 0; i < imgName.length; i++){
        var randomNumber = Math.floor(Math.random() * (i + 1));
        var temp = imgName[i];
        imgName[i] = imgName[randomNumber];
        imgName[randomNumber] = temp;
    }
    
    return imgName;
}

function drawCards(){
    var imgName = randomCards();
    for(var i = 0; i < frontOfCardImgs.length; i++){
        frontOfCardImgs.eq(i).attr({ 'src': 'images/img'+imgName[i]+'.png', 'data-num': imgName[i] });
    }
    /*게임 시작할때 카드 앞면 0.8초 보여줬다가 뒤집기*/
    setTimeout(function(){
        animateHideCard(frontOfCardImgs, backOfCardImgs);
    },2500);
}

// 카드 보여주는 애니메이션
function animateShowCard(frontOfCard,backOfCard){
    frontOfCard.removeClass('flippingAnimationCard');
    backOfCard.removeClass('flippingAnimationCard');
}

// 카드 가리는 애니메이션
function animateHideCard(frontOfCard,backOfCard){
    frontOfCard.addClass('flippingAnimationCard');
    backOfCard.addClass('flippingAnimationCard');
}

// 카드 클릭시 cardData 객체에 담을 카드 정보들
function informCard(object, clickImg){
    cardData[object] = {}
    cardData[object].backOfCardNumber = $(clickImg).index();
    cardData[object].cardData = frontOfCardImgs.eq(cardData[object].backOfCardNumber).attr('data-num');
    cardData[object].frontOfCardImg = frontOfCardImgs.eq(cardData[object].backOfCardNumber);
    cardData[object].backOfCardImg = $(clickImg);
}

function compareCards(){
    if(cardData.firstCard.cardData == cardData.secondCard.cardData){
        /*카드를 맞추면 맞춘 카드는 clearCard라는 클래스를 추가함으로 더이상 클릭이벤트가 발생되지 않음*/
        cardData.firstCard.backOfCardImg.addClass('clearCard');
        cardData.secondCard.backOfCardImg.addClass('clearCard');
    }else{
        // 다른 카드를 differentCards 객체에 넣어서 cardData 객체에 새로운 카드 정보가 들어가도 오류가 나지 않도록 함.
        var differentFirstCards = cardData.firstCard;
        var differentSecondCards = cardData.secondCard;
        // 두 카드가 다를경우 0.4초뒤에 카드가 뒤집어짐(0.4초 텀을 줌으로써 2번째 카드가 뒤집어질 시간을 확보)
        setTimeout(function(){
            differentFirstCards.frontOfCardImg.addClass('flippingAnimationCard');
            differentFirstCards.backOfCardImg.addClass('flippingAnimationCard');
            differentSecondCards.frontOfCardImg.addClass('flippingAnimationCard');
            differentSecondCards.backOfCardImg.addClass('flippingAnimationCard');
        }, 400);
    }
}

function matchCards(clickImg){
    // cardData객체 안에 내용을 담아놨기 때문에 클릭 이벤트가 실행될 수 있도록 비워주고 시작.
    if($.isEmptyObject(cardData.firstCard) == false && $.isEmptyObject(cardData.secondCard) == false){
        cardData = {}
    }
    if($.isEmptyObject(cardData) == true){
        informCard("firstCard", clickImg);
        animateShowCard(cardData.firstCard.frontOfCardImg, $(clickImg));
    }else if($.isEmptyObject(cardData) == false){
        informCard("secondCard", clickImg);
        animateShowCard(cardData.secondCard.frontOfCardImg, $(clickImg));
        // 같은 카드 비교 방지
        if(cardData.firstCard.backOfCardNumber != cardData.secondCard.backOfCardNumber){
            compareCards();
        }
    }
}

function succeseGame(){
    if($('.clearCard').length == frontOfCardImgs.length){
        setTimeout(function(){
            $('#cardgame').fadeOut('fast');
            $('.succese i').stop().animate({ top: '30%' }, 600);
            $('#curtain img').eq(0).stop().animate({ left: '-25%' }, 1000, 'swing');
            $('#curtain img').eq(1).stop().animate({ right: '-25%' }, 1000, 'swing');
            $('.succese img').eq(0).stop().delay(400).animate({ top: '8%' }, 1000, 'swing');
            $('.succese img').eq(1).stop().delay(600).animate({ top: '10%' }, 1000, 'swing');
        }, 700);
    }
}

function animateCurtainCall(){
    setTimeout(function(){
        $('#curtain img').eq(0).stop().animate({ left: '-50%' }, 1500, 'swing');
        $('#curtain img').eq(1).stop().animate({ right: '-50%' }, 1500, 'swing');
        $('#curtain i').stop().delay(1000).animate({ top: '-100%' }, 1500, 'swing');
    },800);
}


function init(){
    drawCards();
    animateCurtainCall();
}

function playGame(){
    $('.backOfCards img').click(function(){
        matchCards(this);
        succeseGame();
    });
}

function restartGame(){
    $('.restart_btn').click(function(){
        location.reload();
    });
}

function preventImgDrag(){
    $('img').on('dragstart',function(event){
        event.preventDefault();
    });
}

init();
playGame();
restartGame();
preventImgDrag();