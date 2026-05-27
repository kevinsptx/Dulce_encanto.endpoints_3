import axios from "axios";

const API = "http://localhost:3000/api/categorias";


// 🌸 OBTENER CATEGORÍAS
export const obtenerCategorias = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};