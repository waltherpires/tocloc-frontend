import {  json, useLoaderData } from 'react-router-dom'

import UserTable from "../components/UserTable";

export default function Users() {
    const data = useLoaderData();

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <UserTable data={data}/>
        </div>
    )
}

export async function loader() {
    const response = await fetch('http://localhost:8080/users');


    if(!response.ok){
        throw json({ message: "Erro ao tentar obter usuários"}, {status: 500})
    } 
    
    const data = response.json();
    return data;
}