import { useState } from "react"; 

import Table from './Table';
import SearchBar from './SearchBar';
import Container from './Container';

export default function PlaceTable({data}){

  const [filter, setFilter] = useState("");

  const placesColumns = [
    { label: 'Nome' , field: 'nome' },
    { label: 'Endereço', field: 'endereco' },
    { label: 'Capacidade', field: 'capacidade', smallDisplay: false },
    { label: 'Preço Hora (R$)', field: 'precoPorHora' }
  ];

  function handleFilter(value) {
    setFilter(value.toLowerCase());
  }

  return (
    <>
      <Container title="Locais"> 
        <SearchBar filterChange={handleFilter}/>
        <Table filter={filter}  columns={placesColumns} data={data} />
      </Container>
    </>
  )
}