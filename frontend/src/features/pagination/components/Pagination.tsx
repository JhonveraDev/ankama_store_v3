import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { ReactNode } from 'react'

type PaginationEntry = number | 'ellipsis'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

function getEntries(currentPage: number, totalPages: number): PaginationEntry[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)

  if (currentPage <= 4) return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  if (currentPage >= totalPages - 3) return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages]
}

interface PaginationButtonProps {
  ariaLabel: string
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}

function PaginationButton({ ariaLabel, children, disabled = false, onClick }: PaginationButtonProps) {
  return <button aria-label={ariaLabel} className="pagination-button" disabled={disabled} onClick={onClick} type="button">{children}</button>
}

export function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const goTo = (page: number) => onPageChange(Math.min(Math.max(1, page), totalPages))
  const entries = getEntries(currentPage, totalPages)

  return (
    <nav aria-label="Paginación" className="catalog-pagination">
      <PaginationButton ariaLabel="Ir a la primera página" disabled={currentPage === 1} onClick={() => goTo(1)}><ChevronsLeft size={18} strokeWidth={1.8} /></PaginationButton>
      <PaginationButton ariaLabel="Ir a la página anterior" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)}><ChevronLeft size={18} strokeWidth={1.8} /></PaginationButton>
      <div className="pagination-pages">
        {entries.map((entry, index) => entry === 'ellipsis'
          ? <span aria-hidden="true" className="pagination-ellipsis" key={`ellipsis-${index}`}>…</span>
          : <button aria-current={entry === currentPage ? 'page' : undefined} aria-label={`Ir a la página ${entry}`} className={`pagination-button pagination-page${entry === currentPage ? ' is-active' : ''}`} key={entry} onClick={() => goTo(entry)} type="button">{entry}</button>)}
      </div>
      <PaginationButton ariaLabel="Ir a la página siguiente" disabled={currentPage === totalPages} onClick={() => goTo(currentPage + 1)}><ChevronRight size={18} strokeWidth={1.8} /></PaginationButton>
      <PaginationButton ariaLabel="Ir a la última página" disabled={currentPage === totalPages} onClick={() => goTo(totalPages)}><ChevronsRight size={18} strokeWidth={1.8} /></PaginationButton>
    </nav>
  )
}
