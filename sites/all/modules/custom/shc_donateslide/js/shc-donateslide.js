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
            rw = $rw.outerWidth(),
            gh = $gw.outerHeight(),
            gw = $gw.outerWidth(),
            move_goal = false,
            goal_reached = false;
        
        $chart.removeClass('goal-moved');
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
        
        if (per >= 1) {
          per = 1;
          goal_reached = true;
        }
        
        if (mob) {
          var num = per * 100,
              gdiff = $chart.outerWidth() - gw,
              move_goal = $bar.outerWidth() > gdiff;
          
          anim = {'height': '100%', 'width': num + '%'},
          $bar.css({'width': 0, 'height': '100%'});
          $rw.css({'bottom': 'auto', 'top': 'auto'});
        }
        else {
          var num = per * $chart.outerHeight(),
              anim = {'width': '100%', 'height': num + 'px'},
              gdiff = $chart.outerHeight() - gh,
              move_goal = $bar.outerWidth() > gdiff;
          
          $rw.css({'left': 'auto'});
          $bar.css({'width': '100%', 'height': 0});
        }
        
        if (move_goal) {
          $gw.animate({'opacity': 0}, 500).prependTo('.shc-donateslide-raised');
          rh = $rw.outerHeight();
          rw = $rw.outerWidth();
        }
        
        $bar.animate(anim, 1000, function() {
          if (mob) {
            var rwwidth = parseInt($rw.outerWidth()),
                barwidth = parseInt($bar.outerWidth());
            
            if ((barwidth - 10) < rwwidth && !move_goal) {
              $rw.animate({'left': (barwidth + 10) + 'px'}, 500);
            }
            else {
              $rw.css({'left': 'auto', 'width': barwidth + 'px'});
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
          
          if (move_goal) {
            $gw.animate({'opacity': 1}, 500);
            $chart.addClass('goal-moved');
          }
          
          if (goal_reached) {
            $bar.css({'border': 'none'});
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
          timeout = true;
          winwidth = $(window).width();
          mob = (winwidth < mwidth);
          animate_chart();
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
