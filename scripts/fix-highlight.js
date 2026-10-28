/* global hexo */

'use strict';

// NexT 在 before_generate（priority 0）里强制 config.highlight.hljs = false，
// 导致 hexo-util 输出的 token class（.keyword 等）与 NexT 内嵌的高亮主题 CSS
//（只认 .hljs-keyword 等）永远匹配不上，代码块没有颜色。
// 这里用更高优先级把 hljs 模式改回来，让主题的高亮主题 CSS 正常生效。
hexo.extend.filter.register('before_generate', () => {
  hexo.config.highlight.hljs = true;
}, 1);
