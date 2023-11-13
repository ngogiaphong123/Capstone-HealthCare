import Sidebar from '@components/layouts/sidebar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-1">
      <Sidebar className={'w-1/6'} />
      <div className="w-5/6 bg-gray-100">{children}</div>
    </section>
  )
}
