import React, { ChangeEvent, useState } from 'react'
import { StringDecoder } from 'string_decoder'
import styles from './timer.scss'

const timeRemaining = {
  seconds: '00',
  minutes: '00',
}

export const Timer = () => {
  const [time, setTime] = useState(timeRemaining)
    const [timeInput, setTimeInput] = useState<number>()
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e)
      setTimeInput(+e.target.value)
    }
  return (
    <div className={styles.timer}>
      <span>
        <input type="number" placeholder="(Min)" onChange={(e) => handleChange(e)}/>
        <button>Start</button>
      </span>
      <span>More than halfway there!</span>

      <span>
        {time.minutes} : {time.seconds}
      </span>
    </div>
  )
}
