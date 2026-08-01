export interface NavigationItem {
  categories: string[]
  imageUrl: string
  label: string
  logoUrl: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'DOFUS', imageUrl: '/media/categories/principal_dofus.png', logoUrl: '/media/brand/nav-logos/nav_item_dofus.png', categories: ['Ofertas de la semana', 'Abononos', 'Ofertas del momento', 'Ogrinas', 'Servicios', 'Los clásicos atemporales', 'Colección de verano', 'Apariencias de clases', 'Mercado de ocaciones', 'Peluches'] },
  { label: 'DOFUS Retro', imageUrl: '/media/categories/principal_dofus_retro.png', logoUrl: '/media/brand/nav-logos/nav_item_dofus_retro.png', categories: ['Abonos', 'Ogrinas', 'Servicios', 'Ofertas del momento', 'Objetos en el juego'] },
  { label: 'WAKFU', imageUrl: '/media/categories/principal_wakfu.png', logoUrl: '/media/brand/nav-logos/nav_item_wakfu.png', categories: ['Boosters', 'Ogrinas', 'Servicios', 'Paquetes', 'Objetos', 'Ventanas actuales', 'Piedra de kamas', 'Peluches'] },
  { label: 'WAVEN', imageUrl: '/media/categories/principal_waven.png', logoUrl: '/media/brand/nav-logos/nav_item_waven.png', categories: ['Packs', 'Gemas'] },
  { label: 'KROSMAGA', imageUrl: '/media/categories/principal_krosmaga.png', logoUrl: '/media/brand/nav-logos/nav_item_krosmaga.png', categories: ['Kamas', 'Paquetes', 'Pedestales'] },
  { label: 'Premium Games', imageUrl: '/media/categories/principal_savara.png', logoUrl: '/media/brand/nav-logos/nav_item_premium_games.png', categories: ['Savara', 'One more gate', 'Maliki', 'Super nano blaster'] },
  { label: 'Webtoons', imageUrl: '/media/categories/principal_webtoons.png', logoUrl: '/media/brand/nav-logos/nav_item_webtoons.png', categories: ['Pack de episodios webtoon', 'Ofertas especiales'] },
]
