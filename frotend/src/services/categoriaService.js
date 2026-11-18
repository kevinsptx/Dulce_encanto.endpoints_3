import axios from "axios";

const API = "/api/categorias";


// ðŸŒ¸ OBTENER CATEGORÃAS
export const obtenerCategorias = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};
