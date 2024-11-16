import { useState } from "react"; 
import { deletePlaceById } from '../../http';

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

  async function handleRemovePlace(id){

    try{
      await deletePlaceById(id)
      data = data.filter((place) => place.id !== id);
    }catch(error){
      console.log(error.message);
    }
  }

  function handleFilter(value) {
    setFilter(value.toLowerCase());
  }

  return (
    <>
      <Container title="Locais"> 
        <SearchBar filterChange={handleFilter}/>
        <Table filter={filter}  columns={placesColumns} data={data} clickDelete={handleRemovePlace}/>
      </Container>
    </>
  )
}