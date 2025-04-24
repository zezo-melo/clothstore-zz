import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 z-50">
          zZ ClothStore
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
          <Link to="/add" className="hover:text-blue-600 transition">Add Products</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown - agora flutuando sobre tudo */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 space-y-3 text-gray-700 font-medium z-40">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Products</Link>
          <Link to="/add" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Add Products</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600">Contact</Link>
        </div>
      )}
    </header>
  );
}
