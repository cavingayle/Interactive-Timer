import React, { ChangeEvent, useState, useEffect, useCallback } from 'react'
import styles from './timer.scss'

import { AiOutlinePauseCircle } from 'react-icons/ai'

export const Timer = () => {
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer>()
  const [isRunning, setIsRunning] = useState<boolean>()

  const [time, setTime] = useState<number>()
  const [timeInput, setTimeInput] = useState<number>()
  const [timerSpeed, setTimerSpeed] = useState(1000)

  const formatTime = (seconds: number) => {
    return (
      (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds
    )
  }

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = +e.target.value.replace(/\D/g, '')
      setTimeInput(input)
      if (!isRunning) {
        setTime(input * 60)
      }
    },
    [timeInput, time]
  )

  const startTimer = useCallback(() => {
    if (isRunning || !time || time === 0) {
      return
    }

    setIsRunning(true)
    const interval = setInterval(() => {
      setTime((prevInput) => {
        if (prevInput === 1) {
          clearInterval(interval)
          setIsRunning(false)
        }
        return prevInput - 1
      })
    }, timerSpeed)
    setCurrentInterval(interval)
  }, [timeInput, isRunning, time])


  const pauseTimer = () => {
    clearInterval(currentInterval)
    setIsRunning(false)
  }

  const formattedTime = formatTime(time)

  return (
    <div className={styles.timer}>
      <span>
        Countdown:
        <input
          style={{ width: 50 }}
          placeholder="(Min)"
          onChange={handleInputChange}
          min={0}
         
          type="tel"
          max={999}
          value={timeInput}
          maxLength={3}
        />
        <button onClick={startTimer}>Start</button>
      </span>
      <span>More than halfway there!</span>
      <span>{time ? formattedTime : '00:00'}</span>
      <span onClick={pauseTimer}>
        <AiOutlinePauseCircle />
      </span>
      <span>
        <button onClick={() => setTimerSpeed(1000)}>1x</button>
        <button onClick={() => setTimerSpeed(1000 / 1.5)}>1.5</button>
        <button onClick={() => setTimerSpeed(1000 / 2)}>2x</button>
      </span>
    </div>
  )
}
