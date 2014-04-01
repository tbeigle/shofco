var SHOFCO = {
  init: function ($) {

    function chalkboardPosition() {
      $('#chalkboard-text').css({
        'top': Math.floor($('#chalkboard-img-container').height() * 0.57)
      });
      $('#chalkboard-button').css({
        'top': Math.floor($('#chalkboard-img-container').height() * 0.55)
      });
    }
    chalkboardPosition();
    $(window).resize(function(e){
      chalkboardPosition();
    });

    //mobile nav
    $('#nav-toggle a').click(function(e){
      e.preventDefault();
      $(this).toggleClass('nav-toggled');
      $('#navigation').toggleClass('hide-for-mobile');
    });

    //dropdown
    $dropTabs = $("#block-menu-block-1 ul > li a").not("ul li ul a");
    $dropTabs.each(function(){
      //add arrow
      $(this).append('<i class="icon icon-down-open"></i>');
    });
    $dropTabs.click(function(e){
      e.preventDefault();
      if ($(this).hasClass('opened')) {
        $(this).next('ul').removeClass('dropped');
        $(this).removeClass('opened');
        $(this).find('.icon').removeClass('icon-up-open').addClass('icon-down-open');
      } else {
        $dropTabs.each(function(i){
          if ($(this).hasClass('opened')) {
            $(this).next('ul').removeClass('dropped');
            $(this).removeClass('opened');
            $(this).find('.icon').removeClass('icon-up-open').addClass('icon-down-open');
          }
        });
        $(this).next('ul').addClass('dropped');
        $(this).addClass('opened');
        $(this).find('.icon').removeClass('icon-down-open').addClass('icon-up-open');
      };
    });

  }
};

jQuery(document).ready(function(){
  SHOFCO.init(jQuery);
});
