import { render, fireEvent } from '@testing-library/react'
import Timer from './Timer'


let component
const setup = () => {
  const utils = render(<Timer />)
  const input = utils.getByLabelText('timer-input') as HTMLInputElement
  const button = utils.getByLabelText('timer-start') as HTMLInputElement
  const timerDisplay = utils.getByLabelText('timer-display') as HTMLInputElement
  return {
    input,
    button,
    timerDisplay,
    ...utils,
  }
}

//Test if component renders
it('renders without crashing', () => {
  setup()
})

it('Input for timer accepts input change', () => {
  const { input } = setup()
  fireEvent.change(input, {target: {value: '23'}})
  expect(input.value).toBe('23')
})

it('Input for timer accepts only numbers', () => {
  const { input } = setup()
  fireEvent.change(input, {target: {value: 'adfs'}})
  expect(input.value).toBe('0')
})

it('Timer takes input and starts', () => {
  const { input, button, timerDisplay, debug } = setup()
  fireEvent.change(input, {target: {value: '10'}})

  fireEvent.click(button)
  expect(timerDisplay.textContent).toBe(" 10:00")
})
