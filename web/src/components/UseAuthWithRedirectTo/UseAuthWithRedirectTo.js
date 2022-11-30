import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useLocation } from '@redwoodjs/router'

export const useAuthWithRedirectTo = () => {
  const { search } = useLocation()
  const { isAuthenticated, ...rest } = useAuth()

  const hasRedirectTo = /redirectTo/.test(search)
  const redirectTo = search
    .replace('?redirectTo=', '')
    .replace(/&\S+=\S[&^]/g, '') // get rid of any other query params

  useEffect(() => {
    if (isAuthenticated) {
      if (hasRedirectTo) {
        navigate(redirectTo)
      } else {
        navigate(routes.home())
      }
    }
  }, [isAuthenticated, hasRedirectTo, redirectTo, search])
  return { ...rest, isAuthenticated, redirectTo }
}
