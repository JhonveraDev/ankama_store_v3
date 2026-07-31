import { AppRouter } from './routes/AppRouter'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { CartProvider } from './features/cart/context/CartContext'

function App() {
  return <CartProvider><ScrollToTop /><AppRouter /></CartProvider>
}

export default App
