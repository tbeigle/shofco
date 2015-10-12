<?php
/**
 * @file shc_donateslide.admin.inc
 *
 * Forms and page callbacks for administering SHOFCO donate slide
 */

/**
 * Admin settings for the donate slide
 */
function shc_donateslide_settings($form, &$form_state) {
  $settings = _shc_donateslide_default_settings();
  $classy = new _shc_donateslide_classy();
  $all_campaigns = $classy->campaigns();
  $campaigns = array();
  foreach ($all_campaigns as $campaign) {
    $campaigns[$campaign->id] = $campaign->name;
  }
  
  // View settings
  $views = views_get_views_as_options(TRUE, 'all', NULL, FALSE, TRUE);
  $form['shc_donateslide_view'] = array(
    '#title' => t('View to Attach to'),
    '#type' => 'select',
    '#options' => $views,
    '#default_value' => variable_get('shc_donateslide_view', 'big_homepage_feature'),
  );
  
  $form['shc_donateslide_settings'] = array(
    '#tree' => TRUE,
  );
  
  // Toggles use of the donate slide
  $form['shc_donateslide_settings']['status'] = array(
    '#title' => t('Status'),
    '#type' => 'radios',
    '#options' => array(
      0 => t('Disabled'),
      1 => t('Enabled'),
    ),
    '#default_value' => $settings['status'],
  );
  
  // Classy settings
  $form['shc_donateslide_settings']['classy'] = array(
    '#title' => t('Classy'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['classy']['cid'] = array(
    '#title' => t('Account ID'),
    '#type' => 'textfield',
    '#default_value' => $settings['classy']['cid'],
  );
  
  $form['shc_donateslide_settings']['classy']['token'] = array(
    '#title' => t('API Token'),
    '#type' => 'textfield',
    '#default_value' => $settings['classy']['token'],
    //'#required' => TRUE,
  );
  
  $form['shc_donateslide_settings']['classy']['endpoint'] = array(
    '#title' => t('Campaigns Endpoint'),
    '#type' => 'textfield',
    '#default_value' => $settings['classy']['endpoint'],
    '#disabled' => TRUE,
  );
  
  $form['shc_donateslide_settings']['classy']['eid'] = array(
    '#title' => t('Campaign'),
    '#default_value' => $settings['classy']['eid'],
  );
  
  if (!empty($campaigns)) {
    $form['shc_donateslide_settings']['classy']['eid']['#type'] = 'select';
    $form['shc_donateslide_settings']['classy']['eid']['#options'] = $campaigns;
  }
  else {
    $form['shc_donateslide_settings']['classy']['eid']['#type'] = 'textfield';
  }
  
  // Background image
  $form['shc_donateslide_settings']['img'] = array(
    '#title' => t('Image Settings'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['img']['fid'] = array(
    '#title' => t('Image'),
    '#type' => 'managed_file',
    '#description' => t('The background image for the slide.'),
    '#default_value' => $settings['img']['fid'],
    '#upload_location' => 'public://shc-donateslide-img/',
    '#required' => TRUE,
  );
  
  $form['shc_donateslide_settings']['img']['alt'] = array(
    '#title' => t('Alternative Text'),
    '#type' => 'textfield',
    '#default_value' => $settings['img']['alt'],
    '#description' => t('Text for the alt attribute in the img tag.'),
  );
  
  $form['shc_donateslide_settings']['img']['text'] = array(
    '#title' => t('Special Serif Text'),
    '#type' => 'textfield',
    '#default_value' => $settings['img']['text'],
  );
  
  // Chart settings
  $form['shc_donateslide_settings']['chart'] = array(
    '#title' => t('Chart'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['chart']['enabled'] = array(
    '#title' => t('Enabled'),
    '#type' => 'checkbox',
    '#default_value' => $settings['chart']['enabled'],
  );
  
  $form['shc_donateslide_settings']['chart']['background'] = array(
    '#title' => t('Backgrounds'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['chart']['background']['top'] = array(
    '#title' => t('Chart Top'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['chart']['background']['top'],
  );
  
  $form['shc_donateslide_settings']['chart']['background']['bottom'] = array(
    '#title' => t('Chart Bottom'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['chart']['background']['bottom'],
  );
  
  $form['shc_donateslide_settings']['chart']['color'] = array(
    '#title' => t('Font Colors'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['chart']['color']['top'] = array(
    '#title' => t('Chart Top'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['chart']['color']['top'],
  );
  
  $form['shc_donateslide_settings']['chart']['color']['bottom'] = array(
    '#title' => t('Chart Bottom'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['chart']['color']['bottom'],
  );
  
  // Button settings
  $form['shc_donateslide_settings']['button'] = array(
    '#title' => t('Donate Button'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  $form['shc_donateslide_settings']['button']['header'] = array(
    '#title' => t('Header Text'),
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => $settings['button']['header'],
  );
  
  $form['shc_donateslide_settings']['button']['header_color'] = array(
    '#title' => t('Header Font Color'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['button']['header_color'],
  );
  
  $form['shc_donateslide_settings']['button']['text'] = array(
    '#title' => t('Button Text'),
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => $settings['button']['text'],
  );
  
  $form['shc_donateslide_settings']['button']['url'] = array(
    '#title' => t('URL Override'),
    '#description' => t('If you wish to link this button to something other than the thermometer campaign enter the URL here.'),
    '#type' => 'textfield',
    '#required' => FALSE,
    '#default_value' => $settings['button']['url'],
  );
  
  $form['shc_donateslide_settings']['button']['position'] = array(
    '#title' => t('Button Position'),
    '#type' => 'select',
    '#options' => array(
      'tl' => t('Top Left'),
      'tc' => t('Top Center'),
      'tr' => t('Top Right'),
      'cr' => t('Center Right'),
      'br' => t('Bottom Right'),
      'bc' => t('Bottom Center'),
      'bl' => t('Bottom Left'),
      'cl' => t('Center Left'),
      'cc' => t('Center Center'),
    ),
    '#required' => TRUE,
    '#default_value' => $settings['button']['position'],
  );
  
  $form['shc_donateslide_settings']['button']['background'] = array(
    '#title' => t('Button Background Color'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['button']['background'],
  );
  
  $form['shc_donateslide_settings']['button']['color'] = array(
    '#title' => t('Button Font Color'),
    '#type' => 'jquery_colorpicker',
    '#required' => TRUE,
    '#default_value' => $settings['button']['color'],
  );
  
  // Button2 settings
  $form['shc_donateslide_settings']['button2'] = array(
    '#title' => t('Extra Button'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
    '#collapsible' => TRUE,
  );
  
  // Button2 settings
  $form['shc_donateslide_settings']['button2']['status'] = array(
    '#title' => t('Extra Button Status'),
    '#type' => 'select',
    '#required' => TRUE,
    '#options' => array(
      0 => t('Disabled'),
      1 => t('Enabled'),
    ),
    '#default_value' => $settings['button2']['status'],
  );
  
  $form['shc_donateslide_settings']['button2']['text'] = array(
    '#title' => t('Extra Button Text'),
    '#type' => 'textfield',
    '#required' => FALSE,
    '#default_value' => $settings['button2']['text'],
  );
  
  $form['shc_donateslide_settings']['button2']['url'] = array(
    '#title' => t('URL'),
    '#type' => 'textfield',
    '#required' => FALSE,
    '#default_value' => $settings['button2']['url'],
  );
  
  // Custom submit handler
  $form['#validate'][] = 'shc_donateslide_settings_validate';
  
  return system_settings_form($form);
}

/**
 * Custom validation handler for the donate slide settings form
 */
function shc_donateslide_settings_validate(&$form, &$form_state) {
  $errors = form_get_errors();
  if (!empty($errors)) return;
  
  $data = $form_state['values'];
  $settings = $data['shc_donateslide_settings'];
  
  // Load the file
  $file = file_load($settings['img']['fid']);
  // Change the status to permanent
  $file->status = FILE_STATUS_PERMANENT;
  // Save the file
  file_save($file);
  // Record that the front page node is using this file
  file_usage_add($file, 'node', 'node', 7);
  
  // Rebuild the overrides CSS file
  $css = '';
  
  if (_shc_donateslide_valid_color($settings['button']['header_color'])) {
    $css .=
      '.shc-donateslide-button .button-header { ' .
        'color: #' . $settings['button']['header_color'] . '; ' .
      '} ';
  }
  
  if (_shc_donateslide_valid_color($settings['button']['background'])) {
    $css .=
      '.shc-donateslide-button .button, ' .
      '#block-views-big-homepage-feature-block .shc-donateslide-button a.button { ' .
        'background-color: #' . $settings['button']['background'] . '; ' .
      '} ';
  }

  if (_shc_donateslide_valid_color($settings['button']['color'])) {
    $css .=
      '.shc-donateslide-button .button:link, ' .
      '.shc-donateslide-button .button:visited, ' .
      '#block-views-big-homepage-feature-block .shc-donateslide-button a.button:link, ' .
      '#block-views-big-homepage-feature-block .shc-donateslide-button a.button:visited { ' .
        'color: #' . $settings['button']['color'] . '; ' .
      '} ';
  }

  if (_shc_donateslide_valid_color($settings['chart']['background']['top'])) {
    $css .=
      '.shc-donateslide-chart { ' .
        'background-color: #' . $settings['chart']['background']['top'] . '; ' .
      '} ';
  }

  if (_shc_donateslide_valid_color($settings['chart']['background']['bottom'])) {
    $css .=
      '.shc-donateslide-chart .bar { ' .
        'background-color: #' . $settings['chart']['background']['bottom'] . '; ' .
      '} ';
  }

  if (_shc_donateslide_valid_color($settings['chart']['color']['top'])) {
    $css .=
      '.shc-donateslide-goal { ' .
        'color: #' . $settings['chart']['color']['top'] . '; ' .
      '} ';
  }

  if (_shc_donateslide_valid_color($settings['chart']['color']['bottom'])) {
    $css .=
      '.shc-donateslide-raised { ' .
        'color: #' . $settings['chart']['color']['bottom'] . '; ' .
      '} ';
  }
  
  if ($fp = file_unmanaged_save_data($css, 'public://shc-donateslide-overrides.css', FILE_EXISTS_REPLACE)) {
    cache_clear_all();
  }
}
