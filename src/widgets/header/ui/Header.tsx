'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/shared/ui'
import { cn } from '@/shared/lib'
import styles from './Header.module.css'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="RentalCar, на головну">
          Rental<span className={styles.logoAccent}>Car</span>
        </Link>

        <nav>
          <ul className={styles.nav}>
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(styles.link, isActive && styles.active)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
