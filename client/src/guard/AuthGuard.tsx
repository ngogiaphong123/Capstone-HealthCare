'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@redux/store'
import { getMe } from '@redux/slices/auth.slice'
import { isEmpty } from '@lib/utils'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const pathname = usePathname()
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
