import React, { ChangeEvent, useState, useEffect, useCallback } from 'react'
import styles from './timer.scss'

import { AiOutlinePauseCircle } from 'react-icons/ai'

enum TimerSpeed {
  oneSecond = 1000,
  twoThirdsSecond = 1000 / 1.5,
  halfSecond = 1000 / 2,
}

const Timer = () => {
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer>()
  const [isRunning, setIsRunning] = useState<boolean>()

  const [time, setTime] = useState<number>()
  const [timeInput, setTimeInput] = useState<number>()
  const [timerSpeed, setTimerSpeed] = useState<TimerSpeed>(TimerSpeed.oneSecond)

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

  const startTimer = useCallback(
    (timerSpeed: any) => {
      if (!time || time === 0) {
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
    },
    [timeInput, isRunning, time, timerSpeed]
  )

  const pauseTimer = () => {
    clearInterval(currentInterval)
    setIsRunning(false)
  }

  const formattedTime = formatTime(time)

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <span className={styles['timer-input-container']}>
          <strong>Countdown:</strong>
          <input
            className={styles['timer-input']}
            placeholder="(Min)"
            onChange={handleInputChange}
            min={0}
            type="tel"
            max={999}
            value={timeInput}
            maxLength={3}
            aria-label="timer-input"
          />
          <button className={styles['start-button']} onClick={startTimer} aria-label="timer-start">
            Start
          </button>
        </span>
        <span className={styles.tagline}>More than halfway there!</span>
        <div className={styles.center}>
          {' '}
          <span className={styles['time-display']} aria-label="timer-display">
            {' '}
            {time ? formattedTime : '00:00'}
          </span>
          <span onClick={pauseTimer}>
            <AiOutlinePauseCircle size={40} />
          </span>
        </div>

        <span className={styles['timer-input-container']}>
          <button
            className={
              timerSpeed === TimerSpeed.oneSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => setTimerSpeed(TimerSpeed.oneSecond)}
          >
            1x
          </button>
          <button
            className={
              timerSpeed === TimerSpeed.twoThirdsSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => setTimerSpeed(TimerSpeed.twoThirdsSecond)}
          >
            1.5
          </button>
          <button
            className={
              timerSpeed === TimerSpeed.halfSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => setTimerSpeed(TimerSpeed.halfSecond)}
          >
            2x
          </button>
        </span>
      </div>
    </div>
  )
}

export default Timer
