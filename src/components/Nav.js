import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function Nav() {


    const [menu, setMenu] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setMenu(true)
        }
    }, [])

    const salir = () => {
        sessionStorage.clear()
        window.location.href = '/'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
            <div className="container">
                {/* <a className="navbar-brand" href="/index">Inicio</a> */}
                <a className="navbar-brand" href="/index22">Inicio</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    menu ?
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    {/* <a href="/index" className="nav-link " > */}
                                    <a href="/index22" className="nav-link " >
                                        <i className="fas fa-user"></i> Bienvenido {sessionStorage.getItem('nombre')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link" onClick={() => salir()}>
                                        <i className="fas fa-user-times"></i> Salir
                                    </a>
                                </li>
                            </ul>
                        </div> :
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/registrar" className="nav-link" >
                                        <i className="fas fa-user-plus"></i> Registrarme
                                </Link>
                                </li>
                            </ul>
                        </div>
                }
            </div>
        </nav >
    )
}
