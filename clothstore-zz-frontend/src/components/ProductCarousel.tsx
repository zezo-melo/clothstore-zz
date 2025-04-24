import { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { API_BASE_URL } from "../api";


interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  images: { src: string }[]; // <- lista completa de imagens (para fallback)
  variants: {
    price: string; // <- ainda vem como string da Shopify
  }[];
}


export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shopify/products`);        
        setProducts(response.data); // já vem formatado no backend
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-gray-300">
      <h2 className="text-4xl font-bold text-center mb-10">Most Popular</h2>

      {products === undefined ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="keen-slider__slide flex flex-col items-center bg-white rounded shadow p-4"
              >
                <img
                  src={product.image || product.images?.[0]?.src || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-48 h-48 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">
                  {product.price
                    ? `R$ ${Number(product.price).toFixed(2)}`
                    : "Preço indisponível"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
