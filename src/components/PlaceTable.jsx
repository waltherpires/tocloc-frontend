import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { deletePlaceById, fetchAllPlaces } from '../../http';

import MessagePage from './MessagePage';
import Modal from './Modal';
import Table from './Table';

export default function PlaceTable(){
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();


  useEffect(() => {
    async function getAllPlaces(){
      setIsFetching(true);
      try{
        const newPlaces = await fetchAllPlaces();
        setPlaces(newPlaces);
      }catch(error){
        console.log(error.message);
      }finally{
        setIsFetching(false);
      }
    }

    getAllPlaces();
  }, []);

  async function handleRemovePlace(id){
    setPlaces((prevPlaces) => 
      prevPlaces.filter((place) => place.id !== id)
    )

    try{
      await deletePlaceById(id)
    }catch(error){
      console.log(error.message);
      setPlaces(places);
      setError(error.message);
    }
  }

  function handleEditPlace(id){
    navigate(`/editplace/${id}`);
  }

  function handleError() {
    setError(null);
  }

  const placesColumns = [
    { label: 'Nome' , field: 'nome' },
    { label: 'Endereço', field: 'endereco' },
    { label: 'Capacidade', field: 'capacidade', smallDisplay: false },
    { label: 'Preço Hora (R$)', field: 'precoPorHora' }
  ];

  return (
    <>
      <Modal open={error} onClose={handleError}> 
        {error && <MessagePage title="Um erro ocorreu!" message={error} onConfirm={handleError} />}
      </Modal>

      <Table fetching={isFetching} columns={placesColumns} data={places} clickDelete={handleRemovePlace} clickEdit={handleEditPlace}/>
    </>

  )
}