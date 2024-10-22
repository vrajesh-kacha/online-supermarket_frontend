import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './components/context/cartContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/auth.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
 <AuthProvider>
 <BrowserRouter>
 <App />
 </BrowserRouter>
 </AuthProvider>
</CartProvider>
  
)
