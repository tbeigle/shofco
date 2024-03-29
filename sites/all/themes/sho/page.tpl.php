<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>

  <div id="page-wrapper"><div id="page">

    <div id="header-wrapper">
      
    <div id="header"><div class="section clearfix">
     
     <div id="not-navigation" class="clearfix">

        <?php if ($site_name || $site_slogan): ?>
            <?php if ($site_name): ?>
              <?php if ($title): ?>
                <div id="site-name">
                  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_name; ?></a>
                </div>
              <?php else: /* Use h1 when the content title is empty */ ?>
                <h1 id="site-name">
                  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_name; ?></a>
                </h1>
              <?php endif; ?>
            <?php endif; ?>

        <?php endif; ?>

      <div id="nav-toggle">
        <a href="/node/2">
          <span id="top"></span>
          <span id="middle"></span>
          <span id="bottom"></span>
        </a>
      </div>
       
     </div>

      <?php if ($page['navigation']): ?>
        <div id="navigation" class="hide-for-mobile"><div class="section">
          <?php print render($page['navigation']); ?>
        </div></div> <!-- /.section, /#navigation -->
      <?php endif; ?>

    </div></div> <!-- /.section, /#header -->
    </div><!-- /#header-wrapper -->

    <?php if ($page['above']): ?>
      <div id="above"><?php print render($page['above']); ?></div>
    <?php endif; ?>
    
    <?php if ($messages): ?>
    <div id="messages-container">
      <?php print $messages; ?>
    </div>
    <?php endif; ?>

    <div id="main-wrapper" class="content-area"><div id="main" class="clearfix">

      <?php if ($page['sidebar_first']): ?>
        <div id="sidebar-first" class="column sidebar"><div class="section">
          <?php print render($page['sidebar_first']); ?>
        </div></div> <!-- /.section, /#sidebar-first -->
      <?php endif; ?>

      <div id="content-column" class="column clearfix">

        <div id="content" class="column"><div class="section">
          <a id="main-content"></a>
          <?php print render($title_prefix); ?>
          <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
          <?php print render($title_suffix); ?>
          <?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
          <?php print render($page['help']); ?>
          <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
          <?php print render($page['content']); ?>
          <?php print $feed_icons; ?>
        </div></div> <!-- /.section, /#content -->

        <?php if ($page['sidebar_second']): ?>
          <div id="sidebar-second" class="column sidebar"><div class="section">
            <?php print render($page['sidebar_second']); ?>
          </div></div> <!-- /.section, /#sidebar-second -->
        <?php endif; ?>

      </div> <!-- /#content-column -->

    </div></div> <!-- /#main, /#main-wrapper -->

    <?php if ($page['below']): ?>
      <div id="below" class="content-area"><?php print render($page['below']); ?></div>
    <?php endif; ?>

    <?php if (!empty($donate_url)): ?>
      <div id="footer-ask">
        <div class="section clearfix">
          <h2><?php print $site_slogan; ?></h2>
          <div id="footer-donate-button">
            <?php print l(t('Donate Now'), $donate_url); ?>
          </div>
        </div> <!-- /.section /.clearfix -->
      </div> <!-- /#footer-ask -->
    <?php endif; ?>
    <div id="footer"><div class="section clearfix">
      <div class="footer-column first">
        <img id="footer-logo" src="/<?php print path_to_theme(); ?>/img/footer-logo.png" alt="Shining Hope for Communities (SHOFCO)" />
        <p>&copy;2013 Shining Hope for Communities (SHOFCO)</p>
      </div>
      <div class="footer-column second">
        <h3>Connect with Us:</h3>
        <div id="social">
          <a target="_blank" href="https://twitter.com/hope2shine"><i class="icon icon-twitter"></i></a>
          <a target="_blank" href="https://www.facebook.com/ShiningHopeforCommunities"><i class="icon icon-facebook"></i></a>
          <a target="_blank" href="https://www.youtube.com/user/shininghopeforcomm"><i class="icon icon-youtube-play"></i></a>
          <a target="_blank" href="http://instagram.com/shofco"><i class="icon icon-instagram"></i></a>
        </div>
      </div>
      <div class="footer-column third">
        <h3>Join Our Mailing List:</h3>
        <?php include "mailchimp.php"; ?>
      </div>
      <div id="footer-info">
        <span id="info-chunk1" class="footer-info-chunk">
          <span class="chunk-header">Nairobi, Kenya:</span> 
          <span class="chunk-half">Headquarters in Gatwakera, Kibera,</span> 
          <span class="chunk-half">P.O. Box 8303-00200, +254 732058126</span>
          <span class="sep">&ndash;</span> 
        </span> 
        <span id="info-chunk2" class="footer-info-chunk">
          <span class="chunk-header">New York:</span> 
          <span class="chunk-half">175 Varick St, 6th Fl,</span> 
          <span class="chunk-half">New York, NY 10014, 860-218-9854</span>
          <span class="sep">&ndash;</span> 
          <span id="contact-button">
            <a href="/contact">Contact</a>
          </span>
        </span> 
      </div>
    </div></div> <!-- /.section, /#footer -->

  </div></div> <!-- /#page, /#page-wrapper -->
