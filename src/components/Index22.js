import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Index22() {

    const [clientes, setClientes] = useState([])


    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [puesto, setPuesto] = useState('')
    const [tcontratos, setTcontratos] = useState([])
    const [contratoselect, setContratoselect] = useState('')
    const [validado, setvalida] = useState(false)

    const perfilSession=sessionStorage.getItem('perfil')
        console.log(perfilSession)

    useEffect(() => {
        obtenerClientes()
        setTcontratos(['Fijo', 'Temporal', 'Practicante'])
        setContratoselect('Fijo')
    }, [])

    const obtenerClientes= async () => {
        const id=sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        //const respuesta = await Axios.get('http://localhost:4000/cliente/listarclientesTodos/', {
        const respuesta = await Axios.get('https://backend-am.herokuapp.com/cliente/listarclientesTodos/', {


        //const respuesta = await Axios.get('http://localhost:4000/cliente/listarclientesporjefe/'+id, {
        //const respuesta = await Axios.get('https://form-mern2.herokuapp.com/cliente/listarclientesporjefe/'+id, {

            headers: { 'autorizacion': token }
        })
        //console.log(respuesta)
        setClientes(respuesta.data)
    }

    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('http://localhost:4000/cliente/eliminar/' + id, {
        //const respuesta = await Axios.delete('https://form-mern2.herokuapp.com/cliente/eliminar/' + id, {

            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerClientes()
    }

    const validar = async (id) => {
        const cliente = {
            id, validado:setvalida
        }
        //const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('https://backend-am.herokuapp.com/cliente/valida/' + id

        //const respuesta = await Axios.post('http://localhost:4000/cliente/valida/' + id
        //, {
        //const respuesta = await Axios.put('https://form-mern2.herokuapp.com/cliente/eliminar/' + id, {

        //     headers: { 'autorizacion': token }
        // }
        )
        const validado =respuesta.data.validado
        const mensaje = respuesta.data.mensaje
        console.log(respuesta)
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerClientes()
    }

    const guardar = async (e) => {
        e.preventDefault()
        const usuario = {
            nombres,
            apellidos,
            identificacion,
            puesto,
            tcontrato: contratoselect,
            validado,
            usuario: sessionStorage.getItem('idusuario')
        }
        const token = sessionStorage.getItem('token')
        //const respuesta = await Axios.post('http://localhost:4000/cliente/crear', usuario, {
        const respuesta = await Axios.post('https://backend-am.herokuapp.com/cliente/crear', usuario, {

            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/index22'
        }, 1500)

    }

    const buscar=async(e)=>{
        if(e.target.value===""){
            return obtenerClientes()
        }
        const buscar=e.target.value
        const token = sessionStorage.getItem('token')
        //const respuesta= await Axios.get('http://localhost:4000/cliente/buscar/'+buscar, {
        const respuesta= await Axios.get('https://backend-am.herokuapp.com/cliente/buscar/'+buscar, {

            headers: { 'autorizacion': token }
        })
        setClientes(respuesta.data)
    }

    return (
        <div>
            <header id="main-header" className="py-2 bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-pencil-alt"></i> Clientes</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* <!-- SEARCH --> {perfilSession==="Creador" ? : } */}

            <nav className="navbar py-4">
                
                <div className="container">
                    {perfilSession==="Creador" ? 
                    
                        <div className="col-md-3">
                                <a href="/" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
                                    <i className="fas fa-plus"></i> Crear Cliente
                                </a>
                        </div> 
                        : 
                        <div className="col-md-3">
                            <a href="" className="btn btn-primary btn-block" disable={true} data-toggle="modal" data-target="" >
                                <i className="fas fa-plus"></i> Validador
                            </a>
                        </div>
                    }
                    


                    {/* <div className="col-md-3">
                        <a href="/" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
                            <i className="fas fa-plus"></i> Crear Cliente
                        </a>
                    </div> */}
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
                                    <h4>Clientes de {sessionStorage.getItem('nombre')}</h4>
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
                                            <th>Validado</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clientes.map((cliente, i) => (
                                                <tr key={cliente._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{cliente.nombres}</td>
                                                    <td>{cliente.apellidos}</td>
                                                    <td>{cliente.identificacion}</td>
                                                    <td>{cliente.tcontrato}</td>                                                 
                                                    <td>
                                                        <button className="btn btn-warning mr-1" onClick={() => eliminar(cliente._id)}>Eliminar</button>
                                                        <a className="btn btn-danger" href={'/editar/'+cliente._id}>Editar</a>
                                                    </td>
                                                    <td>
                                                        {cliente.validado ? 
                                                        <button className="btn btn-danger" >Validado</button>
                                                        : 
                                                        //<button className="btn btn-success" >Validar</button>

                                                        <button className="btn btn-success" onClick={() => validar(cliente._id)} >Validar</button>
                                                        }
                                                        
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
                            <h5 className="modal-title">Crear cliente</h5>
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
