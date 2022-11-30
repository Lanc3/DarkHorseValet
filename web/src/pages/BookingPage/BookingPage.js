import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const BookingPage = () => {
  return (
    <>
      <MetaTags title="Booking" description="Booking page" />

      <h1>BookingPage</h1>
      <p>
        Find me in <code>./web/src/pages/BookingPage/BookingPage.js</code>
      </p>
      <p>
        My default route is named <code>booking</code>, link to me with `
        <Link to={routes.booking()}>Booking</Link>`
      </p>
    </>
  )
}

export default BookingPage
