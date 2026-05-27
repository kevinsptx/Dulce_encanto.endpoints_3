function Tabla({ datos }) {

  return (

    <table>

      <thead>

        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
        </tr>

      </thead>

      <tbody>

        {datos.map((item) => (

          <tr key={item.id}>

            <td>{item.id}</td>

            <td>{item.nombre}</td>

            <td>{item.correo}</td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default Tabla;