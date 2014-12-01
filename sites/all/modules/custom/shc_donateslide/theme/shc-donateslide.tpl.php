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
 
 $chart_class = $chart['enabled'] ? ' with-chart' : '';
 
 $wrapper_style = $chart['enabled'] && !empty($chart['background']['top']) ? ' style="background-color: #' . $chart['background']['top'] . ';"' : '';
 
 $chart_top_style = '';
 if ($chart['color']['top']) {
  $chart_top_style .= ' style="color:#' . $chart['color']['top'] . ';"';
 }
 
 $chart_bottom_style = '';
 if ($chart['color']['bottom'] || $chart['background']['bottom']) {
  $chart_bottom_style .= ' style="';
  
  if ($chart['color']['bottom']) {
    $chart_bottom_style .= 'color:#' . $chart['color']['bottom'] . ';';
  }
  
  if ($chart['background']['bottom']) {
    $chart_bottom_style .= 'background-color:#' . $chart['background']['bottom'] . ';';
  }
  
  $chart_bottom_style .= '"';
 }
 
 $button_style = '';
 if ($button['background'] || $button['color']) {
  $button_style = ' style="';
  
  if ($button['background']) {
    $button_style .= 'background-color:#' . $button['background'] . ';';
  }
  
  if ($button['color']) {
    $button_style .= 'color:#' . $button['color'] . ';';
  }
  
  $button_style .= '"';
 }
?>

<?php if ($img): ?>
  <div class="home-image shc-donateslide<?php print $chart_class; ?>"<?php //print $wrapper_style; ?>>
    <?php print $img; ?>
    
    <?php if ($chart['enabled'] && $chart['goal'] && $chart['total_raised']): ?>
      <div class="shc-donateslide-chart"<?php print $wrapper_style; ?>>
        <div class="shc-donateslide-goal"<?php print $chart_top_style; ?>>
          <?php print $chart['goal']; ?>
          <h3 class="chart-text"><?php print t('Matching Goal'); ?></h3>
        </div> <!-- /.shc-donateslide-goal -->
        
        <div class="shc-donateslide-raised"<?php print $chart_bottom_style; ?>>
          <?php print $chart['total_raised']; ?>
          <h3 class="chart-text"><?php print t('Current Donations'); ?></h3>
        </div> <!-- /.shc-donateslide-raised -->
      </div> <!-- /.shc-donateslide-chart -->
    <?php endif; ?>
    
    <?php if ($button['path'] && $button['text']): ?>
      <div class="shc-donateslide-button pos-<?php print $button['position']; ?>">
        <?php
          //TO DO: This should be an input field once the API integration is complete.
        ?>
        
        <?php if ($button['header']): ?>
          <h2 class="button-header"><?php print t('@header', array('@header' => $button['header'])); ?></h2>
        <?php endif; ?>
        <a class="button" href="<?php print $button['path']; ?>"<?php print $button_style; ?>><?php print t('@text', array('@text' => $button['text'])); ?></a>
      </div>
    <?php endif; ?>
  </div> <!-- /.home-image /.shc-donateslide -->
<?php endif; ?>
 