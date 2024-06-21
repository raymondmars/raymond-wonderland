import Link from 'next/link'
import styles from './index.module.css'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin']})

export default function Insights() {

  return (
    <div className={styles.postlist}>
      <ul><h3 className={raleway.className}>2024-06</h3>
        <li>
          <Link href="/insights/2024/06/ielts-writing-tips">Tips for IELTS Writing</Link>
        </li>
      </ul>
    </div>
  )
}
