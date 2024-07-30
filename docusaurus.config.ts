import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
import social from './data/social'
import { GiscusConfig } from './src/components/Comment'


const beian = '陕ICP备19023652号'
const chatgptURL = 'https://chatgpt.starryhk.cn'
const config: Config = {
  title: 'starrysky的技术博客',
  url: 'https://tech.starryhk.cn',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'starrysky',
  projectName: 'blog',
  customFields: {
    bio: '这是记录技术的博客',
    description:
      '是一个主要分享编程开发知识和项目，该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。',
  },
  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: 'starrysky',
      },
      {
        name: 'keywords',
        content: 'blog, java, aws',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        alt: 'starrysky',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          label: '博客',
          position: 'right',
          to: 'blog',
        },
        {
          label: '标签',
          position: 'right',
          to: 'blog/tags',
        },
        {
          label: '笔记',
          position: 'right',
          items: [
            { label: '技术', to: 'docs/tech' },
            { label: '工具', to: 'docs/tools' },
          ]
        },
        {
          label: '更多',
          position: 'right',
          items: [
            { label: '资源', to: 'resources' },
            { label: '友链', to: 'friends' },
            { label: '历史博客', to: 'blog/archive' },
          ],
        },
        {
          label: 'ChatGpt',
          position: 'right',
          to: chatgptURL
        },
        {
          href: social.github?.href,
          position: 'right',
          className: 'header-github-logo',
          'aria-label': 'GitHub Repo',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '历史博客', to: 'blog/archive' },
            { label: '技术笔记', to: 'docs/tech' },
            { label: '工具笔记', to: 'docs/tools' },
            { label: '实战项目', to: 'project' }
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: 'GitHub', href: social.github.href },
            { label: 'CSDN', href: social.csdn.href },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            { label: '导航', position: 'right', to: 'resources' },
            {
              html: `
                <a href="https://docusaurus.io/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
      copyright:
        `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p>Copyright © ${new Date().getFullYear()} starrysky. Built with <a href="https://github.com/facebook/docusaurus" target="_blank" rel="noopener noreferrer">Docusaurus</a></p>
        <script async data-id="101442324" src="//static.getclicky.com/js"></script>
        `,
    },
    algolia: {
      appId: 'ESJ34RD7VG',
      apiKey: '892170fb25fbe78c48d6e8c25ee33cba',
      indexName: 'tech-starryhk',
      contextualSearch: false,
      searchParameters: {
        facetFilters:[]
      }
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
      ],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'starryskyhk/tech-blog',
      repoId: 'R_kgDOLHtK_Q',
      category: 'General',
      categoryId: 'DIC_kwDOLHtK_c4CclET',
      theme: 'light',
      darkTheme: 'dark_dimmed'
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
          showLastUpdateTime:true,
          editUrl: ({versionDocsDirPath, docPath}) =>
            `${social.github.href}/tech-blog/edit/main/${versionDocsDirPath}/${docPath}`,
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
        gtag: {
          trackingID: 'G-02183FS29K',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    '@docusaurus/plugin-ideal-image',
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `${social.github.href}/tech-blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '记录学习',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 10,
        showLastUpdateAuthor:true,
        showLastUpdateTime: true,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: 'starrysky',
          copyright: `Copyright © ${new Date().getFullYear()} starrysky Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    async function injectMotto() {
      return {
        name: 'docusaurus-motto',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
    (${function () {
                  console.log(
                      `%c Kz Blog %c https://github.com/starryskyhk/tech-blog`,
                      'color: #fff; margin: 1em 0; padding: 5px 0; background: #12affa;',
                      'margin: 1em 0; padding: 5px 0; background: #efefef;',
                  )

                  const motto = `
This Webisite Powered By Starrysky Blog.
Written by Docusaurus, Coding with Love.
--------
Love what you do and do what you love.
`

                  if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
                    document.prepend(document.createComment(motto))
                  }
                }.toString()})();`,
              },
            ],
          }
        },
      }
    }
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'starrysky的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
  themes:['@docusaurus/theme-mermaid'],
  markdown: {
    format:'detect',
    mermaid: true,
  },
  onBrokenLinks:"ignore",
  onBrokenMarkdownLinks:"warn"

}

export default config
