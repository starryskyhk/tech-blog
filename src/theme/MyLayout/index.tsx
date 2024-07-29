import { PageMetadata } from '@docusaurus/theme-common'
import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/Layout'
import Layout from '@theme/Layout'

export default function MyLayout({ children, maxWidth, ...layoutProps }: Props & { maxWidth?: number }): JSX.Element {
  return (
    <Layout {...layoutProps}>
      <PageMetadata title={layoutProps.title} description={layoutProps.description} />

      <div className="bg-background">
        <div
          className={cn('mx-auto max-w-4xl px-8', 'margin-vert--lg')}
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}
        >
          <main>{children}</main>
        </div>
      </div>
    </Layout>
  )
}
