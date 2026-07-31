import { AppRouter } from './routes/AppRouter'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { CartProvider } from './features/cart/context/CartContext'
import { AuthProvider } from './features/auth/context/AuthContext'

function App() {
  return <AuthProvider><CartProvider><ScrollToTop /><AppRouter /></CartProvider></AuthProvider>
}

export default App
