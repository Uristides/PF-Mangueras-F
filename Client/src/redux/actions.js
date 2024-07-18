import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND;

// Acción para crear un producto (manguera)
export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${backendUrl}/products`, formData);
    console.log("Product created:", response.data);
    return response.data; // Devuelve los datos del producto creado si es necesario
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Puedes definir más acciones aquí según tus necesidades
