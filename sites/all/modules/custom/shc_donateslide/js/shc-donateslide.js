(function($) {
  $.fn.hasAttr = function($attr) {
    var $this = this;

    if (typeof $this.attr($attr) == 'undefined') return false;
    return $this.attr($attr).length;
  }

  Drupal.behaviors.shcDonateSlide = {
    attach: function(context, settings) {
      var winwidth = $(window).width(),
          mwidth = 700,
          mob = (winwidth < mwidth);
      
      var animate_chart = function() {
        if (!$('.shc-donateslide-chart .bar').length) return;
        if (!$('.shc-donateslide-chart .shc-donateslide-goal .amount').length) return;
        if (!$('.shc-donateslide-chart .shc-donateslide-raised .amount').length) return;

        var $chart = $('.shc-donateslide-chart'),
            $gw = $chart.find('.shc-donateslide-goal'),
            $goal = $gw.find('.amount'),
            $rw = $chart.find('.shc-donateslide-raised'),
            $raised = $rw.children('.amount'),
            $bar = $chart.find('.bar'),
            rh = $rw.outerHeight(),
            rw = $rw.outerWidth();
        
        $.get(settings.basePath + 'shofco-donate-chart', function(data) {
          var amounts = JSON.parse(data);
          
          if (typeof amounts != 'undefined') {
            if (typeof amounts.raw.goal != 'undefined') {
              $goal.attr('data-amount', amounts.raw.goal);
              $goal.text(amounts.goal);
            }
            
            if (typeof amounts.raw.total_raised != 'undefined') {
              $raised.attr('data-amount', amounts.raw.total_raised);
              $raised.text(amounts.total_raised);
            }
          }
        });

        if (!$goal.hasAttr('data-amount') || !$raised.hasAttr('data-amount')) return;

        var per = (parseInt($raised.attr('data-amount')) / parseInt($goal.attr('data-amount'))).toPrecision(6);
        
        if (mob) {
          var num = per * 100;
          $bar.css({'width': 0, 'height': '100%'});
          anim = {'height': '100%', 'width': num + '%'};
          $rw.css({'bottom': 'auto', 'top': 'auto'})
        }
        else {
          var num = per * $chart.outerHeight();
          var anim = {'width': '100%', 'height': num + 'px'};
          $rw.css({'left': 'auto'});
          $bar.css({'width': '100%', 'height': 0});
        }
        
        $bar.animate(anim, 1000, function() {
          if (mob) {
            var rwwidth = parseInt($rw.outerWidth()),
                barwidth = parseInt($bar.outerWidth());
            
            if ((barwidth - 10) < rwwidth) {
              $rw.animate({'left': (barwidth + 10) + 'px'}, 500);
            }
            else {
              $rw.css({'left': 'auto'});
            }
          }
          else {
            var bh = parseInt($bar.outerHeight()),
                bh_co = bh - 10,
                rb;
            
            if (bh_co < rh) {
              rb = bh + 10;
            }
            else {
              rb = bh_co - rh;
            }
            
            $rw.animate({'bottom': rb + 'px'}, 500);
          }
        });
      };

      animate_chart();
      
      var rtime = new Date(1, 1, 2000, 12,00,00);
      var timeout = false;
      var delta = 200;
      
      $(window).resize(function() {
        rtime = new Date();
        if (timeout === false) {
          winwidth = $(window).width();
          mob = (winwidth < mwidth);
          animate_chart();
          
          timeout = true;
          setTimeout(resizeend, delta);
        }
      });
      
      function resizeend() {
        if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
        } else {
          timeout = false;
        }               
      }
    }
  }
})(jQuery);
