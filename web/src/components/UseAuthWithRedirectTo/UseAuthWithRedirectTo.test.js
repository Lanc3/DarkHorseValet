import { render } from '@redwoodjs/testing/web'

import UseAuthWithRedirectTo from './UseAuthWithRedirectTo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UseAuthWithRedirectTo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UseAuthWithRedirectTo />)
    }).not.toThrow()
  })
})
