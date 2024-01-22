const imgPrefix= '/img/friend';
export const Friends: Friend[] = [
  {
    title: '愧柞的资源',
    description: '很多学习网站',
    website: 'https://kuizuo.cn/resources',
    avatar: `${imgPrefix}/kuizuo.png`,
  }
]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: string
}
