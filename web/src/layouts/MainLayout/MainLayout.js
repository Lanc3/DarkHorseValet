import { Link, routes } from '@redwoodjs/router'

import logo from './Logo.png'
const MainLayout = ({ children }) => {
  return (
    <>
      <header className="flex w-full min-w-full bg-[#1F1F22] sm:py-4">
        <div className="w-full sm:px-12">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-[#EC608F] opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
            <div className="items-top relative flex justify-start space-x-6 rounded-lg bg-[#1F1F22] leading-none ring-1 ring-gray-900/5">
              <div className="space-y-2">
                <nav className="grid w-full grid-cols-5 gap-4">
                  <Link to={routes.home()}>
                    <img className="pb-10" src={logo} alt="Logo" />
                  </Link>
                  <div className="mt-16 flex justify-center ">
                    <Link
                      className="mr-10 max-h-10 rounded-lg border-2 border-transparent font-mono text-3xl font-extrabold text-[#EC608F] hover:border-current"
                      to={routes.home()}
                    >
                      HOME
                    </Link>
                  </div>

                  <div className="mt-16 flex justify-center ">
                    <Link
                      className="mr-10 max-h-10 rounded-lg border-2 border-transparent font-mono text-3xl font-extrabold text-[#EC608F] hover:border-current"
                      to={routes.about()}
                    >
                      ABOUT
                    </Link>
                  </div>
                  <div className="mt-16 flex justify-center ">
                    <Link
                      className="mr-10 max-h-10 rounded-lg border-2 border-transparent font-mono text-3xl font-extrabold text-[#EC608F] hover:border-current"
                      to={routes.signup()}
                    >
                      SIGN-UP
                    </Link>
                  </div>
                  <div className="mt-16 flex justify-center ">
                    <Link
                      className="mr-10 max-h-10 rounded-lg border-2 border-transparent font-mono text-3xl font-extrabold text-[#EC608F] hover:border-current"
                      to={routes.login()}
                    >
                      LOG-IN
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </header>
      <main className="h-screen bg-[#1F1F22] text-white">
        <div className="h-screen rounded-3xl bg-[#27292A] sm:mx-12">
          {children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
