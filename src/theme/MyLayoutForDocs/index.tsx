import React from 'react'
import clsx from 'clsx'
import type { Props } from '@theme/Layout'

import styles from '../MyLayout/styles.module.scss'

export default function MyLayoutForDocs({
  children,
  maxWidth,
}: Props & { maxWidth?: number }): JSX.Element {
  return (
      <div className={styles.containerWrapper}>
        <div
          className={clsx(styles.myContainer, 'margin-vert--lg')}
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}
        >
          <main>{children}</main>
        </div>
      </div>
  )
}
