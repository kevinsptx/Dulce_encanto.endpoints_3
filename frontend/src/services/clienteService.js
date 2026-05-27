import axios from "axios";

const API = "http://localhost:3000/api/cliente";


// 🔍 OBTENER CLIENTES
export const obtenerClientes = async () => {

  try {

    const res = await axios.get(API);

    return res.data.data;

  } catch (error) {

    console.log(error);

  }

};


// ➕ CREAR CLIENTE
export const crearCliente = async (cliente) => {

  try {

    const res = await axios.post(API, cliente);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};


// ✏️ ACTUALIZAR CLIENTE
export const actualizarCliente = async (id, cliente) => {

  try {

    const res = await axios.put(`${API}/${id}`, cliente);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};


// ❌ ELIMINAR CLIENTE
export const eliminarCliente = async (id) => {

  try {

    const res = await axios.delete(`${API}/${id}`);

    return res.data;

  } catch (error) {

    console.log(error);

  }

};