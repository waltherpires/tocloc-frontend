import { useState } from "react" 

import Table from "./Table";
import SearchBar from "./SearchBar";
import Container from './Container';

export default function UserTable({ data }){
    const [filter, setFilter] = useState("");

    const userColumns = [
        { label: 'Nome', field: 'name' },
        { label: 'E-mail', field: 'email', smallDisplay: false },
        { label: 'Telefone', field: 'phoneNumber' },
        { label: 'Tipo de Usuário', field: 'typeOfUser', smallDisplay: false , specialStyle: true},
    ];

    function handleFilter(value) {
        setFilter(value.toLowerCase());
    }

    return (
        <>
            <Container title="Usuários">
                <SearchBar filterChange={handleFilter}/>
                <Table filter={filter} columns={userColumns} data={data} />
            </Container>
        </>
    )
}

