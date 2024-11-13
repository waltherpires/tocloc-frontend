import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchPlaceById } from '../../http'

import Input from '../components/Input';
import Modal from '../components/Modal';
import MessagePage from "../components/MessagePage";

export default function EditPlace(){
  const { placeId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [place, setPlace] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    async function getPlace(){
      setIsFetching(true);
      try{
        const editPlace = await fetchPlaceById(placeId);
        setPlace({
          ...editPlace,
        });
      }catch(error){
        console.error(error.message);
        setError(error.message);
      }finally{
        setIsFetching(false);
      } 
    }

    getPlace();
  }, []);

  function handleSubmit(event){
    event.preventDefault();

    
  }

  function handleInputChange(identifier, value){
    setPlace((prevPlace) => ({
      ...prevPlace,
      [identifier]: value
    }))
  }

  function handleError() {
    setError(null);
  }

  // limpar a mensagem de sucesso
  function handleSuccess(){
    setSuccess(null);
  }

  return (
    <>
      <Modal open={error || success} onClose={error ? handleError : handleSuccess}>
        {success && <MessagePage title="Sucesso!" message={success} onConfirm={handleSuccess}/> }
        {error && <MessagePage title="Um erro ocorreu" message={error} onConfirm={handleError} />}
      </Modal>
      <div className="flex justify-center items-center h-[90vh]"> 
          <form className="sm:w-80 md:w-96 p-6 shadow-lg bg-white rounded-md" onSubmit={handleSubmit}> 
            <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Editar Local</h1> 
            <hr className="mt-3"/>

            <Input 
              label="Nome" 
              id="nome" 
              type="text" 
              value={place.nome}
              onChange={(event) => handleInputChange('nome', event.target.value)}
            />

            <Input 
              label="Endereço" 
              id="endereco" 
              type="text"
              value={place.endereco}
              onChange={(event) => handleInputChange('endereco', event.target.value)}
            />

            <Input 
              label="Capacidade" 
              id="capacidade" 
              type="number" 
              value={place.capacidade}
              onChange={(event) => handleInputChange('email', event.target.value)}
            />

            <Input 
              label="Tipo de Espaço" 
              id="tipo" 
              type="text" 
              value={place.tipoEspaco}
              onChange={(event) => handleInputChange('tipoEspaco', event.target.value)}
            />

            <div className="mt-5">
              <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
            </div>
          </form>
        </div>
    </>
    
  )
}