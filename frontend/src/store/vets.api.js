import axios from 'axios';

export const getAllVets = () => {
    // return axios.get('http://127.0.0.1:8000/vets/api/v1/vets/');
    return axios.get('http://18.188.227.68:8000/vets/api/v1/vets/');
};

export const getVetsByUser = (userId) => {
    return axios.get(
        `http://18.188.227.68:8000/vets/api/v1/vets-by-user/${userId}/`
    );

    // return axios.get(
    //     `http://127.0.0.1:8000/vets/api/v1/vets-by-user/${userId}/`
    // );
};

export const createVet = (vet) => {
    return axios.post('http://18.188.227.68:8000/vets/api/v1/vets/', vet);
    // return axios.post('http://127.0.0.1:8000/vets/api/v1/vets/', vet);
};

export const deleteVet = (id) => {
    return axios.delete(`http://18.188.227.68:8000/vets/api/v1/vets/${id}/`);
    // return axios.delete(`http://127.0.0.1:8000/vets/api/v1/vets/${id}/`);
};

export const updateVet = (id, task) => {
    return axios.put(`http://18.188.227.68:8000/vets/api/v1/vets/${id}/`, task);
    // return axios.put(`http://127.0.0.1:8000/vets/api/v1/vets/${id}/`, task);
};
