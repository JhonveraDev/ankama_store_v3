export interface NavigationItem {
  label: string
  logoUrl: string
  categories: string[]
}

export const navigationItems: NavigationItem[] = [
  { label: 'DOFUS', logoUrl: '/media/brand/nav-logos/nav_item_dofus.png', categories: ['Ofertas de la semana', 'Abononos', 'Ofertas del momento', 'Ogrinas', 'Servicios', 'Los clásicos atemporales', 'Colección de verano', 'Aperiencias de clases', 'Mercado de ocaciones', 'Peluches'] },
  { label: 'DOFUS Retro', logoUrl: '/media/brand/nav-logos/nav_item_dofus_retro.png', categories: ['Abonos', 'Ogrinas', 'Servicios', 'Ofertas del momento', 'Objetos en el juego'] },
  { label: 'WAKFU', logoUrl: '/media/brand/nav-logos/nav_item_wakfu.png', categories: ['Boosters', 'Ogrinas', 'Servicios', 'Paquetes', 'Objetos', 'Ventanas actuales', 'Piedra de kamas', 'Peluches'] },
  { label: 'WAVEN', logoUrl: '/media/brand/nav-logos/nav_item_waven.png', categories: ['Packs', 'Gemas'] },
  { label: 'KROSMAGA', logoUrl: '/media/brand/nav-logos/nav_item_krosmaga.png', categories: ['Kamas', 'Paquetes', 'Pedestales'] },
  { label: 'Premium Games', logoUrl: '/media/brand/nav-logos/nav_item_premium_games.png', categories: ['Savara', 'One more gate', 'Maliki', 'Super nano blaster'] },
  { label: 'Webtoons', logoUrl: '/media/brand/nav-logos/nav_item_webtoons.png', categories: ['Pack de episodios webtoon', 'Ofertas especiales'] },
]
