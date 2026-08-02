import { ChevronDown, CircleUserRound, ExternalLink, History, LogOut, Menu, Search, ShoppingBasket, UserRound } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { navigationItems } from '../../features/navigation/navigation-items'
import { getNavigationPath } from '../../features/navigation/navigation-routes'
import { useAuth } from '../../features/auth/hooks/use-auth'
import { useCart } from '../../features/cart/hooks/use-cart'

type LanguageCode = 'en' | 'es' | 'fr'

const languageNoticeCopy: Record<LanguageCode, { title: string; message: string; dismiss: string }> = {
  en: { title: 'Coming soon', message: 'Store translations will be available in a future update.', dismiss: 'Got it' },
  es: { title: 'Próximamente', message: 'La traducción de la tienda estará disponible en una futura actualización.', dismiss: 'Entendido' },
  fr: { title: 'Bientôt disponible', message: 'Les traductions de la boutique seront disponibles dans une prochaine mise à jour.', dismiss: 'Compris' },
}

export function Header() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isLanguageNoticeOpen, setIsLanguageNoticeOpen] = useState(false)
  const [noticeLanguage, setNoticeLanguage] = useState<LanguageCode>('es')
  const [searchInput, setSearchInput] = useState(() => location.pathname === '/buscar' ? (searchParams.get('q') ?? '') : '')
  const navigationRef = useRef<HTMLElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)
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
      if (!languageMenuRef.current?.contains(target)) setIsLanguageMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setIsMobileMenuOpen(false)
        setIsUserMenuOpen(false)
        setIsLanguageMenuOpen(false)
        setIsLanguageNoticeOpen(false)
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

  const handleLanguageSelection = (language: LanguageCode) => {
    setIsLanguageMenuOpen(false)
    setNoticeLanguage(language)
    setIsLanguageNoticeOpen(true)
  }

  const noticeCopy = languageNoticeCopy[noticeLanguage]

  return <header className="site-header">
    <div className="topbar">
      <a className="brand" href="/" aria-label="Ankama Store, inicio"><img alt="Ankama Store" src="/media/brand/logo.1485f0cc.png" /></a>
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
        <div className="language-menu" ref={languageMenuRef}>
          <button aria-controls="language-dropdown" aria-expanded={isLanguageMenuOpen} className="language-button" onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)} type="button" aria-label="Seleccionar idioma"><img alt="Español" className="language-flag-rectangular" src="/media/general/es_flag.png" /></button>
          <div aria-hidden={!isLanguageMenuOpen} className={`language-dropdown${isLanguageMenuOpen ? ' is-open' : ''}`} id="language-dropdown">
            <button onClick={() => handleLanguageSelection('en')} type="button"><img alt="" src="/media/general/en_flag.jpg" />English</button>
            <button onClick={() => handleLanguageSelection('es')} type="button"><img alt="" className="language-flag-rectangular" src="/media/general/es_flag.png" />Español</button>
            <button onClick={() => handleLanguageSelection('fr')} type="button"><img alt="" src="/media/general/fr_flag.svg" />Français</button>
          </div>
        </div>
        <button aria-controls="mobile-category-nav" aria-expanded={isMobileMenuOpen} className="mobile-menu-button" onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)} type="button" aria-label="Abrir menú"><Menu size={24} /></button>
      </div>
    </div>
    <nav className={`category-nav${isMobileMenuOpen ? ' is-mobile-open' : ''}`} aria-label="Categorías principales" id="mobile-category-nav" ref={navigationRef}>
      <div className="category-nav-items">
        {navigationItems.map((item) => {
          const isOpen = openMenu === item.label
          const menuId = `category-menu-${item.label.toLowerCase().replaceAll(' ', '-')}`
          return <div className="category-menu" key={item.label} onMouseEnter={() => openCategoryMenu(item.label)} onMouseLeave={scheduleClose}>
            <button aria-controls={menuId} aria-expanded={isOpen} className="category-nav-item" onClick={() => setOpenMenu(isOpen ? null : item.label)} onFocus={() => openCategoryMenu(item.label)} type="button"><img src={item.logoUrl} alt="" /><span>{item.label}</span><ChevronDown aria-hidden="true" className={isOpen ? 'is-open' : undefined} size={14} strokeWidth={2.3} /></button>
            <div aria-hidden={!isOpen} className={`category-dropdown${isOpen ? ' is-open' : ''}`} id={menuId}><Link onClick={() => { setOpenMenu(null); setIsMobileMenuOpen(false) }} to={getNavigationPath(item)}>Ver todo</Link>{item.categories.map((category, index) => <Link className={index === 0 ? 'is-highlighted' : undefined} key={category} onClick={() => { setOpenMenu(null); setIsMobileMenuOpen(false) }} to={getNavigationPath(item, category)}>{category}</Link>)}</div>
          </div>
        })}
      </div>
      <a className="merchandising-link" href="https://github.com/JhonveraDev" rel="noreferrer" target="_blank"><span>Github</span><ExternalLink aria-hidden="true" size={21} /></a>
    </nav>
    {isLanguageNoticeOpen && <div aria-labelledby="language-notice-title" aria-modal="true" className="language-notice-backdrop" onMouseDown={() => setIsLanguageNoticeOpen(false)} role="dialog">
      <div className="language-notice" onMouseDown={(event) => event.stopPropagation()}>
        <h2 id="language-notice-title">{noticeCopy.title}</h2>
        <p>{noticeCopy.message}</p>
        <button autoFocus onClick={() => setIsLanguageNoticeOpen(false)} type="button">{noticeCopy.dismiss}</button>
      </div>
    </div>}
  </header>
}
