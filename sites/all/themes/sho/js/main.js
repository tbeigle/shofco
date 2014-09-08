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

    sidebarNav : function() {

      var $sidebarNav        = $('#block-menu-block-4, #block-menu-block-5'),
          $sidebarNavContent = $('#block-menu-block-4 .content, #block-menu-block-5 .content').hide(),
          $sidebarNavTab     = $('<div/>',{id: "sidebar-nav-tab"}).prependTo($sidebarNav);

      $sidebarNavTab.prepend('<p>In This Section</p><i class="icon icon-down-open"></i>');

      //fake active-trail class for videos
      if ($('#block-menu-block-5').length > 0 && $('body.node-type-page').length > 0) {
        $('.menu-mlid-459').addClass('active-trail');
      }

      $sidebarNavTab.click(function() {

        SHOFCO.tabIcon($(this).find('i.icon'));

        $sidebarNavContent.slideToggle(400, function() {
          $sidebarNav.toggleClass('opened');
        });

      });

    },

    tabIcon : function($t) {
      if ($t.hasClass('icon-down-open')) {
        $t.removeClass('icon-down-open').addClass('icon-cancel');
      } else {
        $t.removeClass('icon-cancel').addClass('icon-down-open');
      }
    },

    bannerSlideshow : function() {
      var $slides = $('#block-views-banner-slideshow-block .views-row');

      if ($slides.length > 1) {

        var $bsContainer         = $('#block-views-banner-slideshow-block .view-content'),
            $bsControls          = $('<div/>',  {id: 'banner-slideshow-controls'}).appendTo($bsContainer.parent()),
            $bsPager             = $('<span/>', {id: 'banner-slideshow-pager'}).appendTo($bsControls);

        $bsControls.after($('<img/>', {src: '/sites/all/themes/sho/img/bannerSlideshow.gif'}));

        $bsContainer.cycle({
          pager: $bsPager,
          timeout: 6000,
          speed: 750,
          pagerAnchorBuilder: function(i,e) {
            if (i === $bsContainer.find('.views-row').length - 1) {
              return '<a id="last-pager" href="#"></a>';
            } else {
              return '<a href="#"></a>';
            }
          }
        }); 

        $bsPager.append('<span id="banner-slideshow-resume"><i class="icon icon-play-1"></i></span><span id="banner-slideshow-pause"><i class="icon icon-pause"></i></span>');

        $bsPager.find('a').click(function(){
          $bsContainer.cycle('pause');
          $('#banner-slideshow-pause').hide();
          $('#banner-slideshow-resume').show();
        });

        $('#banner-slideshow-pause').click(function(){
          $bsContainer.cycle('pause');
          $('#banner-slideshow-pause').hide();
          $('#banner-slideshow-resume').show();
        });

        $('#banner-slideshow-resume').click(function(){
          $bsContainer.cycle('resume');
          $bsContainer.cycle('next');
          $('#banner-slideshow-pause').show();
          $('#banner-slideshow-resume').hide();
        });

      }

    },

    initiativesMap : function() {
      if ($('body.page-initiatives').length > 0) {

        var $initiatives = $('.page-initiatives #initiatives-image');

        if ($initiatives.length > 0) {
           $initiatives.attr('usemap', '#m_initiatives').rwdImageMaps();
        }

      }
    },

    chalkboardPosition : function() {
      if ($('#chalkboard-container').length > 0) {
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
      var w = $(window).width();
      if(w >= minWidth) {
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
      } else if (w < minWidth) {
        $columns.each(function() {
          jQuery(this).removeAttr('style');
        });
      }
    },

    footerForm : function() {

      var $container = $('#footer #mc_embed_signup'),
          $form = $('#footer #mc_embed_signup form').hide(), 
          $formTab = $('<div/>', { id: 'mc-form-tab' }).prependTo($container).prepend('<p>Sign Up</p><i class="icon icon-down-open"></i>');

      $formTab.click(function() {
        var $icon = $(this).find('i.icon');
        
        SHOFCO.tabIcon($icon);

        $form.slideToggle(400,function(){
          if ($icon.hasClass('icon-cancel')) {
            SHOFCO.scrollToBottom();
            if ($('html').hasClass('no-touch')) {
              $('#mce-FNAME').focus();
            }
          }
        });

      });

    },

    scrollToBottom : function() {
      $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
    },

    donateLinks : function() {

      var parser = document.createElement('a'),
          donateNames = ['www.stayclassy.org',
                         'stayclassy.org',
                         'support.shininghopeforcommunities.org'];

      $("a").each(function() {
        var $a = $(this);

        parser.href = $a.attr('href');

        for (var i = 0, l = donateNames.length; i < l; i ++) {
          if (donateNames[i] === parser.hostname) {
            $a.attr('target', '_blank');
          }
        }

      });

    },
          
    partnerPosition : function() {
      if ($('.view-id-partners').length > 0) {
        var partnerHeight = $('.view-id-partners .views-field-field-image img').height();
        $('.view-id-partners .partner-content').height(partnerHeight);
        $('.view-id-partners .partner-content').css('top',partnerHeight + 10);
      }
    },

    partners : function() {
      if ($('.view-id-partners').length > 0) {

        $('.partner-content').append('<div class="partner-close"><i class="icon icon-cancel"></i></div>');

        $('.partner-close').click(function(){
          $(this).closest('.views-row').removeClass('partner-show');
        });

        $('.partner-logo').click(function(e){
          e.preventDefault();
          $('.view-id-partners .views-row').removeClass('partner-show');
          $(this).closest('.views-row').addClass('partner-show');
        });
        
      }
    },

    homePageArrow : function() {
      if ($('.home-caption-row').length > 0) {
        $('.home-caption-row .views-field-field-link-1 a').append('<i class="icon icon-angle-circled-right"></i>');
      }
    }

  }

  $(document).ready(function() { 
    SHOFCO.navigation(); 
    SHOFCO.sidebarNav(); 
    SHOFCO.footerForm();
    SHOFCO.initiativesMap();
    SHOFCO.bannerSlideshow();
    SHOFCO.donateLinks();
    SHOFCO.homePageArrow();
  });

  $(window).resize(function() {
    SHOFCO.partnerPosition(); 
  });

  $(window).load(function() {

    SHOFCO.partnerPosition(); 
    SHOFCO.partners();

    //HOMEPAGE STUFF
    if ($('body.front').length > 0) {

      //reposition homepage banner
      SHOFCO.chalkboardPosition();

      //level out homepage columns
      var $homepageColumns = $('#block-views-homepage-features-block .views-row'),
          minWinWidth      = 768;

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
