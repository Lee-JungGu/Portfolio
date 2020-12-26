/*프로젝트 슬릭 슬라이더*/
$('.slider_contents').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 1.665,
  centerMode: true,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
    
  responsive: [
      {
          breakpoint: 748,
          settings: {
              slidesToShow: 1,
          }
      }
  ]
});

// abilities 마우스 호버시 비디오 나타나는 효과
function showHideVideo(){
    $('.skills_box').mouseenter(function(){
        $(this).children('video').css({ top: '-60%', opacity: 1 });
        $(this).children('video').get(0).play();
    });
    $('.skills_box').mouseleave(function(){
        $(this).children('video').css({ top: '-100%', opacity: 0 });
        $(this).children('video').get(0).pause();
    });
}


showHideVideo();


































