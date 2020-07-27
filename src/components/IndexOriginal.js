import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Index() {

    const [empleados, setEmpleados] = useState([])


    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [puesto, setPuesto] = useState('')
    const [tcontratos, setTcontratos] = useState([])
    const [contratoselect, setContratoselect] = useState('')

    

    useEffect(() => {
        obtenerEmpleados()
        setTcontratos(['Fijo', 'Temporal', 'Practicante'])
        setContratoselect('Fijo')
    }, [])

    const obtenerEmpleados = async () => {
        const id=sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/empleado/listarempleadosporjefe/'+id, {
            headers: { 'autorizacion': token }
        })
        setEmpleados(respuesta.data)
    }

    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('http://localhost:4000/empleado/eliminar/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerEmpleados()
    }

    const guardar = async (e) => {
        e.preventDefault()
        const usuario = {
            nombres,
            apellidos,
            identificacion,
            puesto,
            tcontrato: contratoselect,
            usuario: sessionStorage.getItem('idusuario')
        }
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('http://localhost:4000/empleado/crear', usuario, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/index'
        }, 1500)

    }

    const buscar=async(e)=>{
        if(e.target.value===""){
            return obtenerEmpleados()
        }
        const buscar=e.target.value
        const token = sessionStorage.getItem('token')
        const respuesta= await Axios.get('http://localhost:4000/empleado/buscar/'+buscar, {
            headers: { 'autorizacion': token }
        })
        setEmpleados(respuesta.data)
    }

    return (
        <div>
            <header id="main-header" className="py-2 bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-pencil-alt"></i> Empleados</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* <!-- SEARCH --> */}

            <nav className="navbar py-4">
                <div className="container">
                    <div className="col-md-3">
                        <a href="/" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
                            <i className="fas fa-plus"></i> Add Empleado
                </a>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="input-group">
                            <input className="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="Search" required onChange={(e)=>buscar(e)}/>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- EMPLEADOS --> */}
            <section id="empleados">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Empleados de {sessionStorage.getItem('nombre')}</h4>
                                </div>
                                <table className="table table-responsive-lg table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Identificación</th>
                                            <th>Tipo contrato</th>
                                            <th>Opciones</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            empleados.map((empleado, i) => (
                                                <tr key={empleado._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{empleado.nombres}</td>
                                                    <td>{empleado.apellidos}</td>
                                                    <td>{empleado.identificacion}</td>
                                                    <td>{empleado.tcontrato}</td>
                                                    <td>
                                                        <button className="btn btn-warning mr-1" onClick={() => eliminar(empleado._id)}>Eliminar</button>
                                                        <a className="btn btn-danger" href={'/editar/'+empleado._id}>Editar</a>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- MODALS --> */}

            {/* <!-- ADD EMPLEADO MODAL --> */}

            <div className="modal fade" id="addEmpleado">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add Empleado</h5>
                            <button className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardar}>
                                <div className="form-group">
                                    <label>Nombres</label>
                                    <input type="text" className="form-control" required onChange={e => setNombres(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Apellidos</label>
                                    <input type="text" className="form-control" required onChange={e => setApellidos(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Puesto</label>
                                    <input type="text" className="form-control" required onChange={e => setPuesto(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Identificación</label>
                                    <input type="text" className="form-control" required onChange={e => setIdentificacion(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Tipo de contrato</label>
                                    <select className="form-control" onChange={(e) => setContratoselect(e.target.value)} value={contratoselect}>
                                        {
                                            tcontratos.map(tcontrato =>
                                                <option key={tcontrato}>
                                                    {tcontrato}
                                                </option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" type="submit">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
