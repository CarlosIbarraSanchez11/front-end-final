import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import Header from './Header';
import Formulario from './Formulario';
import ListadoPaciente from './ListadoPaciente';

const Home = () => {
    const [pacientes, setPacientes] = useState(
        JSON.parse(localStorage.getItem('pacientes')) ?? []
    );
    const [paciente, setPaciente] = useState({});
    const [isLoggedIn, user, logout] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
        state.logout,
    ]);

    useEffect(() => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }, [pacientes]);

    const eliminarPaciente = (id) => {
        const pacientesActualizados = pacientes.filter(
            (paciente) => paciente.id !== id
        );
        setPacientes(pacientesActualizados);
    };

    return (
        <div>
            {isLoggedIn() ? (
                <LoggedInView
                    user={user()}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                    onLogout={logout}
                />
            ) : (
                <LoggedOutView />
            )}
        </div>
    );
};

const LoggedInView = ({
    user,
    pacientes,
    setPacientes,
    paciente,
    setPaciente,
    eliminarPaciente,
    onLogout,
}) => {
    return (
        <div className="container mx-auto mt-20">
            <button
                onClick={onLogout}
                className="bg-red-500 text-white py-3 px-6 rounded mt-4 text-lg font-semibold hover:text-xl hover:font-bold transition-all duration-200"
            >
                Cerrar Sesión
            </button>
            <Header user={user} />            
            <div className="mt-12 md:flex">
                <Formulario
                    user={user}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPaciente
                    user={user}
                    pacientes={pacientes}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    );
};

export const LoggedOutView = () => (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col lg:flex-row w-full justify-center">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
                <div class="mt-0 sm:mt-[50%]  flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        HOME
                    </h1>
                    <div class="w-full flex-1 mt-8">
                        <div class="flex flex-col items-center">
                            <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-500 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <Link to="/login" className="w-full text-center">
                                    Login
                                </Link>
                            </button>
                            <button class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-500 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                <Link to="/register" className="w-full text-center">
                                    Registrate
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
                </div>
            </div>
        </div>
    </div>
);

export default Home;
