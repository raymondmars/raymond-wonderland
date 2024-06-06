
import styles from './page.module.css'

export default function Page() {

  return (
    <div className={styles.tools}>
      <ul>
        <li>
          IELTS
          <ol>
            <li><a href='/tools/ielts/score'>Writing AI examiner scoring</a></li>
            {/* <li>Reading</li>
            <li><a href='/tools/ielts/writing'>Writing</a></li>
            <li>Speaking</li> */}
          </ol>
        </li>
        <li>
          Credit Card
          <ol>
            <li>Validator</li>
            <li><a href='/tools/creditcard/fakenumber'>Fake Number</a></li>
          </ol>
        </li>
        <li>Encode/Decode
          <ol>
            <li>Base64</li>
            <li>URL</li>
          </ol>
        </li>
        <li>Timer</li>
      </ul>
    </div>
  )
}
