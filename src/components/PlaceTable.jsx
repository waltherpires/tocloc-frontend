import { useEffect, useState } from "react"

import { fetchAllPlaces } from '../../http'

import Table from './Table';

export default function PlaceTable(){
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getAllPlaces(){
      try{
        const newPlaces = await fetchAllPlaces();
        setPlaces(newPlaces);
      }catch(error){
        console.log(error.message);
      }
    }

    getAllPlaces();
  }, []);

  function handleRemovePlace(){
    //fazer
  }

  function handleEditPlace(id){
    window.location = `http://localhost:5173/editplace/${id}`;
  }

  const placesColumns = [
    { label: 'Nome' , field: 'nome' },
    { label: 'Endereço', field: 'endereco' },
    { label: 'Capacidade', field: 'capacidade' },
    { label: 'Preço por Hora', field: 'precoPorHora' }
  ];

  return (
    <Table columns={placesColumns} data={places} clickDelete={handleRemovePlace} clickEdit={handleEditPlace}/>
  )
}