'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem { label: string; icon: string; href: string }

export default function BottomNav({ items, role }: { items: NavItem[]; role: string }) {
  const path = usePathname()
  return (
    <nav className="bottom-nav">
      <div className="flex">
        {items.map(({ label, icon, href }) => {
          const active = path === href || (href !== `/${role}` && path.startsWith(href))
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center py-2 gap-0.5 text-center no-underline">
              <span className="text-xl">{icon}</span>
              <span className={`text-xs font-medium ${active ? 'text-lloyds-green' : 'text-lloyds-grey-dark'}`}>
                {label}
              </span>
              {active && <span className="w-4 h-0.5 rounded-full bg-lloyds-green mt-0.5" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
