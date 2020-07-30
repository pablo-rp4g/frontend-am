import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function Registro() {

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')

    const [tperfiles, setTperfiles] = useState([])
    const [perfilselect, setPerfilselect] = useState('')

    useEffect(() => {
        setTperfiles(['Creador', 'Validador'])
        setPerfilselect('Creador')
    }, [])

    const registrar = async (e) => {
        e.preventDefault()
        const usuario = {
            nombre, correo, contrasena, perfil:perfilselect
        }
        //const respuesta = await Axios.post('http://localhost:4000/usuario/crear', usuario)
        const respuesta = await Axios.post('https://backend-am.herokuapp.com/usuario/crear', usuario)
        const mensaje = respuesta.data.mensaje
        if (mensaje === 'Bienvenido') {
            console.log(respuesta)
            const token = respuesta.data.token
            const nombre = respuesta.data.nombre
            const idusuario = respuesta.data.id
            const perfilSess = respuesta.data.perfil
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('nombre', nombre)
            sessionStorage.setItem('idusuario', idusuario)
            sessionStorage.setItem('perfil', perfilSess)
            // window.location.href = '/index'
            window.location.href = '/index22'
            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
            })
            setTimeout(() => {
                // window.location.href = '/index'
                window.location.href = '/index22'
            }, 1500)
        } else {
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <div className="container mt-4">
            <div className='row'>
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="card-header">
                            <h4>Registro</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registrar}>
                                <div className="form-group">
                                    <input type="text" name="nombre" className="form-control" placeholder="Nombre" required autoFocus onChange={e => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="email" name="correo" className="form-control" placeholder="Correo" required onChange={e => setCorreo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="contrasena" className="form-control" placeholder="Contraseña" required onChange={e => setContrasena(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Tipo de perfil</label>
                                    <select className="form-control" onChange={(e) => setPerfilselect(e.target.value)} value={perfilselect}>
                                        {
                                            tperfiles.map(tperfil =>
                                                <option key={tperfil}>
                                                    {tperfil}
                                                </option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group" type='submit'>
                                    <button className='form.control btn btn-primary btn-block'>
                                        Aceptar
                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
