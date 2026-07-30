import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/product-api'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}
