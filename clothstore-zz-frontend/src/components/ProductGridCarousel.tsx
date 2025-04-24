import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { API_BASE_URL } from "../api";


interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  images: { src: string }[];
  variants: {
    price: string;
  }[];
}

// Plugin para sincronizar thumbs com o slider principal
function ThumbnailPlugin(mainRef: any) {
  return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: HTMLElement) => {
        slide.classList.remove("active");
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide: HTMLElement, idx: number) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ProductGridCarousel() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shopify/products`);        
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">Our Products</h2>

      {products === undefined ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <>
          <div ref={sliderRef} className="keen-slider max-w-3xl mx-auto mb-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="keen-slider__slide flex flex-col items-center bg-white rounded shadow p-6"
              >
                <img
                  src={product.image || product.images?.[0]?.src || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-100 h-80 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-600">
                  {product.price
                    ? `R$ ${Number(product.price).toFixed(2)}`
                    : "Preço indisponível"}
                </p>
              </div>
            ))}
          </div>

          <div ref={thumbnailRef} className="keen-slider thumbnail max-w-xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="keen-slider__slide cursor-pointer">
                <img
                  src={product.image || product.images?.[0]?.src || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-64 h-64 object-cover rounded shadow"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
