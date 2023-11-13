'use client'
import React, { useEffect } from 'react'
import AuthConfig from '@/config/auth.config'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { getMe } from '@redux/slices/auth.slice'
import { getCookie } from '../lib/utils'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (getCookie(AuthConfig.accessTokenKey)) {
      dispatch(getMe())
        .then(result => {
          console.log(result)
          if (result.meta.requestStatus === 'rejected') {
            throw new Error(result.payload)
          }
        })
        .catch(err => {})
    }
  }, [])

  return <>{children}</>
}
