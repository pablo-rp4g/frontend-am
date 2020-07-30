import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'


export default function Login() {

    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')

    const login = async (e) => {
        e.preventDefault()
        const usuario = { correo, contrasena }
        //const respuesta = await Axios.post('http://localhost:4000/usuario/login', usuario)
        const respuesta = await Axios.post('https://backend-am.herokuapp.com/usuario/login', usuario)
            console.log(respuesta)
        const mensaje = respuesta.data.mensaje
        if (mensaje !== 'Bienvenido') {
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
           
        } else {
            const token = respuesta.data.token
            const nombre = respuesta.data.nombre
            const idusuario=respuesta.data.id
            const perfilSess = respuesta.data.perfil
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('nombre', nombre)
            sessionStorage.setItem('idusuario', idusuario)
            sessionStorage.setItem('perfil', perfilSess)
            //window.location.href = 'https://goofy-wright-b64611.netlify.app/index' 
            window.location.href = '/index22' 
            // console.log(respuesta)
            // debugger
            //window.location.href = '/indexCliente'
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="card-header">
                            <h4>Inicio de sesión</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input type="email" name="correo" className="form-control" autoFocus required onChange={(e) => setCorreo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>contraseña</label>
                                    <input type="password" name="correo" className="form-control" required onChange={(e) => setContrasena(e.target.value)} />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
