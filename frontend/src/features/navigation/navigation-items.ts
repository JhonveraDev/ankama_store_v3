export interface NavigationItem {
  label: string
  logoUrl: string
  categories: string[]
}

export const navigationItems: NavigationItem[] = [
  { label: 'DOFUS', logoUrl: '/media/brand/nav-logos/nav_item_dofus.png', categories: ['Suscripciones', 'Ogrinas', 'Servicios', 'Ofertas actuales', 'Objetos en juego'] },
  { label: 'DOFUS Retro', logoUrl: '/media/brand/nav-logos/nav_item_dofus_retro.png', categories: ['Suscripciones', 'Ogrinas', 'Servicios', 'Ofertas actuales', 'Objetos en juego'] },
  { label: 'WAKFU', logoUrl: '/media/brand/nav-logos/nav_item_wakfu.png', categories: ['Suscripciones', 'Ogrinas', 'Servicios', 'Ofertas actuales', 'Objetos en juego'] },
  { label: 'WAVEN', logoUrl: '/media/brand/nav-logos/nav_item_waven.png', categories: ['Packs', 'Ofertas actuales', 'Objetos en juego'] },
  { label: 'KROSMAGA', logoUrl: '/media/brand/nav-logos/nav_item_krosmaga.png', categories: ['Packs', 'Ofertas actuales', 'Objetos en juego'] },
  { label: 'Premium Games', logoUrl: '/media/brand/nav-logos/nav_item_premium_games.png', categories: ['Juegos', 'Ofertas actuales'] },
  { label: 'Webtoons', logoUrl: '/media/brand/nav-logos/nav_item_webtoons.png', categories: ['Novedades', 'Series', 'Ofertas actuales'] },
]
