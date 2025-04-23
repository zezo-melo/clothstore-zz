import { useState } from "react";
import axios from "axios";

export default function AddProducts() {
  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [vendor, setVendor] = useState("ZZ ClothStore");
  const [productType, setProductType] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [imagesBase64, setImagesBase64] = useState<string[]>([]);



  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100);
    setPrice(formatted);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const base64Promises = fileArray.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(base64Promises)
        .then(base64Images => setImagesBase64(base64Images))
        .catch(error => console.error("Erro ao converter imagens:", error));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = Number(price.replace(/\D/g, "")) / 100;

    const productData = {
      title,
      body_html: bodyHtml,
      vendor,
      product_type: productType,
      tags: tags.split(",").map((tag) => tag.trim()),
      price: numericValue,
      imagesBase64,
    };

    try {
      const response = await axios.post("http://localhost:3000/shopify/products", productData);
      console.log("✅ Produto enviado com sucesso!", response.data);
      alert("Produto criado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao enviar produto:", error);
      alert("Erro ao enviar produto. Veja o console para mais detalhes.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border rounded px-4 py-2"
            placeholder="Product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="bodyHtml" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="bodyHtml"
            placeholder="Product description"
            className="w-full border rounded px-4 py-2 h-28 resize-none"
            value={bodyHtml}
            onChange={(e) => setBodyHtml(e.target.value)}
            required
          />
        </div>

        {/* Vendor + Product Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="vendor" className="block font-semibold mb-1">
              Vendor
            </label>
            <input
              id="vendor"
              type="text"
              className="w-full border rounded px-4 py-2"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productType" className="block font-semibold mb-1">
              Product Type
            </label>
            <input
              id="productType"
              placeholder="T-shirt, Shorts, Jeans.."
              type="text"
              className="w-full border rounded px-4 py-2"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block font-semibold mb-1">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            placeholder="Executive, Urban, Casual"
            type="text"
            className="w-full border rounded px-4 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-semibold mb-1">
            Price (BRL)
          </label>
          <input
            id="price"
            placeholder="R$0,00"
            type="text"
            className="w-full border rounded px-4 py-2"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label htmlFor="image" className="block font-semibold mb-1">
            Product Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded px-4 py-2 bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
