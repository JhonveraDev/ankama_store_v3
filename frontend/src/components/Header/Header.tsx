import { ChevronDown, CircleUserRound, ExternalLink, Menu, Search, ShoppingBasket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { navigationItems } from '../../features/navigation/navigation-items'

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navigationRef = useRef<HTMLElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const searchTerm = location.pathname === '/buscar' ? (searchParams.get('q') ?? '') : ''

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const openCategoryMenu = (label: string) => {
    cancelClose()
    setOpenMenu(label)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimeoutRef.current = setTimeout(() => setOpenMenu(null), 180)
  }

  const handleSearchChange = (value: string) => {
    const query = value.trim()

    if (!query) {
      navigate('/')
      return
    }

    navigate(`/buscar?q=${encodeURIComponent(query)}`, { replace: true })
  }

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      cancelClose()
    }
  }, [])

  return (
    <header className="site-header">
      <div className="topbar">
        <a className="brand" href="/" aria-label="Arcadia Store, inicio">
          <span>arcadia</span>
          <strong>store</strong>
        </a>

        <label className="search-box">
          <span className="sr-only">Buscar productos</span>
          <Search aria-hidden="true" size={20} />
          <input value={searchTerm} onChange={(event) => handleSearchChange(event.target.value)} placeholder="Buscar productos" type="search" />
        </label>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Abrir carrito"><ShoppingBasket size={22} /></button>
          <button className="account-button" type="button"><CircleUserRound size={22} /><span>Conectarse</span></button>
          <button className="mobile-menu-button" type="button" aria-label="Abrir menú"><Menu size={24} /></button>
        </div>
      </div>

      <nav className="category-nav" aria-label="Categorías principales" ref={navigationRef}>
        <div className="category-nav-items">
          {navigationItems.map((item) => {
            const isOpen = openMenu === item.label
            const menuId = `category-menu-${item.label.toLowerCase().replaceAll(' ', '-')}`

            return (
              <div className="category-menu" key={item.label} onMouseEnter={() => openCategoryMenu(item.label)} onMouseLeave={scheduleClose}>
                <button aria-controls={menuId} aria-expanded={isOpen} className="category-nav-item" onFocus={() => openCategoryMenu(item.label)} type="button">
                  <img src={item.logoUrl} alt="" />
                  <span>{item.label}</span>
                  <ChevronDown aria-hidden="true" className={isOpen ? 'is-open' : undefined} size={14} strokeWidth={2.3} />
                </button>

                <div aria-hidden={!isOpen} className={`category-dropdown${isOpen ? ' is-open' : ''}`} id={menuId}>
                    <a href="#catalogo">Ver todo</a>
                    {item.categories.map((category, index) => (
                      <a className={index === 0 ? 'is-highlighted' : undefined} href="#catalogo" key={category}>{category}</a>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
        <a className="merchandising-link" href="#catalogo"><span>Merchandising</span><ExternalLink aria-hidden="true" size={21} /></a>
      </nav>
    </header>
  )
}
