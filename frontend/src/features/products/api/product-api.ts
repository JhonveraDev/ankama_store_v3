import { apiClient } from '../../../services/api-client'
import type { Product } from '../../../types/product'

interface ProductsResponse {
  products: Product[]
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ProductsResponse>('/products')

  return data.products
}
