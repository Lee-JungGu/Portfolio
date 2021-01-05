/*슬릭 JS*/
$('.horizontal_slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
      
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
  });

  function animateMobileGnb(){
      $('.menu_box h2').click(function(){
            var checkDisplay = $('.menu_box ul').css('display');
            if(checkDisplay == "none"){
                $('.menu_box ul').stop().show();
                $('.menu_box h2 img').css("transform","rotate(180deg)");
            }else if(checkDisplay == "block"){
                $('.menu_box ul').stop().hide();
                $('.menu_box h2 img').css("transform","rotate(0deg)");
            }
        });
  }
  animateMobileGnb();