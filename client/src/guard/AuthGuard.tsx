'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { getMe } from '@redux/slices/auth.slice'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getMe())
      .then(result => {
        if (result.meta.requestStatus === 'rejected') {
          throw new Error(result.payload)
        }
      })
      .catch(err => {})
  }, [])

  return <>{children}</>
}
