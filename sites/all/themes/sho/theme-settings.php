<?php
/**
 * @file theme-settings.php
 *
 * Contains an alter function for the theme settings form
 */
function sho_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['donate_url'] = array(
    '#type' => 'textfield',
    '#title' => t('Default Donate Now URL'),
  );
  
  if ($url = theme_get_setting('donate_url')) {
    $form['donate_url']['#default_value'] = $url;
  }
}
