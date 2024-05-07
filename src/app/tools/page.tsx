
import styles from './page.module.css'

export default function Page() {

  return (
    <div className={styles.tools}>
      <ul>
        <li>
          IELTS
          <ul>
            <li>Listening</li>
            <li>Reading</li>
            <li><a href='/tools/ielts/writing'>Writing</a></li>
            <li>Speaking</li>
          </ul>
        </li>
        <li>Encode/Decode
          <ul>
            <li>Base64</li>
            <li>URL</li>
          </ul>
        </li>
        <li>Timer</li>
      </ul>
    </div>
  )
}
