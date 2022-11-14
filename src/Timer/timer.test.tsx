import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Timer from './Timer'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

const user = userEvent.setup({ delay: null })

let component

const setup = () => {
  const utils = render(<Timer />)
  const input = utils.getByLabelText('timer-input') as HTMLInputElement
  const button = utils.getByLabelText('timer-start') as HTMLInputElement
  const timerDisplay = utils.getByLabelText('timer-display') as HTMLInputElement
  const pauseButton = utils.getByLabelText('pause-button') as HTMLElement
  const doubleSpeedButton = utils.getByLabelText(
    'double-speed-button'
  ) as HTMLButtonElement
  const singleSpeedButton = utils.getByLabelText(
    'single-speed-button'
  ) as HTMLButtonElement
  const oneAndOneHalfSpeed = utils.getByLabelText(
    'one-and-half-speed'
  ) as HTMLButtonElement

  return {
    input,
    button,
    timerDisplay,
    pauseButton,
    doubleSpeedButton,
    oneAndOneHalfSpeed,
    singleSpeedButton,
    ...utils,
  }
}

//Test if component renders
it('renders without crashing', () => {
  setup()
})

it('Input for timer accepts input change', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('23')
})

it('Input for timer accepts only numbers', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'adfs' } })
  expect(input.value).toBe('0')
})

it('Timer takes input and sets time', () => {
  const { input, button, timerDisplay, debug } = setup()
  fireEvent.change(input, { target: { value: 10 } })

  user.click(button)
  expect(timerDisplay.textContent).toBe('10:00')
})

it('Timer takes input and decrements time', async () => {
  const { input, button, timerDisplay, debug } = setup()
  fireEvent.change(input, { target: { value: 10 } })

  user.click(button)

  await waitFor(() => expect(timerDisplay.textContent).toBe('9:59'), {
    timeout: 2000,
  })
})

// it('Should pause timer', async () => {
//   const { input, button, timerDisplay, pauseButton } = setup()
//   fireEvent.change(input, { target: { value: 5 } })
//   fireEvent.click(pauseButton)

//   user.click(button)
//   jest.advanceTimersByTime(5000)
//  expect(timerDisplay.textContent).toBe('4:56')
// })

it('Should increase timer speed by double', async () => {
  const { input, button, timerDisplay, pauseButton, doubleSpeedButton } =
    setup()
  fireEvent.change(input, { target: { value: 5 } })
  fireEvent.click(doubleSpeedButton)
  fireEvent.click(button)

  await waitFor(
    () => {
      expect(timerDisplay.textContent).toBe('3:00')
    },
    {
      timeout: 61000,
    }
  )
})

it('Should increase timer speed by 1.5x', async () => {
  const {
    input,
    button,
    timerDisplay,
    pauseButton,
    doubleSpeedButton,
    oneAndOneHalfSpeed,
  } = setup()

  fireEvent.change(input, { target: { value: 5 } })
  fireEvent.click(oneAndOneHalfSpeed)
  fireEvent.click(button)

  await waitFor(
    () => {
      expect(timerDisplay.textContent).toBe('3:30')
    },
    {
      timeout: 60000,
    }
  )
})

it('Should increase timer speed to 1x', async () => {
  const {
    input,
    button,
    timerDisplay,
    pauseButton,
    doubleSpeedButton,
    oneAndOneHalfSpeed,
    singleSpeedButton,
  } = setup()

  fireEvent.change(input, { target: { value: 5 } })
  fireEvent.click(singleSpeedButton)
  fireEvent.click(button)

  await waitFor(
    () => {
      expect(timerDisplay.textContent).toBe('4:00')
    },
    {
      timeout: 61000,
    }
  )
})

it('Timer should have the correct text', () => {
  render(<Timer />)
  expect(screen.getByText('Countdown:')).toBeInTheDocument()
  expect(screen.getByText('Start')).toBeInTheDocument()
  expect(screen.getByText('More than halfway there!')).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '(Min)')
})
