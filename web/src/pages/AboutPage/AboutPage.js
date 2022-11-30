import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="m-10 flex w-full justify-center rounded-3xl bg-[#1F2122] p-20">
          <MetaTags title="About" description="About page" />

          <h1>AboutPage</h1>
          <p>
            Find me in <code>./web/src/pages/AboutPage/AboutPage.js</code>
          </p>
          <p>
            <Link to={routes.home()}>Return home</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutPage
