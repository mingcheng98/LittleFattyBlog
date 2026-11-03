/* global hexo */

'use strict';

// MathJax 4 的公式字体（newcm）默认固定从 jsDelivr 拉取：
// https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font@x/chtml/woff2/*.woff2
// jsDelivr 在国内时通时断，字体到达前公式用回退字体排版，会出现
// 「字形缺一半 / 上下标错位」，字体到达后才恢复（首访尤明显）。
// 这里把字体改指向站点自托管的副本（source/fonts/mathjax/，与博客同源，
// 可达性与博客本身一致），NexT 会把它写进 CONFIG.mathjax.font_path。
hexo.extend.filter.register('before_generate', () => {
  const url_for = require('hexo-util').url_for;
  hexo.theme.config.vendors.mathjax_font_path = url_for.call(hexo, '/fonts/mathjax');
}, 1);
