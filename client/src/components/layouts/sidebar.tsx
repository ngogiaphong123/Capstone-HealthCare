'use client'
import { Button, buttonVariants } from '@components/ui/button'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { cn } from '@lib/utils'
import { usePathname } from 'next/navigation'

type SidebarItem = {
  title: string
  icon: string
  href: string
}
const sidebarItems: SidebarItem[] = [
  {
    title: 'Profile',
    icon: 'teenyicons:home-outline',
    href: '/profile',
  },
  {
    title: 'Account',
    icon: 'mdi-light:account',
    href: '/account',
  },
]
export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn('bg-white', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-muted',
                  'justify-start w-full text-left',
                )}
              >
                <Icon icon={item.icon} className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
