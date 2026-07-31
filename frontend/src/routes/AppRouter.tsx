import { Route, Routes } from 'react-router-dom'
import { StoreLayout } from '../layouts/StoreLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { RegisterPage } from '../pages/RegisterPage'
import { RegisterSuccessPage } from '../pages/RegisterSuccessPage'
import { CartPage } from '../pages/CartPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="buscar" element={<SearchResultsPage />} />
        <Route path="productos/:slug" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/success" element={<RegisterSuccessPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
