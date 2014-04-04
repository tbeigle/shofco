var SHOFCO = {};

(function ($) {
  SHOFCO = {

    navigation : function() {
      //mobile nav
      $('#nav-toggle a').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('nav-toggled');
        $('#navigation').toggleClass('hide-for-mobile');
      });
      //dropdown tabs
      var $dropTabs = $("#block-menu-block-1 .content ul > li a").not("ul li ul a");
      //add the arrow
      $dropTabs.each(function() {
        $(this).append('<i class="icon icon-down-open"></i>');
      });
      //function for closing a tab
      function dropTabClose($tab) {
        $tab.next('ul').removeClass('dropped');
        $tab.removeClass('opened');
        $tab.find('.icon').removeClass('icon-up-open').addClass('icon-down-open');
      }
      //tab togglin' event and logic
      $dropTabs.click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('opened')) {
          dropTabClose($(this));
        } else {
          $dropTabs.each(function(i){
            if ($(this).hasClass('opened')) {
              dropTabClose($(this));
            }
          });
          $(this).next('ul').addClass('dropped');
          $(this).addClass('opened');
          $(this).find('.icon').removeClass('icon-down-open').addClass('icon-up-open');
        }
      });
    },

    chalkboardPosition : function() {
      if (jQuery('#chalkboard-container').length > 0) {
        $('#chalkboard-text').css({
          'top': Math.floor($('#chalkboard-img-container').height() * 0.57)
        });
        $('#chalkboard-button').css({
          'top': Math.floor($('#chalkboard-img-container').height() * 0.55)
        });
      }
    },

    // minWidth = minimum window width for resizing to occur
    adjustColumns : function($columns, minWidth) {
      var $w = jQuery(window).width();
      if($w >= minWidth) {
        var colHeights = new Array();
        $columns.each(function() {
          var col, colHeight;
          col = jQuery(this);
          col.removeAttr('style');
          colHeight = col.height();
          colHeights.push(colHeight);
        });
        var tallest = Math.max.apply(Math, colHeights);
        $columns.each(function() {
          jQuery(this).height(tallest);
        });
      } else if ($w < minWidth) {
        $columns.each(function() {
          jQuery(this).removeAttr('style');
        });
      }
    },

    moveLabelToValue : function($input) {
      var $label = $('label[for="'+ $input.attr('id') +'"]');
      if ($label.length > 0 ) {
        $input.val($label.text());
        $label.addClass("hide");
      }
    },

    inputTextToggle : function($input) {
      var origText = $input.val();
      $input.focus(function(){
        if ($(this).val() === origText) {
          $(this).val('');
        }
      });
      $input.blur(function(){
        if ($(this).val() === '') {
          $(this).val(origText);
        }
      });
    },

    footerForm : function() {
      var $container = $('#mc_embed_signup'),
          $form = $('#mc_embed_signup form').hide(), 
          $formTab = $('<div/>', { id: 'mc-form-tab' }).prependTo($container).prepend('<p>Sign Up</p><i class="icon icon-down-open"></i>');

      $formTab.click(function() {
        $icon = $(this).find('i.icon');
        if ($icon.hasClass('icon-down-open')) {
          $icon.removeClass('icon-down-open').addClass('icon-cancel');
        } else {
          $icon.removeClass('icon-cancel').addClass('icon-down-open');
        }
        $form.slideToggle(400,function(){
          SHOFCO.scrollToBottom();
          $('#mce-FNAME').focus();
        });
      });

    },

    scrollToBottom : function() {
      $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
    }

  }

  $(document).ready(function() { 
    SHOFCO.navigation(); 
    SHOFCO.footerForm();
  });

  $(window).load(function() {

    if ($('body.front').length > 0) {

      //reposition homepage banner
      SHOFCO.chalkboardPosition();
      
      //level out homepage columns
      var $homepageColumns = $('#block-views-homepage-features-block .views-row'),
          minWinWidth = 768;
      SHOFCO.adjustColumns($homepageColumns, minWinWidth);

      $(window).resize(function() {
        //reposition homepage banner on resize
        SHOFCO.chalkboardPosition();
        //level out homepage columns on resize
        SHOFCO.adjustColumns($homepageColumns, minWinWidth);
      });

    };

  });

})(jQuery);
