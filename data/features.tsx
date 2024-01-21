import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: '会一点Java',
    }),
    text: (
      <Translate>
        Java出身，但是好久没有用了，沉浸于Devops
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '会一点AWS',
    }),
    text: (
      <Translate>
        正在准备考AWS证。
      </Translate>
    ),
    Svg: SpiderSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '喜欢做出东西的成就感',
    }),
    text: (
      <Translate>
        正在努力学习
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
