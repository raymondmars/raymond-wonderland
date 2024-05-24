'use client'

import { use, useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const MAX_IMAGE_SIZE = 400 // KB
  const MAX_WORDS = 500 
  const [essayType, setEssayType] = useState(1)
  const [task1Image, setTask1Image] = useState<string>('')
  const [contents, setContents] = useState<string>('')

  const [disableScoreButton, setDisableScoreButton] = useState<boolean>(true)
  const [imageSizeError, setImageSizeError] = useState<boolean>(false)

  const [wordCount, setWordCount] = useState<number>(0)

  useEffect(() => {
    checkScoreButton()
  }, [essayType, task1Image, contents])


  const handleEssayTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEssayType(parseInt(event.target.value))
    setTask1Image('')
    setImageSizeError(false)
  }

  const imageReminder = () => {
    if (imageSizeError) {
      return <label className={styles.error}>The size of added image exceed {MAX_IMAGE_SIZE} KB. please try it again.</label>
    }
    return <label>Only accept images no larger than {MAX_IMAGE_SIZE} KB.</label>
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const fileSize = file.size / 1024; // size in KB
      if (fileSize > MAX_IMAGE_SIZE) {
        setImageSizeError(true)
        setTask1Image('')
      } else {
        setImageSizeError(false)
        const reader = new FileReader()
        reader.onload = (e) => {
          console.log(e.target?.result as string)
          setTask1Image(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleImageChange = () => {
    checkScoreButton()
  }

  const handleContentsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  const shouldDisableScoreButton = () => {
    // console.log(essayType, task1Image, contents)
    if (essayType === 1 && task1Image !== '' && contents !== '') {
      return false
    } else if (essayType === 2 && contents !== '') {
      return false
    } else {
      return true
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value.trim();
    if(content === '') {
      setWordCount(0);
      return;
    }
    const words = content.split(' ');
    setWordCount(words.length);
  }

  const checkScoreButton = () => {
    setDisableScoreButton(shouldDisableScoreButton())
  }

  const handleStartScoreButtonClick = () => {
    if(shouldDisableScoreButton()) {
      return
    }
    if(contents.trim().length > MAX_WORDS) {
      alert(`Only accept a maximum of ${MAX_WORDS} words, please check it again.`)
      return
    }
    console.log('start to score')
  }


  return (
    <div className={styles.ieltsWritingScore}>
      <h3>IELTS writing AI examiner scoring</h3>
      <div>
      <form>
        <div className={styles.row}>
          <div className={styles.label}>Essay Type</div>
          <div className={styles.control}>
            <select onChange={handleEssayTypeChange}>
              <option value="1">Task 1</option>
              <option value="2">Task 2</option>
            </select>
          </div>
        </div>
        {
          essayType === 1 && (
            <div className={styles.row}>
              <div className={styles.label}>Task 1 Image</div>
              <div className={styles.control}>
                <input type="file" accept="image/*" onChange={handleFileUpload}/>
                {imageReminder()}

                { task1Image !== '' &&  <div className={styles.images}><img src={task1Image} alt="Task 1" onError={handleImageChange} onLoad={handleImageChange} /></div> }
              </div>
            </div>
          )
        }
        <div className={styles.row}>
          <div className={styles.label}>Contents</div>
          <div className={styles.control}>
            <label className={styles.wordCount}>Word count: {wordCount}</label>
            <textarea 
              onChange={handleContentsChange} 
              onBlur={() => checkScoreButton()} 
              onInput={handleInput}
              maxLength={MAX_WORDS}
            ></textarea>
            <label>Only accept a maximum of {MAX_WORDS} words.</label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} aria-label="operation"/>
          <div className={styles.control}>
            <button type="button" disabled={disableScoreButton} onClick={handleStartScoreButtonClick}>Start to score</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}
