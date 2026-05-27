import { useState } from "react";

function Formulario() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const enviarFormulario = (e) => {

    e.preventDefault();

    console.log({
      nombre,
      correo
    });

  };

  return (

    <form
      className="formulario"
      onSubmit={enviarFormulario}
    >

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <button type="submit">
        Guardar ✨
      </button>

    </form>

  );
}

export default Formulario;