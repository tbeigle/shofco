var SHOFCO = {
  init: function ($) {
    console.log($('#nav-toggle a').text());
    $('#nav-toggle a').click(function(e){
      e.preventDefault();
      $(this).toggleClass('nav-toggled');
      $('#navigation').toggleClass('hide-for-mobile');
    });
  }
}
jQuery(document).ready(function(){
  SHOFCO.init(jQuery);
});
