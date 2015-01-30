<?php
/**
 * @file template.php
 *
 * template.php file for the custom SHOFCO.org theme
 */

/**
 * Implements template_preprocess_html().
 */
function sho_preprocess_html(&$vars) {
  $spec_settings = _sho_special_theme_settings();
  $autoplay = $spec_settings['home_slider_autoplay'];
  
  drupal_add_js(array('sho' => array('homeSliderPause' => $autoplay ? 0 : 1)), 'setting');
}

/**
 * Implements template_preprocess_page().
 */
function sho_preprocess_page(&$vars) {
  $spec_settings = _sho_special_theme_settings();
  $vars['donate_url'] = $spec_settings['donate_url'];
}

/**
 * Helper function for loading special theme settings
 */
function _sho_special_theme_settings() {
  global $_sho_special_theme_settings;
  
  if (!empty($_sho_special_theme_settings)) {
    return $_sho_special_theme_settings;
  }
  
  $_sho_special_theme_settings = array();
  
  $settings = array(
    'donate_url',
    'home_slider_autoplay',
  );
  
  foreach ($settings as $setting) {
    if ($s = theme_get_setting($setting)) {
      $_sho_special_theme_settings[$setting] = $s;
    }
    else {
      switch($setting) {
        case 'home_slider_autoplay': {
          $_sho_special_theme_settings[$setting] = 0;
          break;
        }
        default: {
          $_sho_special_theme_settings[$setting] = '';
          break;
        }
      }
    }
  }
  
  return $_sho_special_theme_settings;
}
