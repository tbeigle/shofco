var SHOFCO = (function ($) {
  function init() {

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

  //homepage feature 
  function chalkboardPosition() {
    $('#chalkboard-text').css({
      'top': Math.floor($('#chalkboard-img-container').height() * 0.57)
    });
    $('#chalkboard-button').css({
      'top': Math.floor($('#chalkboard-img-container').height() * 0.55)
    });
  }

  return {
    init: function() {
      init();
    },
    chalkboardPosition: function() {
      chalkboardPosition();
    }
  };

})(jQuery);

jQuery(document).ready(function(){
  SHOFCO.init();
});

jQuery(window).load(function(){
  SHOFCO.chalkboardPosition();
});


jQuery(window).load(function(){
  //resize homepage columns to be the same height
  if (jQuery('body.front').length > 0) {
    $homepageColumns = jQuery('#block-views-homepage-features-block .views-row');
    adjustColumns($homepageColumns, 768);
    jQuery(window).resize(function(){
      adjustColumns($homepageColumns, 768);
    });
  };
});

// function for resizing columns
// minWidth = minimum window width for resizing to occur
function adjustColumns($columns, minWidth){
    $w = jQuery(window).width();
    if($w >= minWidth) {
      colHeights = new Array();
      $columns.each(function(){
        col = jQuery(this);
        col.removeAttr('style');
        colHeight = col.height();
        colHeights.push(colHeight);
      });
      tallest = Math.max.apply(Math, colHeights);
      $columns.each(function(){
        jQuery(this).height(tallest);
      });
    } else if ($w < minWidth) {
      $columns.each(function(){
        jQuery(this).removeAttr('style');
      });
    }
}
