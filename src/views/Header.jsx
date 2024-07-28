import React from 'react';

function Header({ user }) {
    return (
        <div>
            {user && (
                <div className="text-center mt-4 bg-gray-100 p-4 rounded-md shadow-md font-bold uppercase">
                    <p className="text-5xl font-bold">Bienvenido:</p>
                    <p className="text-5xl">
                        <span className="text-indigo-600 font-bold">
                            {user.last_name}
                            {', '}
                            {user.first_name}
                        </span>
                    </p>
                </div>
            )}
            <h1 className="text-5xl font-black uppercase text-center md:w-2/3 mx-auto mt-5">
                Seguimiento Pacientes con GitHub{' '}
                <span className="text-indigo-600">Veterinaria</span>
            </h1>
        </div>
    );
}

export default Header;
