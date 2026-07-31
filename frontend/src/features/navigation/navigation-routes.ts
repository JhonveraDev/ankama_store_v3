import { navigationItems, type NavigationItem } from './navigation-items'

export function toNavigationSlug(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getNavigationPath(item: NavigationItem, category?: string): string {
  const game = toNavigationSlug(item.label)
  return category ? `/${game}/${toNavigationSlug(category)}` : `/${game}`
}

export function findNavigationItem(gameSlug: string): NavigationItem | undefined {
  return navigationItems.find((item) => toNavigationSlug(item.label) === gameSlug)
}

export function findNavigationCategory(item: NavigationItem, categorySlug: string): string | undefined {
  return item.categories.find((category) => toNavigationSlug(category) === categorySlug)
}

export function getNavigationGameValue(label: string): string {
  return ({ 'DOFUS': 'DOFUS', 'DOFUS Retro': 'DOFUS_RETRO', 'WAKFU': 'WAKFU', 'WAVEN': 'WAVEN', 'KROSMAGA': 'KROSMAGA', 'Premium Games': 'PREMIUM_GAMES', 'Webtoons': 'WEBTOONS' } as Record<string, string>)[label] ?? label.toUpperCase().replaceAll(' ', '_')
}
