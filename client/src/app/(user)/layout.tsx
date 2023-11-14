'use client'
import Sidebar from '@components/layouts/sidebar'
import { useAppSelector } from '@redux/store'
import { isEmpty } from '@lib/utils'
import { redirect } from 'next/navigation'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAppSelector(state => state.user.user)
  if (isEmpty(user)) {
    redirect('/login')
  }
  return (
    <section className="flex flex-1">
      <Sidebar className={'w-1/6'} />
      <div className="w-5/6 bg-gray-100">{children}</div>
    </section>
  )
}
