import { useEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
  TextField
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
      <div className="flex justify-center">
        <div className="m-10 flex w-full justify-center rounded-3xl bg-[#1F1F22] p-20">
          <main className="rw-main ">
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <div className="rw-scaffold rw-login-container bg-[#27292A]">
              <div className="rw-segment bg-[#27292A]">
                <header className="rw-segment-header bg-[#27292A]">
                  <h2 className="rw-heading rw-heading-secondary flex justify-center text-[#EC608F]">
                    Signup
                  </h2>
                </header>

                <div className="rw-segment-main bg-[#27292A]">
                  <div className="rw-form-wrapper">
                    <Form onSubmit={onSubmit} className="rw-form-wrapper">
                      <Label
                        name="username"
                        className="rw-label text-[#EC608F]"
                        errorClassName="rw-label rw-label-error"
                      >
                        Username
                      </Label>
                      <TextField
                        name="username"
                        className="rw-input"
                        errorClassName="rw-input rw-input-error"
                        ref={usernameRef}
                        validation={{
                          required: {
                            value: true,
                            message: 'Username is required',
                          },
                        }}
                      />

                      <FieldError name="username" className="rw-field-error" />

                      <Label
                        name="password"
                        className="rw-label text-[#EC608F]"
                        errorClassName="rw-label rw-label-error "
                      >
                        Password
                      </Label>
                      <PasswordField
                        name="password"
                        className="rw-input"
                        errorClassName="rw-input rw-input-error"
                        autoComplete="current-password"
                        validation={{
                          required: {
                            value: true,
                            message: 'Password is required',
                          },
                        }}
                      />

                      <FieldError name="password" className="rw-field-error" />

                      <div className="rw-button-group ">
                        <Submit className="rw-button bg-[#EC608F] text-[#1F1F22]">
                          Sign Up
                        </Submit>
                      </div>
                    </Form>
                    <div className="rw-login-link">
                      <span>Already have an account?</span>{' '}
                      <Link to={routes.login()} className="rw-link">
                        Log in!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default SignupPage
