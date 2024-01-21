export type Social = {
  github?: string
  csdn?: string
  email?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/starryskyhk',
  csdn: 'https://blog.csdn.net/qq_40500437',
  email: 'mailto:starryhksky@gmail.com'
}

const socialSet: Record<keyof Social, SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  csdn:{
    href: social.csdn,
    title: 'CSDN',
    icon: 'fa6-solid:c',
    color: '#010409',
  },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  }
}

export default socialSet
