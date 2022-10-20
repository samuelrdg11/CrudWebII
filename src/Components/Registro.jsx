import React from 'react'
import { nanoid } from "nanoid"
import { firebase } from '../firebase'
const Registro = () => {
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [nacimiento, setNacimiento] = React.useState('')
  const [edad, setEdad] = React.useState('')
  const [sexo, setSexo] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [ciudad, setCiudad] = React.useState('')
  const [id, setId] = React.useState('')
  const [imagen] = React.useState([])
  const [lista, setLista] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])
  
  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError("El campo 'nombre' está vacio")
      return
    }
    if (!apellido.trim()) {
      setError("El campo 'apellido' está vacio")
      return
    }
    if (!nacimiento.trim()) {
      setError("El campo 'nacimiento' está vacio")
      return
    }
    if (!String(edad.trim())) {
      setError("El campo 'edad' está vacio");
      return;
    }
    if (isNaN(edad)) {
      setError("En el campo 'edad' no se han digitado valores numéricos");
      return true;
    }
    if (!sexo.trim()) {
      setError("El campo 'sexo' está vacio");
      return;
    }
    if (!String(telefono.trim())) {
      setError("El campo 'telefono' está vacio");
      return;
    }
    if (!ciudad.trim()) {
      setError("El campo 'ciudad' está vacio");
      return;
    }
    if (isNaN(telefono)) {
      setError("En el campo 'telefono' no se han digitado valores numéricos");
      return true;
    }

    try {
      const db = firebase.firestore()
      const nuevousuario = {
        nombre, apellido, nacimiento, edad, sexo, telefono, ciudad, img: imagen
      }
      await db.collection('usuarios').add(nuevousuario)
      setLista([
        ...lista,
        { id: nanoid(), nombre, apellido, nacimiento, edad, sexo, telefono, ciudad, img: imagen }

      ])
      setNombre('')
      setApellido('')
      setNacimiento('')
      setEdad('')
      setSexo('')
      setTelefono('')
      setCiudad('')
      setError(null)

    } catch (error) {
      console.log(error);
    }
  }


  const eliminarDato = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listaFiltrada = lista.filter(elemento => elemento.id !== id)
      setLista(listaFiltrada)
    }
    catch (error) {
      console.log(error);
    }
  }

  const editar = (elemento) => {
    setModoEdicion(true)
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setNacimiento(elemento.nacimiento)
    setEdad(elemento.edad)
    setSexo(elemento.sexo)
    setTelefono(elemento.telefono)
    setCiudad(elemento.ciudad)
    setId(elemento.id)
  }
  const editarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Ingrese el nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Ingrese el apellido')
      return
    }
    if (!nacimiento.trim()) {
      setError("El campo 'nacimiento' está vacio")
      return
    }
    if (!String(edad.trim())) {
      setError("El campo 'edad' está vacio");
      return;
    }
    if (isNaN(edad)) {
      setError("En el campo 'edad' no se han digitado valores numéricos");
      return true;
    }
    if (!sexo.trim()) {
      setError("El campo 'sexo' está vacio");
      return;
    }
    if (!String(telefono.trim())) {
      setError("El campo 'telefono' está vacio");
      return;
    }
    if (!ciudad.trim()) {
      setError("El campo 'ciudad' está vacio");
      return;
    }
    if (isNaN(telefono)) {
      setError("En el campo 'telefono' no se han digitado valores numéricos");
      return true;
    }

    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({
        nombre, apellido, nacimiento, edad, sexo, telefono, ciudad, img: imagen
      })
      const listaEditada = lista.map(
        (elemento) => elemento.id === id ? { id: id, nombre: nombre, apellido: apellido, nacimiento: nacimiento, edad: edad, sexo: sexo, telefono: telefono, ciudad: ciudad } :
          elemento)

      setLista(listaEditada)
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setNacimiento('')
      setEdad('')
      setSexo('')
      setTelefono('')
      setCiudad('')
      setId('')
      setError(null)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <p><b>SAMUEL RODRÍGUEZ</b></p>
      <h2 className="text-center">{
        modoEdicion ? 'Editar usuario' : 'Registro de usuario'
      }</h2>

      <div className="row">
        <div className="col-3">
          <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>

            {
              error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) :
                null
            }
            <h6>Nombre</h6>
            <input type="text"
              placeholder="Ingrese el Nombre"
              className="form-control mb-2 text-black"
              onChange={(e) => { setNombre(e.target.value) }}
              value={nombre}
            />
            <h6>Apellido</h6>
            <input type="text"
              placeholder="Ingrese el Apellido"
              className="form-control mb-2 text-black"
              onChange={(e) => { setApellido(e.target.value) }}
              value={apellido}
            />
            <h6>Fecha de nacimiento</h6>
            <input type="date"
              placeholder="Ingrese su fecha de nacimiento"
              className="form-control mb-2 text-black"
              onChange={(e) => { setNacimiento(e.target.value) }}
              value={nacimiento}
            />
            <h6>Edad</h6>
            <input type="text"
              placeholder="Ingrese su edad"
              className="form-control mb-2 text-black"
              onChange={(e) => { setEdad(e.target.value) }}
              value={edad}
            />
            <h6>Sexo</h6>
            <select
              className="form-control mb-2 text-black"
              placeholder="Seleccione su sexo"
              onChange={(e) => { setSexo(e.target.value) }}
              value={sexo}
            >
              <option value="" defaultChecked>Seleccione su sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <h6>Telefono</h6>
            <input type="text"
              placeholder="3104377297"
              className="form-control mb-2 text-black"
              onChange={(e) => { setTelefono(e.target.value) }}
              value={telefono}
            />
            <h6>Ciudad de nacimiento</h6>
            <input type="text"
              placeholder="Barranquilla"
              className="form-control mb-2 text-black"
              onChange={(e) => { setCiudad(e.target.value) }}
              value={ciudad}
            />
            <div className="d-grid gap-2">
              {
                modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                  : <button className="btn btn-outline-primary mb-3" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>

        <div className="col-9">
          <table className="table table-striped table-responsive table-dark table-responsive">
            <caption>Lista de usuarios</caption>
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Eliminar</th>
                <th>Editar</th>
                <th>Imagen</th>
              </tr>
            </thead>

            <tbody>
              {
                (
                  lista.map((elemento) => (
                    <tr key={elemento.id}>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.apellido}</td>
                      <td>{elemento.nacimiento}</td>
                      <td>{elemento.edad}</td>
                      <td>{elemento.sexo}</td>
                      <td>{elemento.telefono}</td>
                      <td>{elemento.ciudad}</td>
                      <td>
                        <button className="btn btn-danger btn-sm mx-2 float-end"
                          onClick={() => eliminarDato(elemento.id)}
                        >Eliminar</button>
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm mx-2 float-end"
                          onClick={() => editar(elemento)}
                        >Editar</button>
                      </td>
                      <td> <img
                        src={`https://picsum.photos/200/200?random&t=${elemento.id}`}
                      />
                      </td>
                    </tr>
                  )
                  )
                )
              }
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Registro;