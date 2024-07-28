import React, { useEffect, useState } from 'react';
import { getVetsByUser, getAllVets, deleteVet, updateVet } from '../store/vets.api';

const ListadoPaciente = ({ pacientes, setPaciente, eliminarPaciente, user }) => {
    const [vets, setVets] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editVetId, setEditVetId] = useState(null);
    const [nombreEdit, setNombreEdit] = useState('');
    const [propietarioEdit, setPropietarioEdit] = useState('');
    const [descripcionEdit, setDescripcionEdit] = useState('');
    const [phoneNumberEdit, setPhoneNumberEdit] = useState('');
    const [sexoEdit, setSexoEdit] = useState('');
    const [edadEdit, setEdadEdit] = useState('');
    const [pesoEdit, setPesoEdit] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function loadVets() {
            try {
                // const res = await getAllVets();
                const res = await getVetsByUser(user.user_id);
                console.log('Datos recibidos:', res.data);
                setVets(res.data);
            } catch (error) {
                console.error('Error al cargar los veterinarios:', error);
            }
        }
        loadVets();
    }, [user.user_id]);
    // }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000); // 5 segundos
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleDeleteVet = async (id) => {
        try {
            await deleteVet(id);
            console.log('Veterinario eliminado:', id);
            // Actualizar la lista de veterinarios después de eliminar
            setVets(vets.filter((vet) => vet.id !== id));
            // Reiniciar confirmDeleteId después de la eliminación
            setConfirmDeleteId(null);
        } catch (error) {
            console.error('Error al eliminar el veterinario:', error);
        }
    };

    const confirmDelete = (id) => {
        // Mostrar cuadro de diálogo de confirmación antes de eliminar
        setConfirmDeleteId(id);
    };

    const editVet = (id, nombre, propietario, descripcion, phone_number, sexo, edad, peso) => {
        setEditMode(true);
        setEditVetId(id);
        setNombreEdit(nombre);
        setPropietarioEdit(propietario);
        setDescripcionEdit(descripcion);
        setPhoneNumberEdit(phone_number);
        setSexoEdit(sexo);
        setEdadEdit(edad);
        setPesoEdit(peso);
    };

    const saveEdit = async () => {
        try {
            // Guardar los cambios editados usando tu función de actualización de API
            await updateVet(editVetId, {
                name: nombreEdit,
                owner: propietarioEdit,
                description: descripcionEdit,
                phone_number: phoneNumberEdit,
                sexo: sexoEdit,
                edad: edadEdit,
                peso: pesoEdit
            });
            console.log(
                'Veterinario actualizado:',
                editVetId,
                nombreEdit,
                propietarioEdit,
                descripcionEdit,
                phoneNumberEdit,
                sexoEdit,
                edadEdit,
                pesoEdit
            );

            // Actualizar la lista de veterinarios después de editar
            setVets((prevVets) =>
                prevVets.map((vet) =>
                    vet.id === editVetId
                        ? {
                            ...vet,
                            name: nombreEdit,
                            owner: propietarioEdit,
                            description: descripcionEdit,
                            phone_number: phoneNumberEdit,
                            sexo: sexoEdit,
                            edad: edadEdit,
                            peso: pesoEdit
                          }
                        : vet
                )
            );

            // Mostrar mensaje de éxito
            setSuccessMessage('Veterinario actualizado correctamente');

            // Limpiar los estados de edición
            setEditMode(false);
            setEditVetId(null);
            setNombreEdit('');
            setPropietarioEdit('');
            setDescripcionEdit('');
            setPhoneNumberEdit('');
            setSexoEdit('');
            setEdadEdit('');
            setPesoEdit('');
        } catch (error) {
            console.error(
                'Error al guardar la edición del veterinario:',
                error
            );
        }
    };

    const cancelEdit = () => {
        // Cancelar la edición y limpiar los estados de edición
        setEditMode(false);
        setEditVetId(null);
        setNombreEdit('');
        setPropietarioEdit('');
        setDescripcionEdit('');
        setPhoneNumberEdit('');
        setSexoEdit('');
        setEdadEdit('');
        setPesoEdit('');
    };

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            <div className="mt-10">
                <h2 className="font-black text-3xl text-center">
                    Listado de Pacientes
                </h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Aquí puedes ver los {''}
                    <span className="text-indigo-600 font-bold">
                        Pacientes
                    </span>
                    {/* <p>ID: {user.user_id}</p> */}
                </p>

                {/* Mensaje de éxito */}
                {successMessage && (
                    <div
                        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-5"
                        role="alert"
                    >
                        <p className="font-bold">{successMessage}</p>
                    </div>
                )}

                {vets && vets.length > 0 ? (
                    vets.map((vet) => (
                        <div
                            key={vet.id}
                            className="mx-5 bg-white shadow-md px-5 py-10 rounded-xl mb-5"
                        >
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Mascotita: {''}
                                <span className="font-normal normal-case">
                                    {vet.name}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Propietario: {''}
                                <span className="font-normal normal-case">
                                    {vet.owner}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Descripción: {''}
                                <span className="font-normal normal-case">
                                    {vet.description}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Teléfono: {''}
                                <span className="font-normal normal-case">
                                    {vet.phone_number}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Sexo: {''}
                                <span className="font-normal normal-case">
                                    {vet.sexo}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Edad: {''}
                                <span className="font-normal normal-case">
                                    {vet.edad}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Peso: {''}
                                <span className="font-normal normal-case">
                                    {vet.peso}
                                </span>
                            </p>
                            <div className="flex justify-between mt-10">
                                <button
                                    type="button"
                                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                                    onClick={() =>
                                        editVet(
                                            vet.id,
                                            vet.name,
                                            vet.owner,
                                            vet.description,
                                            vet.phone_number,
                                            vet.sexo,
                                            vet.edad,
                                            vet.peso
                                        )
                                    }
                                    disabled={editMode}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                                    onClick={() => confirmDelete(vet.id)}
                                    disabled={editMode}
                                >
                                    Eliminar
                                </button>
                            </div>
                            {confirmDeleteId === vet.id && (
                                <div className="mt-3 text-center">
                                    <p className="text-red-600 font-bold">
                                        ¿Confirmar eliminación?
                                    </p>
                                    <button
                                        className="py-1 px-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg mt-2 mr-2"
                                        onClick={() => handleDeleteVet(vet.id)}
                                    >
                                        Sí
                                    </button>
                                    <button
                                        className="py-1 px-4 bg-gray-400 hover:bg-gray-500 text-white font-bold uppercase rounded-lg mt-2"
                                        onClick={() => setConfirmDeleteId(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                            {editMode && editVetId === vet.id && (
                                <div className="mt-3 text-center">
                                    <p className="text-indigo-600 font-bold">
                                        Editando Veterinario
                                    </p>
                                    <div className="mb-3">
                                        <label className="block text-gray-700 uppercase font-bold">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={nombreEdit}
                                            onChange={(e) =>
                                                setNombreEdit(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-gray-700 uppercase font-bold">
                                            Propietario
                                        </label>
                                        <input
                                            type="text"
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={propietarioEdit}
                                            onChange={(e) =>
                                                setPropietarioEdit(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-gray-700 uppercase font-bold">
                                            Descripción
                                        </label>
                                        <textarea
                                            type="text"
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={descripcionEdit}
                                            onChange={(e) =>
                                                setDescripcionEdit(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className="block text-gray-700 uppercase font-bold"
                                        >
                                            Teléfono
                                        </label>
                                        <input
                                            type="text"
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={phoneNumberEdit}
                                            onChange={(e) => setPhoneNumberEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className="block text-gray-700 uppercase font-bold"
                                        >
                                            Sexo
                                        </label>
                                        <select
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={sexoEdit}
                                            onChange={(e) => setSexoEdit(e.target.value)}
                                        >
                                            <option value="">Seleccione sexo</option>
                                            <option value="M">Macho</option>
                                            <option value="F">Hembra</option>
                                        </select>
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className="block text-gray-700 uppercase font-bold"
                                        >
                                            Edad
                                        </label>
                                        <input
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={edadEdit}
                                            onChange={(e) => setEdadEdit(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className="block text-gray-700 uppercase font-bold"
                                        >
                                            Peso
                                        </label>
                                        <input
                                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            value={pesoEdit}
                                            onChange={(e) => setPesoEdit(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="py-1 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg mt-2 mr-2"
                                            onClick={saveEdit}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="py-1 px-4 bg-gray-400 hover:bg-gray-500 text-white font-bold uppercase rounded-lg mt-2"
                                            onClick={cancelEdit}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center">
                        No hay veterinarios disponibles.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ListadoPaciente;
