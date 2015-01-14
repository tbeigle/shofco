<?php
/**
 * @file
 * shc_feature_big.features.inc
 */

/**
 * Implements hook_views_api().
 */
function shc_feature_big_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function shc_feature_big_node_info() {
  $items = array(
    'feature_big' => array(
      'name' => t('Feature Big'),
      'base' => 'node_content',
      'description' => t('Basically a copy of the homepage_feature_big type but for broader use.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

/**
 * Implements hook_weight_features_default_settings().
 */
function shc_feature_big_weight_features_default_settings() {
  $settings = array();

  $settings['feature_big'] = array(
    'enabled' => 1,
    'range' => 20,
    'menu_weight' => 0,
    'default' => 0,
    'sync_translations' => 0,
  );

  return $settings;
}
