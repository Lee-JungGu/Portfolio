var sortMenuEvents = {
    animateSortMenu: function (){
        $('.sort_menu>a').on("click", function(){
            var checkDisplay = $('.sort_menu .submenu').css("display");
            if(checkDisplay == "none"){
                $(this).next().stop().show();
            }else if(checkDisplay == "block"){
                $(this).next().stop().hide();
            }
        });
    },
    changeMenuTitle: function (){
        $('.sort_menu .submenu a').on("click", function(){
            var checkText = $(this).text();
            $('.sort_menu>a>p').html(checkText);
            $('.sort_menu .submenu').stop().hide();
        });
    }
}

var filterEvents = {
    addColorFilter: function (){
        $('.color_circles .circle').on("click", function(){
            var checkClass = $(this).attr('class');
                checkColor = checkClass.replace('circle ', '');
                checkOverlap = $('.filter_filter .content_box p').text().indexOf(checkColor);
            if(checkOverlap < 0){
            $('.filter_filter .content_box').append(
                '<p class="hide_button">' + checkColor + ' X</p>'
                );
            }
        });
    },
    addSizeFilter: function (){
        $('.size_box').on("click", function(){
            var checkText = $(this).text();
                checkOverlap = $('.filter_filter .content_box p').text().indexOf(checkText);
            if(checkOverlap < 0){
            $('.filter_filter .content_box').append(
                '<p class="hide_button">' + checkText + ' X</p>'
                );
            }
        });
    },
    removeFilter: function (){
        $(document).on("click", ".hide_button", function(){
            $(this).remove();
        });
    },
    removeAllFilter: function (){
        $('.filter_title p').on("click", function(){
            $('.filter_filter .content_box').html("");
            $('.price_checkboxes input').prop('checked', false);
            $('.type_checkboxes input').prop('checked', false);
        });
    },
    animateFilterContent: function (){
        $('.filter_title').on("click", function(){
            var checkDisplay = $(this).next().css('display');
            if(checkDisplay == "block"){
                $(this).next('div').stop().hide();
                $(this).children('img').css("transform", "rotate(180deg)");
            }else if(checkDisplay == "none"){
                $(this).next('div').stop().show();
                $(this).children('img').css("transform", "rotate(0deg)");
            }
        });
    }
}

sortMenuEvents.animateSortMenu();
sortMenuEvents.changeMenuTitle();

filterEvents.addColorFilter();
filterEvents.addSizeFilter();
filterEvents.removeFilter();
filterEvents.removeAllFilter();
filterEvents.animateFilterContent();