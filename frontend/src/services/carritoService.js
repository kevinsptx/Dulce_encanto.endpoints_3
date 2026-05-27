import axios from "axios";

const API = "http://localhost:3000/api/carrito";


// 🛍️ OBTENER CARRITO
export const obtenerCarrito = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};


// ➕ AGREGAR AL CARRITO
export const agregarCarrito = async (producto) => {

  try {

    const res = await axios.post(API, producto);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};