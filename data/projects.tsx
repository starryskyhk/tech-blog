export const projects: Project[] = [
  {
    title: '愧怍的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://kuizuo.cn',
    source: 'https://github.com/kuizuo/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  // toy
  {
    title: 'Chaoxing-sign',
    description: '🌟 超星学习通在线签到，摆脱客户端繁琐的签到流程，让签到不再是你的烦恼。',
    preview: '/img/project/chaoxing-sign.png',
    website: 'https://cx.kuizuo.cn',
    source: 'https://github.com/kuizuo/chaoxing-sign',
    tags: ['opensource', 'favorite'],
    type: 'toy',
  },
  {
    title: 'Hoppx',
    description: '👽 仿 Hoppscotch 风格的网站模板',
    preview: '/img/project/hoppx.png',
    website: 'https://hoppx.vercel.app',
    source: 'https://github.com/kuizuo/hoppx',
    tags: ['opensource'],
    type: 'toy',
  },
  {
    title: 'Link Maker',
    description: '🍋 一个用于将链接转换为卡片样式的预览网站',
    preview: '/img/project/link-maker.png',
    website: 'https://link-maker.deno.dev',
    source: 'https://github.com/kuizuo/link-maker',
    tags: ['opensource'],
    type: 'toy',
  },
  {
    title: 'Nuxt-Naive-Admin',
    description: '🎁 一站式管理系统，融合 Nuxt、Naive UI 和 Supabase',
    preview: '/img/project/nuxt-naive-admin.png',
    website: 'https://nuxt-naive-admin.vercel.app',
    source: 'https://github.com/kuizuo/nuxt-naive-admin',
    tags: ['opensource'],
    type: 'toy',
  },
  // {
  //   title: 'Image Hosting',
  //   description: '🖼️ 使用 Supabase 搭建一个简易图床',
  //   preview: '/img/project/image-hosting.png',
  //   website: 'https://image.kuizuo.cn',
  //   source: 'https://github.com/kuizuo/image-hosting',
  //   tags: ['opensource'],
  //   type: 'web',
  // },
  // {
  //   title: 'Vitesse Nuxt3 Strapi',
  //   description: '一个 Vitesse Nuxt3 Strapi 的模板，灵感来源 Vitesse',
  //   preview: '/img/project/vitesse-nuxt3-strapi.png',
  //   website: 'https://vitesse-nuxt3-strapi.vercel.app',
  //   source: 'https://github.com/kuizuo/vitesse-nuxt3-strapi',
  //   tags: ['opensource'],
  //   type: 'web',
  // },
  // personal
  {
    title: 'vscode-extension',
    description: 'vscode 插件的样品',
    preview: '/img/project/vscode-extension.png',
    website: 'https://marketplace.visualstudio.com/items?itemName=kuizuo.vscode-extension-sample',
    source: 'https://github.com/kuizuo/vscode-extension',
    tags: ['opensource'],
    type: 'personal',
  },
  {
    title: '前端示例代码库',
    description: '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: '/img/project/example-website.png',
    website: 'https://example.kuizuo.cn',
    source: 'https://github.com/kuizuo/example',
    tags: ['opensource', 'design'],
    type: 'personal',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '网站',
  app: '应用',
  commerce: '商业项目',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
