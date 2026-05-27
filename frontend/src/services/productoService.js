import axios from "axios";

const API = "http://localhost:3000/api/productos";


// 🔍 OBTENER PRODUCTOS
export const obtenerProductos = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};