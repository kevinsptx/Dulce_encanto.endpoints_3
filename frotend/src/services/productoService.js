import axios from "axios";

const API = "/api/productos";


// ðŸ” OBTENER PRODUCTOS
export const obtenerProductos = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};
