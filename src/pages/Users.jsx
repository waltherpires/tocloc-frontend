import {  json, useLoaderData } from 'react-router-dom'

import UserTable from "../components/UserTable";
import { getAuthToken } from '../util/auth';

export default function Users() {
    const data = useLoaderData();

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <UserTable data={data}/>
        </div>
    )
}

export async function loader() {

    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if(!response.ok){
        throw json({ message: "Erro ao tentar obter usuários"}, {status: 500})
    } 
    
    const data = response.json();
    return data;
}