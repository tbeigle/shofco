<?php
/**
 * @file shc-donateslide.tpl.php
 *
 * Template for the shc_donateslide theme callback
 *
 * Variables include:
 *   $img: A complete image tag
 *
 *   $button: An associate array of the following ...
 *     'header': Header text to display above the button
 *     'text': Text to display on the button
 *     'position': A value indicating where on the slide the button should appear
 *
 *   $chart: An associative array of the following ...
 *     'enabled': Boolean value; if false, do not add the chart
 *     'background': An associative array of hexidecimal color codes for 'top' and 'bottom'
 */
?>
<?php if ($img): ?>
  <div<?php print drupal_attributes($wrapper_attributes); ?>>
    <?php print $img; ?>
    
    <?php if ($chart['enabled'] && $chart['goal'] && $chart['total_raised']): ?>
      <div class="shc-donateslide-chart">
        <div class="shc-donateslide-goal">
          <div class="amount" data-amount="<?php print $chart['raw']['goal']; ?>">
            <?php print $chart['goal']; ?>
          </div> <!-- /.amount -->
          <h3 class="chart-text"><?php print $chart['text']['goal']; ?></h3>
        </div> <!-- /.shc-donateslide-goal -->

        <div class="bar"></div>

        <div class="shc-donateslide-raised">
          <div class="amount" data-amount="<?php print $chart['raw']['total_raised']; ?>">
            <?php print $chart['total_raised']; ?>
          </div>
          <h3 class="chart-text"><?php print $chart['text']['total_raised']; ?></h3>
        </div> <!-- /.shc-donateslide-raised -->
      </div> <!-- /.shc-donateslide-chart -->
    <?php endif; ?>
    
    <?php if ($button['link']): ?>
      <div class="shc-donateslide-button pos-<?php print $button['position']; ?>">
        <?php if ($button['header']): ?>
          <h2 class="button-header"><?php print $button['header']; ?></h2>
        <?php endif; ?>

        <?php print $button['link']; ?>
      </div>
    <?php endif; ?>
  </div> <!-- /.home-image /.shc-donateslide -->
<?php endif; ?>
 
