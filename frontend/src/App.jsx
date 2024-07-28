import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './views/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './views/logout';
import Private from './views/private';
import Register from './views/register';

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route
                        path="/private"
                        element={
                            <PrivateRoute>
                                <Private />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;

// // import './App.css';
// // import { Route, Routes, BrowserRouter } from 'react-router-dom';
// // import Home from './views/home';
// // import MainWrapper from './layouts/MainWrapper';
// // import Login from './views/login';
// // import PrivateRoute from './layouts/PrivateRoute';
// // import Logout from './views/logout';
// // import Private from './views/private';
// // import Register from './views/register';
// import './index.css';
// import { useState, useEffect } from 'react';
// import Formulario from './views/Formulario';
// import Header from './views/Header';
// import ListadoPaciente from './views/ListadoPaciente';

// function App() {
//     const [pacientes, setPacientes] = useState(
//         JSON.parse(localStorage.getItem('pacientes')) ?? []
//     );
//     const [paciente, setPaciente] = useState({});
//     useEffect(() => {
//         //Aca se va a mantener el localStorage
//         // console.log('Componente listo o cambio pacientes')
//         localStorage.setItem('pacientes', JSON.stringify(pacientes));
//     }, [pacientes]);

//     const eliminarPaciente = (id) => {
//         // console.log('Eliminando paciente', id);
//         const pacientesActualizados = pacientes.filter(
//             (paciente) => paciente.id !== id
//         );
//         setPacientes(pacientesActualizados);
//     };
//     return (
//         <div className="container mx-auto mt-20">
//             <Header />
//             <div className="mt-12 md:flex">
//                 <Formulario
//                     pacientes={pacientes}
//                     setPacientes={setPacientes}
//                     paciente={paciente}
//                     setPaciente={setPaciente}
//                 />
//                 <ListadoPaciente
//                     pacientes={pacientes}
//                     setPaciente={setPaciente}
//                     eliminarPaciente={eliminarPaciente}
//                 />
//             </div>
//         </div>
//     );
// }

// export default App;
