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
    animateResponsiveGnb: function (){
        $('.filter_btn').on("click", function(){
            var checkLeft = $('.category_filter').css('left').replace('px', "");
            if(checkLeft < 0){
                $('.category_filter').css('left', '0');
                $('#wrap').append(
                    '<div class="background_shadow"></div>'
                );
            }
        });
        $('#wrap').on("click", function(e){
            if(!$('.category_filter').has(e.target).length){
                var checkLeft = $('.category_filter').css('left').replace('px', "");
                if(checkLeft == 0){
                    $('.category_filter').css('left', '-100%');
                    $('.background_shadow').remove();
                }
            }
        });
    },
    focusMenuTitle: function (selector){
        $(selector).on("click", function(){
            $(selector).css("font-weight", "400");
            $(this).css("font-weight", "600");
        });
    },
    focusMenuTitles: function (){
        this.focusMenuTitle('.category_filter .filter_menu a');
        this.focusMenuTitle('.category_filter .responsive_sort_menu a');
    },
    addColorFilter: function (){
        $('.color_circles .circle').on("click", function(){
            var checkColor = $(this).attr('class').replace('circle ', '');
                checkOverlap = $('.filter_filter .content_box p').text().indexOf(checkColor);
            if(checkOverlap < 0){
            $('.filter_filter .content_box').append(
                '<button class="hide_button">' + checkColor + ' X</button>'
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
                '<button class="hide_button">' + checkText + ' X </button>'
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
            $('.category_filter .filter_menu a').css("font-weight", "400");
            $('.category_filter .filter_menu ul li').eq(0).children('a').css("font-weight", "600");
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

filterEvents.animateResponsiveGnb();
filterEvents.focusMenuTitles();
filterEvents.addColorFilter();
filterEvents.addSizeFilter();
filterEvents.removeFilter();
filterEvents.removeAllFilter();
filterEvents.animateFilterContent();