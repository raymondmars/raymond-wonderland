// import Image from "next/image";
import { Libre_Barcode_128_Text } from "next/font/google";
import styles from "./page.module.css";


const barcode = Libre_Barcode_128_Text({ subsets: ["latin"], weight: '400' });

export default function Home() {

  return (
    <main className={styles.main}>
      
      <div>
        <p className={`${barcode.className} ${styles.head}`}>Hello, I'm raymond.</p>
        <p>I'm a software engineer and a father. </p>
        <p>I live in <a href="https://en.wikipedia.org/wiki/Chengdu">Chengdu</a> which is a city in the southwest of China.</p>
        {/* <p>Chengdu is the capital of Sichuan and is the hometown of giant panda.</p> */}
        <p>Welcome to my wonderland, in this place, I will share all of the creative insights from my daily life.</p>
      </div>
    </main>
  );
}
