import Link from 'next/link'
import styles from './index.module.css'

export default function Insights() {

  return (
    <div className={styles.postlist}>
      <ul><h3>2024-06</h3>
        <li>
          <Link href="/insights/2024/06/ielts-writing-tips">Tips for IELTS Writing</Link>
        </li>
      </ul>
    </div>
  )
}
