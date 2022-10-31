import { render} from '@testing-library/react'
import Timer from './Timer'

//Test if component renders
it('renders without crashing', () => {
  render(<Timer />)
})
