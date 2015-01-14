<?php
/**
 * @file
 * shc_ptp.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function shc_ptp_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'raise_money';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'raise-money-for-shofco' => 'raise-money-for-shofco',
      ),
    ),
  );
  $context->reactions = array(
    'theme_html' => array(
      'class' => 'raise-money-2015',
    ),
  );
  $context->condition_mode = 0;
  $export['raise_money'] = $context;

  return $export;
}
