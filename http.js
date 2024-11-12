import axios from "axios";

// Users
export async function fetchAllUsers(){
    const response = await axios.get('http://localhost:8080/users');

    return response.data;
}

export async function fetchUserById(id){
    const response = await axios.get(`http://localhost:8080/users/${id}`)

    if(response.status > 400){
        throw new Error("Usuário não encontrado")
    }

    return response.data;
}

export async function deleteUserById(id){
    const response = await axios.delete(`http://localhost:8080/users/${id}`);
    
    if(response.status > 400){
        throw new Error("Erro ao excluir usuário")
    }

    return response.data;
}

export async function updateUser(id, body){
    const response = await axios.put(`http://localhost:8080/users/${id}`, body);

    if (response.status > 400) {
        throw new Error("Erro ao editar usuário");
    }

    return response.data;
} 

// Locais
export async function fetchAllPlaces(){
    const response = await axios.get('http://localhost:8080/locais');

    return response.data;
}

export async function fetchPlaceById(id){
    const response = await axios.get(`http://localhost:8080/locais/${id}`);

    if(response.status > 400){
        throw new Error("Local não encontrado!")
    }

    return response.data;
}