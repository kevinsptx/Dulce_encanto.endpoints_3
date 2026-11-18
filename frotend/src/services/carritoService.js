import axios from "axios";

const API = "/api/carrito";


// ðŸ›ï¸ OBTENER CARRITO
export const obtenerCarrito = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};


// âž• AGREGAR AL CARRITO
export const agregarCarrito = async (producto) => {

  try {

    const res = await axios.post(API, producto);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};
