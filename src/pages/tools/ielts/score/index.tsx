import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'

import Scoring from '@/app/components/IELTS/Scoring'
import Head from 'next/head'

import styles from './index.module.css'
import Link from 'next/link'

export const metadata = {
  title: "IELTS Writing AI Examiner | Free tool for assessing IELTS essays",
  description: "Improve your IELTS essay score with our IELTS Writing AI Examiner. Receive automated scoring and feedback from ChatGPT AI to understand your writing level and quickly enhance your IELTS writing performance!"
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const language = req.headers['accept-language']

  return {
    props: {
      language,
    },
  }
}
//{ language }: InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  // console.log('language:', language)
  // const firstLang = language?.split(',')[0]
  // if(firstLang === 'zh' || firstLang === 'zh-CN') {
  //   metadata.title = "IELTS Writing AI Examiner | 免费雅思作文评分工具"
  //   metadata.description = "使用我们的 IELTS Writing AI Examiner 提高你的雅思作文分数。通过 ChatGPT AI 自动评分和反馈，了解你的写作水平，快速提升雅思写作成绩！"
  // }
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className={styles.score}>
        <p>Our latest IELTS Writing AI Examiner uses the most advanced ChatGPT AI technology to provide accurate scores for your IELTS essays. With our free IELTS essay scoring tool, you can quickly understand your writing level and find ways to improve your writing score.</p>
        <Scoring />
        <p>Learn more about <Link href="/insights/2024/06/ielts-writing-tips">IELTS writing skills</Link>, Improve your writing skills.</p>
      </div>
    </>
  )
}

export default Page
