<?php
/**
 * @file template.php
 *
 * template.php file for the custom SHOFCO.org theme
 */

/**
 * Implements template_preprocess_page().
 */
function sho_preprocess_page(&$vars) {
  $vars['donate_url'] = theme_get_setting('donate_url');
}
