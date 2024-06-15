import Head from 'next/head'
import { ReactElement, ComponentType } from 'react'

interface Metadata {
  title: string;
  description: string;
}

export function withMetadata(metadata: Metadata) {
  return function (Component: ComponentType<any>) {
    const WithMetadata = function (props: any): ReactElement {
      return (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
          </Head>
          <Component {...props} />
        </>
      );
    }

    WithMetadata.displayName = `WithMetadata(${getDisplayName(Component)})`;

    return WithMetadata;
  }
}

function getDisplayName(Component: ComponentType<any>) {
  return Component.displayName || Component.name || 'Component';
}
