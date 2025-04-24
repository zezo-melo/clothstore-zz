import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          zZ ClothStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition">Products</Link>
          <Link to="/add" className="hover:text-blue-600 transition">Add Products</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Mobile Nav Icon */}
        <div className="md:hidden text-xl text-gray-700 ml-auto">
          ☰
        </div>
      </div>
    </header>
  );
}
