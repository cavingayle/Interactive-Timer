import React, { ChangeEvent, useState, useCallback } from 'react'
import styles from './timer.scss'
import { debounce, isNil } from 'lodash'

import { AiOutlinePauseCircle } from 'react-icons/ai'

enum TimerSpeed {
  oneSecond = 1000,
  twoThirdsSecond = 1000 / 1.5,
  halfSecond = 1000 / 2,
}

const Timer = () => {
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer>()
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [time, setTime] = useState<number>(0)
  const [timeInput, setTimeInput] = useState<number>(0)
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
    [timeInput, time, timerSpeed]
  )

  const startTimer = useCallback(
    (speed?: number) => {
      if ((isRunning && isNil(speed)) || !time || time === 0) {
        return
      }
     
      setIsRunning(true)
      const interval = setInterval(
        () => {
          setTime((prevInput) => {
            if (prevInput === 1) {
              clearInterval(interval)
              setIsRunning(false)
            }
            return prevInput - 1
          })
        },
        speed ? speed : timerSpeed
      )
      setCurrentInterval(interval)
    },
    [isRunning, time, timerSpeed]
  )


  const debouncedStartTimer = useCallback(debounce(startTimer, 300), [
    timerSpeed,
    timeInput,
    isRunning
  ])

  const pauseTimer = () => {
    clearInterval(currentInterval)
    setIsRunning(false)
  }

  const resetTimer = () => {
    pauseTimer()
    setTimeInput(0)
    setTime(0)
  }

  const changeTimerSpeedWhileRunning = (speed: TimerSpeed) => {
    pauseTimer()
    startTimer(speed)
  }

  const formattedTime = formatTime(time)

  const timerCopy = {
    countDown: 'Countdown:',
    start: 'Start',
    reset: 'Reset',
    tagLine: 'More than halfway there!',
    oneSpeed: '1x',
    doubleSpeed: '2x',
    oneAndHalfSpeed: '1.5',
  }

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <span className={styles['timer-input-container']}>
          <strong>{timerCopy.countDown}</strong>
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
          <button
            className={styles['start-button']}
            onClick={() => debouncedStartTimer()}
            aria-label="timer-start"
          >
            {timerCopy.start}
          </button>
          <button
            className={styles['reset-button']}
            onClick={() => resetTimer()}
            aria-label="timer-start"
          >
            {timerCopy.reset}
          </button>
        </span>
        <span className={styles.tagline}>{timerCopy.tagLine}</span>
        <div className={styles.center}>
          {' '}
          <span className={styles['time-display']} aria-label="timer-display">
            {time ? formattedTime : '00:00'}
          </span>
          <span aria-label="pause-button" onClick={pauseTimer}>
            <AiOutlinePauseCircle size={40} />
          </span>
        </div>

        <span className={styles['timer-input-container']}>
          <button
            aria-label="single-speed-button"
            className={
              timerSpeed === TimerSpeed.oneSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => {
              setTimerSpeed(TimerSpeed.oneSecond)
              if (isRunning) {
                changeTimerSpeedWhileRunning(TimerSpeed.oneSecond)
              }
            }}
          >
            {timerCopy.oneSpeed}
          </button>
          <button
            aria-label="one-and-half-speed"
            className={
              timerSpeed === TimerSpeed.twoThirdsSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => {
              setTimerSpeed(TimerSpeed.twoThirdsSecond)
              if (isRunning) {
                changeTimerSpeedWhileRunning(TimerSpeed.twoThirdsSecond)
              }
            }}
          >
            {timerCopy.oneAndHalfSpeed}
          </button>
          <button
            aria-label="double-speed-button"
            className={
              timerSpeed === TimerSpeed.halfSecond
                ? styles['selected-speed-button']
                : styles['speed-button']
            }
            onClick={() => {
              setTimerSpeed(TimerSpeed.halfSecond)
              if (isRunning) {
                changeTimerSpeedWhileRunning(TimerSpeed.halfSecond)
              }
            }}
          >
            {timerCopy.doubleSpeed}
          </button>
        </span>
      </div>
    </div>
  )
}

export default Timer
