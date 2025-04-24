export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://clothstore-zz.onrender.com";