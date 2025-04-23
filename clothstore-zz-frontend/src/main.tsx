import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Products from './pages/Products.tsx'
import AddProducts from './pages/AddProducts.tsx'
import Contact from './pages/Contact.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="add" element={<AddProducts />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
