(function($) {
  $.fn.hasAttr = function($attr) {
    var $this = this;

    if (typeof $this.attr($attr) == 'undefined') return false;
    return $this.attr($attr).length;
  }

  Drupal.behaviors.shcDonateSlide = {
    attach: function(context, settings) {
      var winwidth = $(window).width(),
          mwidth = 700;

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
            mob = (winwidth < mwidth);

        if (!$goal.hasAttr('data-amount') || !$raised.hasAttr('data-amount')) return;

        var num = (parseInt($raised.attr('data-amount')) / parseInt($goal.attr('data-amount'))).toPrecision(6) * 100;
num = 50;
        var anim = {'height': num + '%'};
        if (mob) {
          $bar.css({'width': 0, 'left': 0, 'height': '100%'});
          anim = {'width': num + '%'};
        }
        else {
          $rw.show();
          $gw.show();
        }

        $bar.animate(anim, 1000, function() {
          var bh = parseInt($bar.outerHeight()) - 10;

          if (bh > rh) {
            $rw.animate({'height': bh + 'px'}, 500);
          }
          else {
            $raised.css({'height': 'auto'});
          }
        });
      };

      animate_chart();
      $(window).resize(function() {
        winwidth = $(window).width();
        animate_chart();
      });
    }
  }
})(jQuery);
