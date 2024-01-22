import React from 'react'
import Layout from '@theme/Layout'

import FriendCard from './_components/FriendCard'
import { Friends } from '@site/data/friends'

import styles from './styles.module.css'
import { motion } from 'framer-motion'

const TITLE = '友链'
const DESCRIPTION = '有很多良友，胜于有很多财富。'
const ADD_FRIEND_URL = 'https://github.com/starryskyhk/tech-blog/edit/main/data/friends.tsx'

function FriendHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <a className="button button--primary" href={ADD_FRIEND_URL} target="_blank" rel="noreferrer">
        🔗 申请友链
      </a>
    </section>
  )
}

function FriendCards() {
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className={styles.friendContainer}>
        <ul className={styles.friendList}>
          {Friends.map(friend => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <motion.main ref={ref} className="margin-vert--md">
        <FriendHeader />
        <FriendCards />
      </motion.main>
    </Layout>
  )
}
