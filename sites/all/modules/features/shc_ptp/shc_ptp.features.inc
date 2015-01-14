<?php
/**
 * @file
 * shc_ptp.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function shc_ptp_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}
