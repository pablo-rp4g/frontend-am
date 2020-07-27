import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Nav from './components/Nav';
import Login from './components/Login';
import Index from './components/Index';
import Actualizar from './components/Actualizar';
import Registro from './components/Registro';

const estaAutenticado = () => {
  const token = sessionStorage.getItem('token')
  if (token){
    return true
  }
  else{
    return false
  }
}

const MyRoute = (props) => {
  return estaAutenticado() ? <Route {...props} /> : <Redirect to="/" />
}

function App() {
  return (
    <Router>
      <Nav/>
      <Route path='/' exact component={Login}/>
      <MyRoute path='/index' component={Index}/>
      <MyRoute path='/editar/:id' component={Actualizar}/>
      <Route path='/registrar' component={Registro}/>
    </Router>
  );
}

export default App;
