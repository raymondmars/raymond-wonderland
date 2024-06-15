import type { AppProps } from 'next/app'

import Layout from '@/app/page_layout';
import { withMetadata } from '@/app/components/Utils';
import Head from 'next/head';

export const metadata = {
  title: "Raymond's Wonderland",
  description: "Raymond's Wonderland, all kinds of creative insights from Raymond.",
}

function HomeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withMetadata(metadata)(HomeApp)
