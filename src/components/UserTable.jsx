import { useState } from "react"
import { useNavigate } from 'react-router-dom' 
import { deleteUserById } from "../../http";

import Table from "./Table";
import SearchBar from "./SearchBar";
import Container from './Container';

export default function UserTable({ data }){
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");

    async function handleRemoveUser(id){
        try{
            await deleteUserById(id);
            data = data.filter((user) => user.id !== id);
        }catch(error){
            console.log(error.message);
        }
    }

    function handleEditUser(id){
        navigate('/edituser/' + id);
    };

    function handleFilter(value) {
        setFilter(value.toLowerCase());
    }

    const userColumns = [
        { label: 'Nome', field: 'name' },
        { label: 'E-mail', field: 'email', smallDisplay: false },
        { label: 'Telefone', field: 'phoneNumber' },
        { label: 'Tipo de Usuário', field: 'typeOfUser', smallDisplay: false , specialStyle: true},
    ];

    return (
        <>
            <Container title="Usuários">
                <SearchBar filterChange={handleFilter}/>
                <Table filter={filter} columns={userColumns} data={data} clickDelete={handleRemoveUser} clickEdit={handleEditUser}/>
            </Container>
        </>
    )
}

