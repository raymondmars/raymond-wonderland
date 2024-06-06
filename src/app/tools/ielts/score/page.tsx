'use client'

import { useEffect, useState } from "react"

import styles from "./page.module.css"
import { scoreWritingWithStream } from "@/app/apis/ielts"

export default function Page() {
  const MAX_IMAGE_SIZE = 400 // KB
  const MAX_WORDS = 500
  const [essayType, setEssayType] = useState(1)
  const [essayTopic, setEssayTopic] = useState<string>('')
  const [task1Image, setTask1Image] = useState<string>('')
  const [contents, setContents] = useState<string>('')

  const [imageFileKey, setImageFileKey] = useState<string>(Date.now().toString())

  const [disableScoreButton, setDisableScoreButton] = useState<boolean>(true)
  const [imageSizeError, setImageSizeError] = useState<boolean>(false)
  const [wordCount, setWordCount] = useState<number>(0)
  const [scoreRespone, setScoreRespone] = useState<string>('')

  useEffect(() => {
    checkScoreButton()
  }, [essayType, essayTopic, task1Image, contents])

  const clearForm = () => {
    setEssayType(1)
    setEssayTopic('')
    setTask1Image('')
    setContents('')
    setWordCount(0)
    setDisableScoreButton(true)
    setImageSizeError(false)
    setImageFileKey(Date.now().toString())
  }

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
    if (essayType === 1 && essayTopic.trim() !== '' && task1Image !== '' && contents.trim() !== '') {
      return false
    } else if (essayType === 2 && essayTopic.trim() !== '' && contents !== '') {
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
    if(wordCount > MAX_WORDS) {
      alert(`Only accept a maximum of ${MAX_WORDS} words, please check it again.`)
      return
    }

    setDisableScoreButton(true)
    setScoreRespone('Wait for scoring...')
    let wholeContents = ''
    scoreWritingWithStream({essayType, topic: essayTopic,  contents, task1Image, onData: (data) => {
      if(data.indexOf('\n') >= 0) {
        data = data.replace(/\n/g, '<br/>')
      }
      wholeContents = wholeContents + data
      setScoreRespone(wholeContents)
    }, onEnd: () => {
      clearForm()
    }})
  }

  return (
    <div className={styles.ieltsWritingScore}>
      <h3>IELTS writing AI examiner scoring</h3>
      <div>
      <form>
        <div className={styles.row}>
          <div className={styles.label}>Essay Type</div>
          <div className={styles.control}>
            <select onChange={handleEssayTypeChange} value={essayType}>
              <option value="1">Task 1</option>
              <option value="2">Task 2</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Essay Topic</div>
          <div className={styles.control}>
            <textarea className={styles.topic} onChange={(e) => setEssayTopic(e.target.value)} value={essayTopic}></textarea>
          </div>
        </div>
        {
          essayType === 1 && (
            <div className={styles.row}>
              <div className={styles.label}>Task 1 Image</div>
              <div className={styles.control}>
                <input type="file" accept="image/*" onChange={handleFileUpload} key={imageFileKey} />
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
              className={styles.essayContents}
              value={contents}
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
      { scoreRespone !== '' && <div className={styles.scoreResult}>
        <label>Score result:</label>
        <div className={styles.innerContent} dangerouslySetInnerHTML={{ __html: scoreRespone }}></div>
      </div>}
      </div>
    </div>
  )
}
