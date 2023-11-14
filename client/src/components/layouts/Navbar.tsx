'use client'
import { AppDispatch, useAppSelector } from '@redux/store'
import { Button } from '@components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { isEmpty } from '@lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDispatch } from 'react-redux'
import { redirect, useRouter } from 'next/navigation'
import { logout } from '@/redux/slices/user.slice'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function Navbar() {
  const user = useAppSelector(state => state.user.user)
  const loading = useAppSelector(state => state.user.loading)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { toast } = useToast()
  const onLogout = async () => {
    try {
      await dispatch(logout())
      toast({
        title: 'Logout success',
        description: 'You have logged out successfully',
      })
      router.push('/')
    } catch (error: any) {
      toast({
        title: 'Logout error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0 z-40">
      <div className="text-2xl color-[#2E3D8D]">BK Healthcare</div>
      {loading ? (
        <Avatar>
          <Skeleton className="w-[100px] rounded-full" />
        </Avatar>
      ) : !isEmpty(user) ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {' '}
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/account'}>
              <DropdownMenuItem>Account</DropdownMenuItem>
            </Link>
            <Link href={'/profile'}>
              <DropdownMenuItem>Health profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={'/login'}>
          {' '}
          <Button variant={'outline'}>Consult now</Button>
        </Link>
      )}
    </div>
  )
}
