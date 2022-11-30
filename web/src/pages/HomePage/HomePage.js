import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <div className="m-10 flex w-full justify-center rounded-3xl bg-[#1F2122] p-20">
        <MetaTags title="Home" description="Home page" />

        <h1>HomePage</h1>
        <p>
          Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
        </p>
        <p>
          My default route is named <code>home</code>, link to me with `
          <Link to={routes.home()}>Home</Link>`
        </p>
      </div>
    </div>
  )
}

export default HomePage
