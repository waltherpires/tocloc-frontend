import { useState } from 'react';

import Table from './Table';
import SearchBar from './SearchBar';
import Container from './Container';

export default function ReservationTable({data, title}) {
    const [filter, setFilter] = useState("");

    const reservationColumn = [
        {label: 'Data', field: 'dataInicio'},
        {label: 'Início', field: 'horaInicio'},
        {label: 'Fim', field: 'horaFim'},
    ];

    function handleFilter(value) {
        setFilter(value.toLowerCase());
    }

    return (
        <>
            <Container title={title}>
                <SearchBar filterChange={handleFilter}/>
                <Table filter={filter} columns={reservationColumn} data={data} />
            </Container>
        </>
    )
}
