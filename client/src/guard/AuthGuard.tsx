'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@redux/store'
import { getMe } from '@/redux/slices/user.slice'
import Spinner from '@components/layouts/spinner'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useAppSelector(state => state.user.loading)
  useEffect(() => {
    dispatch(getMe())
      .then(result => {
        if (result.meta.requestStatus === 'rejected') {
          throw new Error(result.payload)
        }
      })
      .catch(err => {})
  }, [])

  return !loading ? (
    <>{children}</>
  ) : (
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <Spinner />
    </div>
  )
}
