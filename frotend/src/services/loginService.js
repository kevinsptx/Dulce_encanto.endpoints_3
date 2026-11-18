import axios from "axios";

const API = "/api/auth";


// ðŸ”‘ LOGIN
export const loginUsuario = async (datos) => {

  try {

    const res = await axios.post(`${API}/login`, datos);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};
