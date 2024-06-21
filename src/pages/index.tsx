import Link from "next/link"
import styles from "./index.module.css"

export default function Home() {

  return (
    <main className={styles.main}>
      <div>
        <p className={`${styles.head}`}>Hello, I'm raymond.</p>
        <p>I'm a software engineer and a father. </p>
        {/* <p>I live in <a href="https://en.wikipedia.org/wiki/Chengdu">Chengdu</a> which is a city in the southwest of China.</p> */}
        {/* <p>Chengdu is the capital of Sichuan and is the hometown of giant panda.</p> */}
        <p>Welcome to my wonderland, in this place, I will share all of the creative <Link href="/insights">insights</Link> from my daily life.</p>
      </div>
    </main>
  )
}
