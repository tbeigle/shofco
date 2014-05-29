<?php

/**
 * @file
 * Default theme implementation to display a block.
 *
 * Available variables:
 * - $block->subject: Block title.
 * - $content: Block content.
 * - $block->module: Module that generated the block.
 * - $block->delta: An ID for the block, unique within each module.
 * - $block->region: The block region embedding the current block.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - block: The current template type, i.e., "theming hook".
 *   - block-[module]: The module generating the block. For example, the user
 *     module is responsible for handling the default user navigation block. In
 *     that case the class would be 'block-user'.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Helper variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $block_zebra: Outputs 'odd' and 'even' dependent on each block region.
 * - $zebra: Same output as $block_zebra but independent of any block region.
 * - $block_id: Counter dependent on each block region.
 * - $id: Same output as $block_id but independent of any block region.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 * - $block_html_id: A valid HTML ID and guaranteed unique.
 *
 * @see template_preprocess()
 * @see template_preprocess_block()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="block-inner">
    <img id="initiatives-image" src="/sites/all/themes/sho/img/initiatives-v2.png" width="2079" height="804" alt="Our Core Initiatives" />
    <map name="m_initiatives">
      <area shape="rect" coords="1407,651,1646,785" href="/wash" title="Water &amp; Sanitation Initatives" alt="Water &amp; Sanitation Initatives" />
      <area shape="rect" coords="1679,83,1992,220" href="/community" title="Community Empowerment Initiatives" alt="Community Empowerment Initiatives" />
      <area shape="rect" coords="455,694,645,779" href="/health" title="Health Initiatives" alt="Health Initiatives" />
      <area shape="rect" coords="89,242,313,334" href="/education" title="Education Initiatives" alt="Education Initiatives" />
      <area shape="circle" coords="1831,580, 149" href="/wash" title="Water &amp; Sanitation Initatives" alt="Water &amp; Sanitation Initatives" />
      <area shape="circle" coords="1460,155, 149" href="/community" title="Community Empowerment Initiatives" alt="Community Empowerment Initiatives" />
      <area shape="circle" coords="506,313, 149" href="/education" title="Education Initiatives" alt="Education Initiatives" />
      <area shape="circle" coords="256,646, 149" href="/health" title="Health Initiatives" alt="Health Initiatives" />
    </map>
  </div>
</div>
