init();

// 공통 HTMl과 그 HTML에 해당하는 JS 이벤트 객체
var commonHtmlJs = {
    includeHeader : includeHtml('.header', 'include/header.html', function(){
                        headerEvents.clickhamburger();
                        headerEvents.clickDayNightButton();
                        localStorages();
                    }),
    includeLeftGnb : includeHtml('.left_gnb', 'include/left_gnb.html', function(){
                        leftGnbEvents.clickLeftGnb();
                    }),
    includeTopGnb : includeHtml('.top_gnb', 'include/top_gnb.html'),
    includeTopButton : includeHtml('.top_button', 'include/top_button.html', function(){
                        topButtonEvents.clickTopButton();
                    }),
    includeContact : includeHtml('.contact', 'include/section_contact.html'),
}
// 헤더 이벤트 객체
var headerEvents = {
        clickhamburger : function (){
                            $('.header_box label').click(function(){
                                var checkInput = $("input:checkbox[id='menu_button']").prop('checked');
                                if(checkInput == false){
                                    leftGnbEvents.gnbAnimation(120, 0, 1, '50%', 1000);
                                }else if(checkInput == true){
                                    leftGnbEvents.gnbAnimation(50, '-1760px', 0, '53%', 0);
                                }
                            });
                        },
        clickDayNightButton : function (){
                                $('.daynight_btn').click(function(e){
                                    e.preventDefault();
                                    changeText($('.button_box p'), 'NIGHT', 'DAY');
                                    fillColorToScreen();
                                });
                            },
}
// 왼쪽 GNB 이벤트 객체
var leftGnbEvents = {
        clickLeftGnb : function (){
                            $('.left_gnb .gnb_menu a').click(function(){
                                $("input:checkbox[id='menu_button']").prop('checked', false);
                                leftGnbEvents.gnbAnimation(50, '-1760px', 0, '53%', 0);
                            });
                        },
        gnbAnimation : function (delaySec,leftPx,opacityNum,topPx,transitionSec){
                            $(".left_gnb").stop().animate({ left : leftPx }, 300);
                            $('.gnb_menu ul li').stop().delay(delaySec).animate({ opacity : opacityNum }, transitionSec);
                            $('.gnb_menu ul').stop().delay(delaySec).animate({ top : topPx }, 500);
                        },  
}
// Top 버튼 이벤트 객체
var topButtonEvents = {
        clickTopButton : function (){
                            $('.top_button').click(function(e){
                                e.preventDefault();
                                $('html,body').stop().animate({ scrollTop : 0 }, 500, 'swing');
                            });
                        },
}

// 구조에 html 넣는 함수
function includeHtml(tagName, includeHtmlUrl, eventContents){
    $(tagName).load(includeHtmlUrl, eventContents);
}

/*메인 텍스트 애니메이션 효과*/
function animateMainText(){
    animateText('.main_text h2', 1, 200, 0);
    animateText('.main_text h2', 2, 400, '90px');
    animateText('.main_text h2', 3, 500, '180px');
}
/*밑에서 위로 올라오면서 나타나는 텍스트 애니메이션*/
function animateText(textTag, lineNumber, delaySec, topPx){
    $(textTag).eq(lineNumber - 1).stop().delay(delaySec).animate({
        opacity: 1,
        top: topPx
    }, 500);
}

// 로컬 스토리지 관련 함수
function localStorages(){
    /*컬러버튼 클릭시 로컬스토리지에 현재 컬러 CSS, 버튼 text 저장*/
    var saveData = {
        nowColor : "",
        nowText : "",
    };
    $('.daynight_btn').click(function(){
        saveData.nowColor = $('#colorMode').attr('href');
        saveData.nowText = $('.button_box p').html();
        localStorage.setItem("sheet", JSON.stringify(saveData));
    });

    /*로딩시 컬러 CSS 링크에 로컬스토리지 CSS값, 버튼 text값 저장*/
    var getHref = JSON.parse(localStorage.getItem("sheet"));
    var checkHref = $('#colorMode').attr('href');
    if(checkHref == null){
        $('.button_box p').html('DAY');
        $('#colorMode').attr('css/day_mode.css')
    }else{
        $('.button_box p').html(getHref["nowText"]);
        $('#colorMode').attr('href', getHref["nowColor"]);
    }
}

/*화면에 색을 바꿔주는 메소드*/
function fillColorToScreen(){
    var checkImgColor = $('.night_img').css('display');
    if(checkImgColor == "none"){
        $('#colorMode').attr('href', 'css/night_mode.css')
    }else if(checkImgColor == "block"){
        $('#colorMode').attr('href', 'css/day_mode.css')
    }
}

// 데이나이트모드에 따라 텍스트를 바꿔주는 효과
function changeText(tagName, contents1, contents2){
    var checkImgColor = $('.night_img').css('display');
    if(checkImgColor == 'none'){
        $(tagName).html(contents1);
    }else if(checkImgColor == 'block'){
        $(tagName).html(contents2);
    }
}

// 로딩시 실행되는 이벤트 내용
function init(){
    animateMainText();
    // commonHtmlJs 객체는 load함수를 사용했기 때문에 따로 호출하지 않아도 로딩시 자동으로 실행
}














