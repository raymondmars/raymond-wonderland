'use client'

import { useState } from "react";
import styles from './index.module.css';

export default function Timer({ hideStartButton = false, label = 'START' }) {
  const [timeFormat, setTimeFormat] = useState<string>('00:00:00');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [needHideStartButton, setNeedHideStartButton] = useState<boolean>(false);

  const handleTimeStart = () => {
    setIsRunning(true);
    setNeedHideStartButton(hideStartButton);
    let index = 0;
    const interval = setInterval(() => {
      index = index + 1;
      const time = new Date(index * 1000).toISOString().substr(11, 8);
      setTimeFormat(time);
    }, 1000);
    return () => clearInterval(interval);
  }
  return (
    <div className={styles.timer}>
      <ul>
        <li>
          { needHideStartButton ? null : <button disabled={isRunning} onClick={handleTimeStart}>{label}</button> }
        </li>
        <li>{timeFormat}</li>
        {/* <li><button>pause</button></li> */}
        {/* <li><button>pause</button></li> */}
      </ul>
    </div>
  )
}
