import { useState } from "react";
import axios from "axios";

const API = "/api/carrito";

export default function useAgregar() {
  const [agregando, setAgregando] = useState(false);
  const [agregado, setAgregado] = useState(false);
  const [aviso, setAviso] = useState("");

  const agregar = async (producto) => {
    const idProducto = producto?.id_producto ?? producto?.id;

    if (!idProducto) {
      setAviso("No se pudo identificar el producto.");
      return false;
    }

    setAgregando(true);
    setAgregado(false);
    setAviso("");

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const idCliente = usuario?.id_cliente ?? usuario?.id;

      if (idCliente) {
        await axios.post(`${API}/${idCliente}/${idProducto}`);
      } else {
        const carrito = JSON.parse(
          localStorage.getItem("carrito_temp") || "[]"
        );

        const existente = carrito.find(
          (item) => String(item.id_producto) === String(idProducto)
        );

        if (existente) {
          existente.cantidad = (Number(existente.cantidad) || 1) + 1;
        } else {
          carrito.push({
            ...producto,
            id_producto: idProducto,
            cantidad: 1,
          });
        }

        localStorage.setItem("carrito_temp", JSON.stringify(carrito));
      }

      window.dispatchEvent(new Event("carrito-actualizado"));
      setAgregado(true);
      setAviso("¡Producto añadido al carrito!");
      return true;
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      setAviso("No se pudo añadir el producto. Inténtalo de nuevo.");
      return false;
    } finally {
      setAgregando(false);
    }
  };

  return { agregar, agregando, agregado, setAgregado, aviso };
}

