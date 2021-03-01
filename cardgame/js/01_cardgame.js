const frontOfCardImgs = $('.frontOfCards img');
const backOfCardImgs = $('.backOfCards img');

const dealer = {
    randomCards: function (){
        let imgName = [];
        for(let i = 0; i < frontOfCardImgs.length / 2; i++){
            imgName[i] = i + 1;
        }
        
        // imgName + imgName을 해서 같은 4개의 숫자를 한쌍으로 만듦
        imgName = imgName.concat(imgName);
        
        // 랜덤배열
        for(let i = 0; i < imgName.length; i++){
            let randomNumber = Math.floor(Math.random() * (i + 1));
            let temp = imgName[i];
            imgName[i] = imgName[randomNumber];
            imgName[randomNumber] = temp;
        }
        
        return imgName;
    },
    drawCards: function (){
        let imgName = this.randomCards();
        for(let i = 0; i < frontOfCardImgs.length; i++){
            frontOfCardImgs.eq(i).attr({ 'src': 'images/img'+imgName[i]+'.png', 'data-num': imgName[i] });
        }
        /*게임 시작할때 카드 앞면 0.8초 보여줬다가 뒤집기*/
        setTimeout(function(){
            animation.animateHideCard(frontOfCardImgs, backOfCardImgs);
        },2500);
    },
    compareCards: function (){
        if(player.cardData.firstCard.cardData == player.cardData.secondCard.cardData){
            /*카드를 맞추면 맞춘 카드는 clearCard라는 클래스를 추가함으로 더이상 클릭이벤트가 발생되지 않음*/
            player.cardData.firstCard.backOfCardImg.addClass('clearCard');
            player.cardData.secondCard.backOfCardImg.addClass('clearCard');
        }else{
            // 다른 카드를 differentCards 객체에 넣어서 cardData 객체에 새로운 카드 정보가 들어가도 오류가 나지 않도록 함.
            let differentFirstCards = player.cardData.firstCard;
            let differentSecondCards = player.cardData.secondCard;
            // 두 카드가 다를경우 0.4초뒤에 카드가 뒤집어짐(0.4초 텀을 줌으로써 2번째 카드가 뒤집어질 시간을 확보)
            setTimeout(function(){
                differentFirstCards.frontOfCardImg.addClass('flippingAnimationCard');
                differentFirstCards.backOfCardImg.addClass('flippingAnimationCard');
                differentSecondCards.frontOfCardImg.addClass('flippingAnimationCard');
                differentSecondCards.backOfCardImg.addClass('flippingAnimationCard');
            }, 400);
        }
    },
    matchCards: function (clickImg){
        // cardData객체 안에 내용을 담아놨기 때문에 클릭 이벤트가 실행될 수 있도록 비워주고 시작.
        if($.isEmptyObject(player.cardData.firstCard) == false && $.isEmptyObject(player.cardData.secondCard) == false){
            player.cardData = {}
        }
        if($.isEmptyObject(player.cardData) == true){
            player.informCard("firstCard", clickImg);
            animation.animateShowCard(player.cardData.firstCard.frontOfCardImg, $(clickImg));
        }else if($.isEmptyObject(player.cardData) == false){
            player.informCard("secondCard", clickImg);
            animation.animateShowCard(player.cardData.secondCard.frontOfCardImg, $(clickImg));
            // 같은 카드 비교 방지
            if(player.cardData.firstCard.backOfCardNumber != player.cardData.secondCard.backOfCardNumber){
                this.compareCards();
            }
        }
    },
    succeseGame: function (){
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
    },
    
}

const player = {
    cardData: {
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
        }
    },
    informCard: function (object, clickImg){
        player.cardData[object] = {}
        player.cardData[object].backOfCardNumber = $(clickImg).index();
        player.cardData[object].cardData = frontOfCardImgs.eq(player.cardData[object].backOfCardNumber).attr('data-num');
        player.cardData[object].frontOfCardImg = frontOfCardImgs.eq(player.cardData[object].backOfCardNumber);
        player.cardData[object].backOfCardImg = $(clickImg);
    },
    playGame: function (){
        $('.backOfCards img').click(function(){
            dealer.matchCards(this);
            dealer.succeseGame();
        });
    },
    restartGame: function (){
        $('.restart_btn').click(function(){
            $('#cardgame').show('fast');
            $('.succese i').stop().animate({ top: '-50%' }, 600);
            $('#curtain img').eq(0).stop().animate({ left: '0' }, 1000, 'swing');
            $('#curtain img').eq(1).stop().animate({ right: '0' }, 1000, 'swing');
            $('.succese img').eq(0).stop().delay(400).animate({ top: '-80%' }, 1000, 'swing');
            $('.succese img').eq(1).stop().delay(600).animate({ top: '-80%' }, 1000, 'swing');
            $('.clearCard').removeClass('clearCard');
            init();
            animation.animateShowCard(frontOfCardImgs, backOfCardImgs);
        });
    }
}

const animation = {
    animateShowCard: function (frontOfCard,backOfCard){
        frontOfCard.removeClass('flippingAnimationCard');
        backOfCard.removeClass('flippingAnimationCard');
    },
    animateHideCard: function (frontOfCard,backOfCard){
        frontOfCard.addClass('flippingAnimationCard');
        backOfCard.addClass('flippingAnimationCard');
    },
    animateCurtainCall: function (){
        setTimeout(function(){
            $('#curtain img').eq(0).stop().animate({ left: '-50%' }, 1500, 'swing');
            $('#curtain img').eq(1).stop().animate({ right: '-50%' }, 1500, 'swing');
            $('#curtain i').stop().delay(1000).animate({ top: '-100%' }, 1500, 'swing');
        },800);
    }
}

function preventImgDrag(){
    $('img').on('dragstart',function(event){
        event.preventDefault();
    });
}

function init(){
    dealer.drawCards();
    animation.animateCurtainCall();
    preventImgDrag();
}

init();
player.playGame();
player.restartGame();