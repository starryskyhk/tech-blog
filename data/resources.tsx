import { Friends } from './friends'

export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
  tags?: string[]
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

const friends: Resource[] = Friends.map(f => {
  return {
    ...f,
    name: f.title,
    desc: f.description,
    logo: f.avatar!,
    href: f.website,
  }
})

export const resources: ResourceCategory[] = [
  {
    name: '友链 👨‍💻',
    resources: friends,
  },
  {
    name: '每周必看🔥',
    resources: [
      {
        name: '稀土掘金',
        desc: '稀土掘金是一个技术博客平台，是程序员发布自己的技术文章、分享知识的地方',
        logo: '/img/resource/juejin.png',
        href: 'https://juejin.cn/',
      },
      {
        name: 'OSS Insight',
        desc: 'Open Source Software Insight',
        logo: '/img/resource/ossinsight.png',
        href: 'https://ossinsight.io/',
      },
      {
        name: '前端食堂',
        desc: '周周尝鲜，人工筛选前端圈每周最新资讯。—— 由 童欧巴 创作',
        logo: '/img/resource/zhubai.png',
        href: 'https://hungryturbo.zhubai.love/',
      },
    ],
  },
  {
    name: 'Devops',
    resources: [
      {
        name: 'Cloudflare',
        desc: '域名管理平台',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg',
        href: 'https://dash.cloudflare.com/',
        tags: ['域名','devops'],
      },
    ]
  },
  {
    name: '站点 🖥️',
    resources: [
      {
        name: 'Developer Roadmap',
        desc: 'Roadmap to becoming a web developer.',
        logo: '/img/resource/roadmap.png',
        href: 'https://roadmap.sh/',
      },
      {
        name: 'JS delivr',
        desc: '一个免费的CDN开源项目',
        logo: '/img/resource/jsdelivr.webp',
        href: 'https://www.jsdelivr.com/',
      },
      {
        name: 'Shields.io',
        desc: '为你的开源项目生成高质量小徽章图标',
        logo: '/img/resource/shields.png',
        href: 'https://shields.io/',
        tags: ['图标', '首页'],
      },
      {
        name: 'Quick Reference',
        desc: '为开发人员分享快速参考备忘清单【速查表】',
        logo: '/img/resource/quick reference.svg',
        href: 'https://jaywcjlove.github.io/reference',
        tags: ['手册'],
      },
      {
        name: 'NGINX 配置',
        desc: '配置高性能、安全、稳定的NGINX服务器的最简单方法',
        logo: '/img/resource/digitalocean.png',
        href: 'https://www.digitalocean.com/community/tools/nginx',
        tags: ['nginx'],
      },
      {
        name: '那些免费的砖',
        desc: '发现免费可商用的资源',
        logo: 'https://img.thosefree.com/static/logo.png',
        href: 'https://www.thosefree.com/',
        tags: [''],
      },
      {
        name: '正则大全',
        desc: '🦕 常用正则大全, 支持web / vscode / idea / Alfred Workflow多平台',
        logo: '/img/resource/any-rule.ico',
        href: 'https://any-rule.vercel.app/',
        tags: [''],
      },
    ],
  },
  {
    name: '文档 📘',
    resources: [
      {
        name: 'ES6 入门教程',
        desc: '《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性',
        logo: '/img/resource/es6.png',
        href: 'https://es6.ruanyifeng.com/',
        tags: ['文档'],
      },
      {
        name: '深入理解 TypeScript',
        desc: '《TypeScript Deep Dive》 是一本很好的开源书，从基础到深入，很全面的阐述了 TypeScript 的各种魔法，不管你是新手，还是老鸟，它都将适应你',
        logo: '/img/resource/typescript.png',
        href: 'https://jkchao.github.io/typescript-book-chinese/',
        tags: ['文档'],
      },
    ],
  },
  {
    name: '工具 🛠️',
    resources: [
      {
        name: '在线工具',
        desc: '在线工具,开发人员工具,代码格式化、压缩、加密、解密,下载链接转换,ico图标制作,字帖生成',
        logo: 'https://tool.lu/favicon.ico',
        href: 'https://tool.lu/',
        tags: ['工具'],
      },
      {
        name: '菜鸟工具',
        desc: '菜鸟工具，为开发设计人员提供在线工具，提供在线PHP、Python、 CSS、JS 调试，中文简繁体转换，进制转换等工具',
        logo: '/img/resource/runoob.png',
        href: 'https://c.runoob.com/',
        tags: ['工具'],
      },
      {
        name: 'transform',
        desc: '各类数据格式与对象转换',
        logo: 'https://transform.tools/static/favicon.png',
        href: 'https://transform.tools',
        tags: ['工具', '格式转换'],
      },
      {
        name: 'Apifox',
        desc: 'API 文档、API 调试、API Mock、API 自动化测试',
        logo: '/img/resource/apifox.png',
        href: 'https://www.apifox.cn/',
        tags: ['工具'],
      },
    ],
  },
  {
    name: '网站托管',
    resources: [
      {
        name: 'Vercel',
        desc: 'Vercel将最好的开发人员体验与对最终用户性能的执着关注相结合',
        logo: '/img/resource/vercel.svg',
        href: 'https://vercel.com',
        tags: ['网站托管'],
      },
      {
        name: 'Netlify',
        desc: 'Netlify 是一家提供静态网站托管的云平台，支持从 Github, GitLab, Bitbucket 等代码仓库中自动拉取代码 然后进行项目打包和部署等功能',
        logo: '/img/resource/netlify.png',
        href: 'https://www.netlify.com',
        tags: ['网站托管'],
      }
    ],
  },
  {
    name: '静态站点生成',
    resources: [
      {
        name: 'Docusaurus',
        desc: '快速构建以内容为核心的最佳网站',
        logo: '/img/resource/docusaurus.svg',
        href: 'https://docusaurus.io',
        tags: ['前端', 'React', '静态站点'],
      },
      {
        name: 'VitePress',
        desc: 'Vue 驱动并使用Vite构建的静态网站生成器',
        logo: 'https://vuepress.vuejs.org/hero.png',
        href: 'https://vitepress.vuejs.org',
        tags: ['前端', 'Vue', '静态站点'],
      },
      {
        name: 'Hexo',
        desc: '快速、简洁且高效的博客框架',
        logo: 'https://hexo.io/favicon.ico',
        href: 'https://hexo.io',
        tags: ['前端', '静态站点'],
      },
      {
        name: 'Docsify',
        desc: 'docsify 可以快速帮你生成文档网站',
        logo: 'https://docsify.js.org/_media/icon.svg',
        href: 'https://docsify.js.org',
        tags: ['前端', '静态站点'],
      },
      {
        name: 'WordPress',
        desc: 'WordPress是一款能让您建立出色网站、博客或应用程序的开源软件',
        logo: 'https://s.w.org/images/wmark.png',
        href: 'https://cn.wordpress.org/',
        tags: ['前端', '站点'],
      },
    ],
  },
  {
    name: 'Frontend',
    resources: [
      {
        name: 'Webpack',
        desc: 'webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle',
        logo: '/img/resource/webpack.png',
        href: 'https://www.webpackjs.com',
        tags: ['构建工具'],
      },
      {
        name: 'Lodash',
        desc: '一个 JavaScript 的实用工具库, 表现一致性, 模块化, 高性能, 以及可扩展',
        logo: 'https://lodash.com/icons/favicon-32x32.png',
        href: 'https://lodash.net',
        tags: ['Nodejs'],
      },
      {
        name: 'WebAssembly',
        desc: 'wasm 是一个可移植、体积小、加载快并且兼容 Web 的全新格式',
        logo: 'https://www.wasm.com.cn/favicon.ico',
        href: 'https://www.wasm.com.cn',
        tags: ['Nodejs'],
      },
      {
        name: 'Greensock',
        desc: '超强大h5动画库',
        logo: 'https://greensock.com/favicon.ico',
        href: 'https://greensock.com/docs/',
        tags: ['前端', 'css', '动画'],
      },
      {
        name: 'Threejs',
        desc: '强大的3D-Js库',
        logo: 'https://threejs.org/favicon.ico',
        href: 'https://threejs.org/',
        tags: ['前端', 'JavaScript', '3D'],
      },
      {
        name: 'Jest',
        desc: 'Jest 是一个令人愉快的 JavaScript 测试框架，注重简单性。',
        logo: '/img/resource/jest.png',
        href: 'https://jestjs.io/',
        tags: ['自动化测试'],
      },
      {
        name: 'Cypress',
        desc: '对任何在浏览器中运行的东西进行快速、简单和可靠的测试。',
        logo: '/img/resource/cypress.png',
        href: 'https://www.cypress.io/',
        tags: ['自动化测试'],
      }
    ],
  },
  {
    name: '组件库',
    resources: [
      {
        name: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        logo: 'https://element-plus.gitee.io/images/element-plus-logo-small.svg',
        href: 'https://element-plus.gitee.io/',
        tags: ['前端', 'Vue', '组件库'],
      },
      {
        name: 'Naive UI',
        desc: '一个 Vue 3 组件库比较完整，主题可调，使用 TypeScript，快 有点意思',
        logo: '/img/resource/naiveUI.svg',
        href: 'https://www.naiveui.com/',
        tags: ['组件库', 'vue'],
      },
      {
        name: 'Ant Design',
        desc: '一套企业级 UI设计语言和 React 组件库',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        href: 'https://ant.design',
        tags: ['前端', 'React', '组件库'],
      },
      {
        name: 'shadcn/ui',
        desc: '设计精美的组件，您可以将其复制并粘贴到您的应用程序中。无障碍。可定制。开源。',
        logo: 'https://ui.shadcn.com/favicon.ico',
        href: 'https://ui.shadcn.com/',
        tags: ['组件库', 'react', 'tailwindcss'],
      },
      {
        name: 'TDesign',
        desc: 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系',
        logo: 'https://tdesign.tencent.com/favicon.ico',
        href: 'https://tdesign.tencent.com/',
        tags: ['组件库', 'react'],
      },
      {
        name: 'Arco Design',
        desc: '字节跳动出品的企业级设计系统',
        logo: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
        href: 'https://arco.design/',
        tags: ['组件库', 'react'],
      },
      {
        name: 'Vuetify',
        desc: 'Vuetify 是一个 Vue UI 库，包含手工制作的精美材料组件。不需要设计技能 - 创建令人惊叹的应用程序所需的一切都触手可及',
        logo: 'img/resource/vuetify.svg',
        href: 'https://vuetify.en/',
        tags: ['组件库', 'react'],
      },
      {
        name: 'MUI',
        desc: '当下流行的 React UI 框架',
        logo: 'https://mui.com/static/favicon.ico',
        href: 'https://mui.com',
        tags: ['前端', 'React', '组件库'],
      },
      {
        name: 'VbenAdmin',
        desc: 'Vben是一个基于Vue3、Vite、TypeScript等最新技术栈开发的后台管理框架',
        logo: '/img/resource/vben-admin.png',
        href: 'https://vvbin.cn/doc-next/',
        tags: ['前端', 'Vue', '后台', '项目'],
      },
    ],
  },
  {
    name: '设计',
    resources: [
      {
        name: 'Mastergo',
        desc: '面向团队的专业 UI/UX 设计工具，多人同时编辑、随时在线评审、设计一键交付，让想法更快实现',
        logo: 'https://mastergo.com/favicon.ico',
        href: 'https://mastergo.com/',
        tags: ['设计'],
      },
      {
        name: '即时设计',
        desc: '可云端编辑的专业级 UI 设计工具，为中国设计师量身打造，Windows 也能用的「协作版 Sketch」',
        logo: 'https://img.js.design/assets/webImg/favicon.ico',
        href: 'https://js.design/',
        tags: ['设计'],
      },
      {
        name: 'Figma',
        desc: 'Figma 是为 UI 设计而生的设计工具，除了有和 Sketch 一样基本的操作和功能，还有许多专为 UI 设计而生的强大功能。',
        logo: '/img/resource/figma.png',
        href: 'https://www.figma.com/',
        tags: ['设计'],
      },
      {
        name: 'Pixso',
        desc: '一站式完成原型、设计、交互与交付，为数字化团队协作提效',
        logo: 'https://cms.pixso.cn/images/logo.svg',
        href: 'https://pixso.cn/',
        tags: ['设计'],
      },
    ],
  },
  {
    name: '字体图标',
    resources: [
      {
        name: 'iconify',
        desc: '数千个图标，一个统一的框架',
        logo: 'https://icon-sets.iconify.design/favicon.ico',
        href: 'https://icon-sets.iconify.design/',
        tags: ['图标'],
      },
      {
        name: 'icones',
        desc: 'Icon Explorer with Instant searching, powered by Iconify',
        logo: 'https://icones.js.org/favicon.svg',
        href: 'https://icones.js.org/',
        tags: ['图标'],
      },
      {
        name: 'iconfont',
        desc: 'iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        logo: 'https://img.alicdn.com/imgextra/i4/O1CN01EYTRnJ297D6vehehJ_!!6000000008020-55-tps-64-64.svg',
        href: 'https://www.iconfont.cn/',
        tags: ['图标'],
      },
      {
        name: 'feathericons',
        desc: '简单美丽的开源图标',
        logo: 'https://feathericons.com/favicon.ico',
        href: 'https://feathericons.com/',
        tags: ['图标'],
      },
      {
        name: 'undraw',
        desc: '一个不断更新的设计项目与美丽的SVG图像，使用完全免费',
        logo: 'https://undraw.co/apple-touch-icon.png',
        href: 'https://undraw.co/',
        tags: ['插画', 'svg'],
      },
      {
        name: 'igoutu',
        desc: '图标、插图、照片、音乐和设计工具',
        logo: '/img/resource/igoutu.png',
        href: 'https://igoutu.cn/',
        tags: ['插画', 'svg'],
      },
      {
        name: 'Emojiall',
        desc: 'Emoji表情大全',
        logo: 'https://www.emojiall.com/apple-touch-icon.png',
        href: 'https://www.emojiall.com/zh-hans',
        tags: ['图标', 'emoji'],
      },
      {
        name: '渐变色网站',
        desc: '数百万个自动生成的渐变的网站',
        logo: 'https://gradihunt.com/favicon.ico',
        href: 'https://gradihunt.com/',
        tags: ['配色', '背景'],
      },
      {
        name: '谷歌字体',
        desc: '一个生成渐变色背景的网站',
        logo: '/img/resource/google_fonts.ico',
        href: 'https://googlefonts.cn/',
        tags: ['字体'],
      },
      {
        name: 'Typing SVG',
        desc: '一个动态生成的可自定义 SVG 打字效果',
        logo: '/img/resource/typing-svg.png',
        href: 'https://readme-typing-svg.herokuapp.com/demo/',
        tags: ['字体'],
      },
    ],
  },
  {
    name: 'Node',
    resources: [
      {
        name: 'Node',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时',
        logo: '/img/resource/node.svg',
        href: 'http://nodejs.cn/',
        tags: ['后端', 'Nodejs', '文档'],
      },
      {
        name: 'NPM',
        desc: 'NPM是世界上最大的包管理器',
        logo: 'https://static.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
        href: 'https://www.npmjs.com',
        tags: ['Nodejs', '包管理', '文档'],
      },
      {
        name: 'Pnpm',
        desc: '速度快、节省磁盘空间的软件包管理器',
        logo: 'https://www.pnpm.cn/img/favicon.png',
        href: 'https://pnpm.io',
        tags: ['Nodejs', '包管理', '文档'],
      },
      {
        name: 'Axios',
        desc: 'Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js',
        logo: '/img/resource/axios.ico',
        href: 'https://axios-http.cn/',
        tags: ['Nodejs', 'HTTP'],
      },
      {
        name: 'Expressjs',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        logo: 'https://www.expressjs.com.cn/images/favicon.png',
        href: 'https://www.expressjs.com.cn/',
        tags: ['Nodejs', '后端', '框架'],
      },
      {
        name: 'Socket.io',
        desc: 'Socket.IO 是一个可以在浏览器与服务器之间实现实时、双向、基于事件的通信的工具库',
        logo: 'https://socket.io/images/favicon.png',
        href: 'https://socketio.bootcss.com',
        tags: ['Nodejs', 'socket'],
      },
      {
        name: 'GraphQL',
        desc: 'GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时',
        logo: '/img/resource/graphQL.svg',
        href: 'https://graphql.cn',
        tags: ['Nodejs', 'GraphQL'],
      },
      {
        name: 'ECharts',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        logo: 'https://echarts.apache.org/zh/images/favicon.png',
        href: 'https://echarts.apache.org/',
        tags: ['图表', '可视化'],
      },
    ],
  },
  {
    name: 'Vue 生态',
    resources: [
      {
        name: 'Vue.js',
        desc: '渐进式 JavaScript 框架',
        logo: 'https://vuejs.org/logo.svg',
        href: 'https://vuejs.org',
        tags: ['前端', 'Vue', '框架'],
      },
      {
        name: 'Vue Router',
        desc: '为 Vue.js 提供富有表现力、可配置的、方便的路由',
        logo: 'https://vuejs.org/logo.svg',
        href: 'https://router.vuejs.org',
        tags: ['前端', 'Vue'],
      },
      {
        name: 'Pinia',
        desc: '您将会喜欢使用的 Vue 状态管理',
        logo: 'https://pinia.vuejs.org/logo.svg',
        href: 'https://pinia.vuejs.org/',
        tags: ['前端', 'Vue', '文档', '框架'],
      },
      {
        name: 'VueUse',
        desc: '基本 Vue 合成实用程序的集合',
        logo: 'https://vueuse.org/favicon.ico',
        href: 'https://vueuse.org/',
        tags: ['前端', 'Vue', '文档', '框架'],
      },
      {
        name: 'Vitest',
        desc: '一个 Vite 原生单元测试框架。它很快！',
        logo: 'https://vitest.dev/favicon.ico',
        href: 'https://cn.vitest.dev/',
        tags: ['前端', 'Vue', '框架'],
      },
    ],
  },
  {
    name: 'React 生态',
    resources: [
      {
        name: 'React',
        desc: '用于构建用户界面的 JavaScript 库',
        logo: 'https://react.dev/favicon.ico',
        href: 'https://react.dev/',
        tags: ['前端', 'React'],
      },
      {
        name: 'Next.js',
        desc: 'Next.js 为您提供生产环境所需的所有功能以及最佳的开发体验：包括静态及服务器端融合渲染、 支持 TypeScript、智能化打包、 路由预取等功能 无需任何配置',
        logo: 'https://nextjs.org/static/favicon/favicon.ico',
        href: 'https://nextjs.org/',
        tags: ['前端', 'React', '框架'],
      },
      {
        name: 'react-use',
        desc: '一个强大的 React Hooks 库',
        logo: 'https://reactjs.org/favicon.ico',
        href: 'https://github.com/streamich/react-use',
        tags: ['前端', 'React'],
      },
      {
        name: 'framer-motion',
        desc: 'Framer Motion是一个用于React的开源动画库，提供简单易用的API来创建流畅、高性能的动画效果，使Web应用程序和界面变得更加生动和吸引人。',
        logo: 'https://www.framer.com/images/favicons/favicon.png',
        href: 'https://www.framer.com/motion',
        tags: ['前端', 'React', '动画'],
      },
    ],
  },
  {
    name: 'Github',
    resources: [
      {
        name: 'Metrics',
        desc: 'Create your own metrics',
        logo: '/img/resource/github.ico',
        href: 'https://metrics.lecoq.io/',
        tags: [],
      },
      {
        name: 'Github主页 README 生成器',
        desc: '一个Github 个人主页 README 生成器',
        logo: '/img/resource/github.ico',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
        tags: [],
      },
      {
        name: 'Github 统计生成器',
        desc: 'Github 在你的 README 中获取动态生成的 GitHub 统计信息！',
        logo: '/img/resource/github.ico',
        href: 'https://github.com/anuraghazra/github-readme-stats',
        tags: [],
      },
    ],
  }
]
