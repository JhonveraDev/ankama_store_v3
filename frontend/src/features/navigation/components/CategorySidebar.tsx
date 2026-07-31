import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { NavigationItem } from '../navigation-items'
import { getNavigationPath } from '../navigation-routes'

interface CategorySidebarProps { item: NavigationItem; activeCategory?: string; productCount: number }

export function CategorySidebar({ item, activeCategory, productCount }: CategorySidebarProps) {
  const content = <><div className="category-sidebar-heading"><span>{item.label}</span><strong>{productCount} artículos</strong></div><nav aria-label={`Subcategorías de ${item.label}`} className="category-sidebar-links"><Link className={!activeCategory ? 'is-active' : undefined} to={getNavigationPath(item)}>Ver todo</Link>{item.categories.map((category) => <Link className={activeCategory === category ? 'is-active' : undefined} key={category} to={getNavigationPath(item, category)}>{category}</Link>)}</nav></>
  return <aside className="navigation-category-sidebar"><div className="navigation-category-sidebar--desktop">{content}</div><details className="navigation-category-sidebar--mobile"><summary><span>{activeCategory ?? 'Todas las categorías'}</span><ChevronDown size={18} /></summary><div>{content}</div></details></aside>
}
