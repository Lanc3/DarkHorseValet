import { render } from '@redwoodjs/testing/web'

import BookingPage from './BookingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BookingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookingPage />)
    }).not.toThrow()
  })
})
