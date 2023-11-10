'use client'
import { useAppSelector } from '@redux/store'
import { Button } from '@components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { isEmpty } from '@lib/utils'

export default function Navbar() {
  const user = useAppSelector(state => state.auth.user)
  return (
    <div className="w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0 z-40">
      <div className="text-2xl color-[#2E3D8D]">BK Healthcare</div>
      {!isEmpty(user) ? (
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Button
          onClick={() => {
            window.location.href = '/login'
          }}
        >
          Consult now
        </Button>
      )}
    </div>
  )
}
