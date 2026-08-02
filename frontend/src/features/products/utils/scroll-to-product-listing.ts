export function scrollToProductListing(source: HTMLElement | null): void {
  const target = source?.closest<HTMLElement>('[data-product-listing]') ?? source
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
