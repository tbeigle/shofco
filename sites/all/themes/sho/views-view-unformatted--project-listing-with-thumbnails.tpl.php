<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>

  <?php
  $column_classes = array('');
  if ((($id + 1) % 3) == 0) { $column_classes[] = 'third'; }
  if ((($id) % 3) == 0) { $column_classes[] = 'clear-third'; }
  if ((($id + 1) % 4) == 0) { $column_classes[] = 'fourth'; }
  if ((($id) % 4) == 0) { $column_classes[] = 'clear-fourth'; }
  if ((($id + 1) % 5) == 0) { $column_classes[] = 'fifth'; }
  if ((($id) % 5) == 0) { $column_classes[] = 'clear-fifth'; }
  ?>

  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] . implode(' ', $column_classes) .'"';  } ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?>
