import React, { useState, useEffect } from 'react';
import { createVet, updateVet } from '../store/vets.api';
import Error from './Error';

const Formulario = ({ vets, setVets, user }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sexo, setSexo] = useState('');
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editVetId, setEditVetId] = useState(null);
    useEffect(() => {
        if (editMode && editVetId !== null) {
            const vet = vets.find((vet) => vet.id === editVetId);
            if (vet) {
                setNombre(vet.name);
                setPropietario(vet.owner);
                setDescripcion(vet.description);
                setPhoneNumber(vet.phone_number);
                setSexo(vet.sexo);
                setEdad(vet.edad);
                setPeso(vet.peso);
            }
        }
    }, [editMode, editVetId, vets]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            [
                nombre,
                propietario,
                descripcion,
                phoneNumber,
                sexo,
                edad,
                peso,
            ].includes('')
        ) {
            setError(true);
            return;
        }
        setError(false);

        const nuevoVet = {
            name: nombre,
            owner: propietario,
            description: descripcion,
            phone_number: phoneNumber,
            sexo: sexo,
            edad: edad,
            peso: peso,
            user: user.user_id,
        };

        try {
            if (editMode && editVetId !== null) {
                // Modo edición
                await updateVet(editVetId, nuevoVet);
                console.log('Veterinario actualizado:', editVetId, nuevoVet);
                setMensaje('¡Se actualizó el veterinario!');
            } else {
                // Modo creación
                const res = await createVet(nuevoVet);
                console.log('Veterinario agregado:', res.data);
                setMensaje('¡Se agregó un nuevo veterinario!');
            }

            setTimeout(() => {
                setMensaje(''); // Limpiar el mensaje después de 5 segundos
            }, 5000);

            // Actualizar la lista de veterinarios después de agregar o editar
            setVets((prevVets) => {
                if (editMode && editVetId !== null) {
                    // Actualizar el veterinario editado en la lista
                    return prevVets.map((vet) =>
                        vet.id === editVetId ? { ...vet, ...nuevoVet } : vet
                    );
                } else {
                    // Agregar el nuevo veterinario a la lista
                    return [...prevVets, { id: res.data.id, ...nuevoVet }];
                }
            });

            // Limpiar el formulario después de agregar o editar
            setNombre('');
            setPropietario('');
            setDescripcion('');
            setPhoneNumber('');
            setSexo('');
            setEdad('');
            setPeso('');
            setEditVetId(null);
            setEditMode(false);
        } catch (error) {
            console.error('Error al agregar o editar el veterinario:', error);
        }
    };

    const editVet = (id) => {
        setEditMode(true);
        setEditVetId(id);
    };

    const cancelEdit = () => {
        setEditMode(false);
        setEditVetId(null);
        setNombre('');
        setPropietario('');
        setDescripcion('');
        setPhoneNumber('');
        setSexo('');
        setEdad('');
        setPeso('');
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                {editMode ? 'Editar Veterinario' : 'Añadir Paciente'}
            </h2>
            {mensaje && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5 mb-5"
                    role="alert"
                >
                    <strong className="font-bold">Éxito:</strong> {mensaje}
                </div>
            )}
            <p className="text-lg mt-5 text-center mb-10">
                {editMode
                    ? 'Edita el veterinario seleccionado'
                    : 'Añade un nuevo veterinario y'}{' '}
                <span className="text-indigo-600 font-bold">Adminístralo</span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {error && <Error mensaje="Todos los campos son obligatorios" />}
                <div className="mb-5">
                    {/* <p>ID: {user.user_id}</p> */}
                    <label
                        htmlFor="nombre"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Mascotita
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre del veterinario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Propietario
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="descripcion"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        placeholder="Descripción"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} // Aquí he corregido setPropietario a setDescripcion
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phoneNumber"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Teléfono
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Número de teléfono"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sexo"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Sexo
                    </label>
                    <select
                        id="sexo"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option value="">Seleccione sexo</option>
                        <option value="M">Macho</option>
                        <option value="F">Hembra</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="edad"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Edad
                    </label>
                    <input
                        type="number"
                        id="edad"
                        placeholder="Edad (meses o años)"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="peso"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Peso
                    </label>
                    <input
                        type="number"
                        id="peso"
                        placeholder="Peso en kg"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={editMode ? 'Guardar Cambios' : 'Agregar Veterinario'}
                />
                {editMode && (
                    <button
                        type="button"
                        className="bg-gray-400 w-full p-3 text-white uppercase font-bold hover:bg-gray-500 cursor-pointer transition-all mt-4"
                        onClick={cancelEdit}
                    >
                        Cancelar Edición
                    </button>
                )}
            </form>
        </div>
    );
};

export default Formulario;
