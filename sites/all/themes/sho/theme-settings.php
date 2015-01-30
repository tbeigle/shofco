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
  
  $form['home_slider_autoplay'] = array(
    '#type' => 'checkbox',
    '#title' => t('Autoplay Home Slider'),
    '#description' => t('If checked, the slider on the homepage will start sliding automatically. Otherwise, the slides will only animate in response to click/touch actions.'),
    '#default_value' => theme_get_setting('home_slider_autoplay'),
  );
}
