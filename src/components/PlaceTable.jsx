import { useState } from "react"; 
import { Link, useRouteLoaderData } from 'react-router-dom';

import Table from './Table';
import SearchBar from './SearchBar';
import Container from './Container';

export default function PlaceTable({data, title}){
  const { typeOfUser } = useRouteLoaderData('root');

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
      <Container title={title}> 
        <SearchBar filterChange={handleFilter}/>
        {typeOfUser==="ANFITRIAO" && title === "Meus Locais" &&
          <Link className="px-5 py-2 rounded-full my-1 bg-neutral-500 text-white hover:bg-neutral-900" to="/locais/new">
            Adicionar Local
          </Link>
        }
        <Table filter={filter}  columns={placesColumns} data={data} />
      </Container>
    </>
  )
}