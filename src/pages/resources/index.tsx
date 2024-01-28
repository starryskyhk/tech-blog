import React, { useState } from 'react'
import clsx from 'clsx'
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import ResourceCard from './_components/ResourceCard'
import BackToTopButton from '@theme/BackToTopButton'
import { resources } from '@site/data/resources'
import styles from './resource.module.css'
import Menus from "@site/src/pages/resources/_components/Menus";

function extractDatas(items) {
  return items.flatMap(item => item.resources? item : extractDatas(item.items));
}

//Done
function CategoryList() {
  const flatItems= extractDatas(resources);
  return (
    <div className={styles.category}>
      {flatItems.map(item => (
        <div key={item.name}>
          <div className={styles.cateHeader}>
            <h2 id={item.name} className="anchor">
              {item.name}
              <a className="hash-link" href={`#${item.name}`} title={item.name}></a>
            </h2>
          </div>
          <section>
            <ul className={styles.resourceList}>
              {item.resources.map(resource => (

                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </ul>
          </section>
        </div>
      ))}
    </div>
  )
}

export default function Resources() {
  const title = '网址导航'
  const description = '整合日常开发常用，推荐的网站导航页'

  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagsListPage)}
    >
      <PageMetadata title={title} description={description} />
      <Layout>
        <div className="container margin-top--md">
          <div className="row">
            <aside className={clsx('col col--3')}>
              <Menus/>
            </aside>
            <main className="col col--8">
              <CategoryList />
            </main>
          </div>
        </div>
        <BackToTopButton />
      </Layout>
    </HtmlClassNameProvider>
  )
}
