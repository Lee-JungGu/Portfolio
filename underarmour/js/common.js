var includeHtmls = {

    includeHtml: function(targetTagName, htmlUrl, targetTagFunction){
        $(targetTagName).load(htmlUrl, targetTagFunction);
    },
    includeTopSnb: function(){
        this.includeHtml(".top_snb", "../include/top_snb.js");
    },
    includeHeader: function(){
        this.includeHtml(".header", "../include/header.js", function(){
            gnbEvent.animateGnbMenu();
        });
    },
    includeGnbSubMenu: function(){
        this.includeHtml(".gnb_submenu", "../include/gnb_submenu.js", function(){
            gnbEvent.animateGnbMenu();
        });
    },
    includeResponsiveGnb: function(){
        this.includeHtml(".mobile_tablet_gnb", "../include/mobile_tablet_gnb.js", function(){
            gnbEvent.animateGnbTabletMobile();
        });
    },
    includeTopButton: function(){
        this.includeHtml(".top_button", "../include/top_button.js", function(){
            topButtonEvent.showHideButton();
            topButtonEvent.clickMoveTop('.top_button_box a');
        });
    },
    includeFooter: function(){
        this.includeHtml(".footer", "../include/footer.js", function(){
            animateFooterMenu();
        });
    },
    drawInclusionHtml: function(){
        includeHtmls.includeTopSnb();
        includeHtmls.includeHeader();
        includeHtmls.includeGnbSubMenu();
        includeHtmls.includeResponsiveGnb();
        includeHtmls.includeTopButton();
        includeHtmls.includeFooter();
    }

}

var gnbEvent = {
    
   hoverEventGnb: function(commonName, subMenu){
                        var timer;
                        $(commonName).mouseenter(function (){
                            timer = setTimeout(function(){
                                $(subMenu).stop().show();
                                $(commonName).children('a').css({ textDecoration: 'underline' });
                            }, 200);
                        });
                        $(subMenu).mouseenter(function(){
                            $(subMenu).stop().show();
                            $(commonName).children('a').css({ textDecoration: 'underline' });
                        });
                        $(commonName).mouseleave(function(){
                            clearTimeout(timer);
                            $(subMenu).stop().hide();
                            $(commonName).children('a').css({ textDecoration: 'none' });
                        });
                    },
    animateGnbMenu: function(){
                        this.hoverEventGnb('.gnb_men', '.gnb_submenu .gnb_men');
                        this.hoverEventGnb('.gnb_women', '.gnb_submenu .gnb_women');
                        this.hoverEventGnb('.gnb_kids', '.gnb_submenu .gnb_kids');
                        this.hoverEventGnb('.gnb_shoes', '.gnb_submenu .gnb_shoes');
                        this.hoverEventGnb('.gnb_outlet', '.gnb_submenu .gnb_outlet');
                    },
    animateGnbTabletMobile: function(){
                                $('.gnb_button').click(function(){
                                    var checkPosition = $('.mobile_tablet_gnb').css('left').replace("px","");
                                    if(checkPosition > 0){
                                        $('.mobile_tablet_gnb').css({ left: 0 });
                                    }else{
                                        $('.mobile_tablet_gnb').css({ left: '100%' });
                                    }
                                });
                            },
    
}

var topButtonEvent = {
    
    showHideButton: function(){
                        $('html, body').scroll(function(e) {
                            var checkScorllTop = $('body').scrollTop();
                            console.log(checkScorllTop);
                            if(checkScorllTop > 200){
                                $('.top_button').stop().show();
                            }else{
                                $('.top_button').stop().hide();
                            }
                        });
                    },
    clickMoveTop: function(clickTag){
                        $(clickTag).click(function(){
                            $('body').stop().animate({ scrollTop: $(this.hash).offset().top }, 800, 'swing');
                        });
                },
    
}

function animateFooterMenu(){
    $('.footer_gnb li a').click(function(){
        var checkDisplay = $(this).next('.submenu').css('display');
        if(checkDisplay == 'none'){
            $('.arrow_down').stop().show();
            $('.arrow_up').stop().hide();
            $('.footer_gnb .submenu').stop().slideUp();
            $(this).children('.arrow_down').stop().hide();
            $(this).children('.arrow_up').stop().show();
            $(this).next('.submenu').stop().slideDown();
        }else if(checkDisplay == 'block'){
            $(this).children('.arrow_down').stop().show();
            $(this).children('.arrow_up').stop().hide();
            $(this).next('.submenu').stop().slideUp();
        }
    });
}

function preventMoveTop(){
    $('a[href="#"]').click(function(e){
        e.preventDefault();
    });
}



includeHtmls.drawInclusionHtml();
preventMoveTop();
