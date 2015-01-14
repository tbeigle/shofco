<?php
/**
 * @file
 * shc_feature_big.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function shc_feature_big_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-big_feature-block'] = array(
    'cache' => -1,
    'css_class' => 'big-feature ptp',
    'custom' => 0,
    'delta' => 'big_feature-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => 'raise-money-for-shofco',
    'roles' => array(),
    'themes' => array(
      'bartik' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bartik',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'sho' => array(
        'region' => 'above',
        'status' => 1,
        'theme' => 'sho',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 1,
  );

  return $export;
}
