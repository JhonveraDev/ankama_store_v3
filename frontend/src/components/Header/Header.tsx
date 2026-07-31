import { ChevronDown, CircleUserRound, ExternalLink, Globe2, History, LogOut, Menu, Search, ShoppingBasket, UserRound } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { navigationItems } from '../../features/navigation/navigation-items'
import { getNavigationPath } from '../../features/navigation/navigation-routes'
import { useAuth } from '../../features/auth/hooks/use-auth'
import { useCart } from '../../features/cart/hooks/use-cart'

export function Header() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(() => location.pathname === '/buscar' ? (searchParams.get('q') ?? '') : '')
  const navigationRef = useRef<HTMLElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchTerm = location.pathname === '/buscar' ? (searchParams.get('q') ?? '') : ''
  const { totalQuantity } = useCart()
  const { isLoading, logout, user } = useAuth()

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

  useEffect(() => {
    const syncSearchInput = window.setTimeout(() => setSearchInput(searchTerm), 0)
    return () => window.clearTimeout(syncSearchInput)
  }, [searchTerm])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchInput.trim()
    navigate(query ? `/buscar?q=${encodeURIComponent(query)}` : '/')
  }

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (!navigationRef.current?.contains(target)) setOpenMenu(null)
      if (!userMenuRef.current?.contains(target)) setIsUserMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      cancelClose()
    }
  }, [])

  const closeUserMenuAndNavigate = (path: string) => {
    setIsUserMenuOpen(false)
    navigate(path)
  }

  const handleLogout = () => {
    setIsUserMenuOpen(false)
    logout()
    navigate('/')
  }

  return <header className="site-header">
    <div className="topbar">
      <a className="brand" href="/" aria-label="Arcadia Store, inicio"><span>arcadia</span><strong>store</strong></a>
      <form className="search-box" onSubmit={handleSearchSubmit}>
        <label className="sr-only" htmlFor="product-search">Buscar productos</label>
        <input id="product-search" minLength={3} onChange={(event) => setSearchInput(event.target.value)} placeholder="Buscar productos" type="search" value={searchInput} />
        <button className="search-submit" type="submit" aria-label="Buscar productos"><Search aria-hidden="true" size={20} /></button>
      </form>
      <div className="header-actions">
        <Link className="icon-button cart-header-button" to="/cart" aria-label="Abrir carrito"><ShoppingBasket size={22} />{totalQuantity > 0 && <span>{totalQuantity}</span>}</Link>
        {!isLoading && (user ? <div className="user-menu" ref={userMenuRef}>
          <button aria-controls="user-dropdown" aria-expanded={isUserMenuOpen} className="user-panel-trigger" onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)} type="button">
            <span className="user-panel-name">{user.username}</span><span className="user-balance">0 <b>G</b></span><img alt="" className="user-avatar" src="/media/general/default_avatar.png" /><ChevronDown aria-hidden="true" className={isUserMenuOpen ? 'is-open' : undefined} size={16} />
          </button>
          <div aria-hidden={!isUserMenuOpen} className={`user-dropdown${isUserMenuOpen ? ' is-open' : ''}`} id="user-dropdown">
            <button onClick={() => closeUserMenuAndNavigate('/account')} type="button"><UserRound aria-hidden="true" size={19} /><span>Account Management</span></button>
            <button onClick={() => closeUserMenuAndNavigate('/orders')} type="button"><History aria-hidden="true" size={19} /><span>Order History</span></button>
            <button className="user-dropdown-logout" onClick={handleLogout} type="button"><LogOut aria-hidden="true" size={19} /><span>Log Out</span></button>
          </div>
        </div> : <div className="guest-actions"><Link className="account-button" to="/login"><CircleUserRound size={21} /><span>Log In</span></Link><Link className="register-button" to="/register">Register</Link></div>)}
        <button className="language-button" type="button" aria-label="Idioma: inglés"><img alt="English" src="/media/general/en_flag.jpg" /><Globe2 aria-hidden="true" size={14} /></button>
        <button className="mobile-menu-button" type="button" aria-label="Abrir menú"><Menu size={24} /></button>
      </div>
    </div>
    <nav className="category-nav" aria-label="Categorías principales" ref={navigationRef}>
      <div className="category-nav-items">
        {navigationItems.map((item) => {
          const isOpen = openMenu === item.label
          const menuId = `category-menu-${item.label.toLowerCase().replaceAll(' ', '-')}`
          return <div className="category-menu" key={item.label} onMouseEnter={() => openCategoryMenu(item.label)} onMouseLeave={scheduleClose}>
            <button aria-controls={menuId} aria-expanded={isOpen} className="category-nav-item" onFocus={() => openCategoryMenu(item.label)} type="button"><img src={item.logoUrl} alt="" /><span>{item.label}</span><ChevronDown aria-hidden="true" className={isOpen ? 'is-open' : undefined} size={14} strokeWidth={2.3} /></button>
            <div aria-hidden={!isOpen} className={`category-dropdown${isOpen ? ' is-open' : ''}`} id={menuId}><Link onClick={() => setOpenMenu(null)} to={getNavigationPath(item)}>Ver todo</Link>{item.categories.map((category, index) => <Link className={index === 0 ? 'is-highlighted' : undefined} key={category} onClick={() => setOpenMenu(null)} to={getNavigationPath(item, category)}>{category}</Link>)}</div>
          </div>
        })}
      </div>
      <a className="merchandising-link" href="https://github.com/JhonveraDev" rel="noreferrer" target="_blank"><span>Github</span><ExternalLink aria-hidden="true" size={21} /></a>
    </nav>
  </header>
}
