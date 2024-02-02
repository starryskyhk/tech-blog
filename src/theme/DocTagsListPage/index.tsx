import React, { useState } from 'react'
import clsx from 'clsx'
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common'
import TagsListByLetter from '@theme/TagsListByLetter'
import SearchMetadata from '@theme/SearchMetadata'
import type { Props } from '@theme/DocTagsListPage'
import { Icon } from '@iconify/react'

import { TagsListByFlat } from '../TagsListByLetter'
import MyLayoutForDocs from "@site/src/theme/MyLayoutForDocs";

export default function DocTagsListPage({ tags }: Props): JSX.Element {
  const title = translateTagsPageTitle()

  const [type, setType] = useState<'list' | 'grid'>('list')

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.docsPages,
        ThemeClassNames.page.docsTagsListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="doc_tags_list" />
      <MyLayoutForDocs>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1>{title}</h1>
          <span>
              <Icon
                icon="ph:list"
                width="24"
                height="24"
                onClick={() => setType('list')}
                color={type === 'list' ? 'var(--ifm-color-primary)' : '#ccc'}
              />
              <Icon
                icon="ph:grid-four"
                width="24"
                height="24"
                onClick={() => setType('grid')}
                color={type === 'grid' ? 'var(--ifm-color-primary)' : '#ccc'}
              />
          </span>
        </div>
        {type === 'list' && <TagsListByLetter tags={tags} />}
        {type === 'grid' && <TagsListByFlat tags={tags} />}
      </MyLayoutForDocs>
    </HtmlClassNameProvider>
  )
}
