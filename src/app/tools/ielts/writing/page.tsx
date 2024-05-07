'use client'

import { useState } from 'react';
import styles from "./page.module.css";

import Timer from '../../../components/Timer';

export default function Page() {
  const [count, setCount] = useState<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value.trim();
    if(content === '') {
      setCount(0);
      return;
    }
    const words = content.split(' ');
    // console.log('words:', words);
    setCount(words.length);
  }

  return (
    <div>
      <div className={styles.label}>
        <span>IELTS Writing Exercise</span>
        <Timer  hideStartButton={false} />
      </div>
      <div>
        <textarea
          className={styles.content}
          onInput={handleInput}
          data-gramm="false"
          placeholder="Please input your content here...">

        </textarea>
      </div>
      <div className={styles.label}>
        <span>Word count: {count}</span>
      </div>
    </div>
  )
}
