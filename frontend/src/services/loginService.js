import axios from "axios";

const API = "http://localhost:3000/api/auth";


// 🔑 LOGIN
export const loginUsuario = async (datos) => {

  try {

    const res = await axios.post(`${API}/login`, datos);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};