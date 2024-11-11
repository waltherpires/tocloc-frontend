import axios from "axios";

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