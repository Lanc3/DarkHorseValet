import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
  TextField
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuthWithRedirectTo } from 'src/components/UseAuthWithRedirectTo/UseAuthWithRedirectTo'
const WELCOME_MESSAGE = 'Welcome back!'
const REDIRECT = routes.users()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,

    reauthenticate,
  } = useAuth()
  const { redirectTo, logIn } = useAuthWithRedirectTo()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )
  console.log('her', isAuthenticated)
  // should redirect right after login or wait to show the webAuthn prompts?
  const { search } = useLocation()
  useEffect(() => {
    if (isAuthenticated) {
      if (/redirectTo/.test(search)) {
        const newPath = search.split('=').slice(-1).join()
        navigate(newPath)
      } else {
        navigate(routes.home())
      }
    }
  }, [isAuthenticated])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated])

  // focus on the username field as soon as the page loads
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current && usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      toast.success('test')
      navigate(routes.users())
    }
  }

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error(
          'Device not found, log in with username/password to continue'
        )

        setShowWebAuthn(false)
      } else {
        toast.error(e.message)
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      toast.success(WELCOME_MESSAGE)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE)
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="rw-webauthn-wrapper">
        <h2>WebAuthn Login Enabled</h2>
        <p>Log in with your fingerprint, face or PIN</p>
        <div className="rw-button-group">
          <button className="rw-button rw-button-blue" onClick={onAuthenticate}>
            Open Authenticator
          </button>
        </div>
      </div>
    )
  }

  const RegisterWebAuthnPrompt = () => (
    <div className="rw-webauthn-wrapper">
      <h2>No more passwords!</h2>
      <p>
        Depending on your device you can log in with your fingerprint, face or
        PIN next time.
      </p>
      <div className="rw-button-group">
        <button className="rw-button rw-button-blue" onClick={onRegister}>
          Turn On
        </button>
        <button className="rw-button" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  )

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} className="rw-form-wrapper ">
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
        autoFocus
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
        errorClassName="rw-label rw-label-error"
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

      <div className="rw-forgot-link">
        <Link to={routes.forgotPassword()} className="rw-forgot-link">
          Forgot Password?
        </Link>
      </div>

      <FieldError name="password" className="rw-field-error" />

      <div className="rw-button-group">
        <Submit className="rw-button  bg-[#EC608F] text-[#1F1F22]">
          Login
        </Submit>
      </div>
    </Form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />
      } else {
        return <RegisterWebAuthnPrompt />
      }
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="rw-login-link">
            <span>or login with </span>{' '}
            <a href="?type=password" className="rw-link">
              username and password
            </a>
          </div>
        )
      }
    } else {
      return (
        <div className="rw-login-link">
          <span>Don&apos;t have an account?</span>{' '}
          <Link to={routes.signup()} className="rw-link">
            Sign up!
          </Link>
        </div>
      )
    }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <MetaTags title="Login" />
      <div className="flex justify-center">
        <div className="m-10 flex w-full justify-center rounded-3xl bg-[#1F1F22] p-20">
          <main className="rw-main ">
            <Toaster
              toastOptions={{
                className: 'rw-toast bg-[#27292A]',
                duration: 6000,
              }}
            />
            <div className="rw-scaffold rw-login-container bg-[#27292A]">
              <div className="rw-segment bg-[#27292A]">
                <header className="rw-segment-header bg-[#27292A]">
                  <h2 className="rw-heading rw-heading-secondary flex justify-center text-[#EC608F]">
                    Login
                  </h2>
                </header>

                <div className="rw-segment-main bg-[#27292A]">
                  <div className="rw-form-wrapper bg-[#27292A]">
                    {formToRender()}
                  </div>
                  {linkToRender()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default LoginPage
