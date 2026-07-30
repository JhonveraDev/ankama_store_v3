import { ChevronDown, CircleUserRound, ExternalLink, Menu, Search, ShoppingBasket } from 'lucide-react'
import { navigationItems } from '../../features/navigation/navigation-items'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
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
          <input value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar productos" type="search" />
        </label>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Abrir carrito"><ShoppingBasket size={22} /></button>
          <button className="account-button" type="button"><CircleUserRound size={22} /><span>Conectarse</span></button>
          <button className="mobile-menu-button" type="button" aria-label="Abrir menú"><Menu size={24} /></button>
        </div>
      </div>

      <nav className="category-nav" aria-label="Categorías principales">
        <div className="category-nav-items">
          {navigationItems.map((item) => (
            <a className="category-nav-item" key={item.label} href="#catalogo">
              <img src={item.logoUrl} alt="" />
              <span>{item.label}</span>
              <ChevronDown aria-hidden="true" size={14} strokeWidth={2.3} />
            </a>
          ))}
        </div>
        <a className="merchandising-link" href="#catalogo"><span>Merchandising</span><ExternalLink aria-hidden="true" size={21} /></a>
      </nav>
    </header>
  )
}
