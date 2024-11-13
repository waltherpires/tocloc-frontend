import axios from "axios";

const rota = 'http://localhost:8080/'

// Users
export async function fetchAllUsers(){
    const response = await axios.get(rota + 'users');

    return response.data;
}

export async function fetchUserById(id){
    const response = await axios.get(rota + `users/${id}`)

    if(response.status > 400){
        throw new Error("Usuário não encontrado!")
    }

    return response.data;
}

export async function deleteUserById(id){
    const response = await axios.delete(rota + `users/${id}`);
    
    if(response.status > 400){
        throw new Error("Erro ao excluir usuário!")
    }

    return response.data;
}

export async function updateUser(id, body){
    const response = await axios.put(rota + `users/${id}`, body);

    if (response.status > 400) {
        throw new Error("Erro ao editar usuário!");
    }

    return response.data;
}

export async function createUser(body){
    const response = await axios.post(rota + 'users', body);

    if (response.status > 400) {
        throw new Error("Erro ao criar usuário!")
    }

    return response.data;
}

// Locais
export async function fetchAllPlaces(){
    const response = await axios.get(rota + 'locais');

    return response.data;
}

export async function fetchPlaceById(id){
    const response = await axios.get(rota + `locais/${id}`);

    if(response.status > 400){
        throw new Error("Local não encontrado!")
    }

    return response.data;
}

export async function updatePlace(id, body){
    const response = await axios.put(rota + `locais/${id}`, body);

    if (response.status > 400) {
        throw new Error("Erro ao editar local!");
    }

    return response.data;
} 

export async function deletePlaceById(id){
    const response = await axios.delete(rota + `locais/${id}`);
    
    if(response.status > 400){
        throw new Error("Erro ao excluir local!")
    }

    return response.data;
}
