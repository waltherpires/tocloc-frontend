import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchPlaceById, updatePlace } from '../../http'

import Input from '../components/Input';
import Modal from '../components/Modal';
import MessagePage from "../components/MessagePage";


export default function EditPlace(){
  const navigate = useNavigate();
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
  }, [placeId]);

  async function handleSubmit(event){
    event.preventDefault();

    try{
      await updatePlace(placeId, place);
      setSuccess('Local atualizado com sucesso!')
    }catch(error){
      setError(error.message);
    }
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
    navigate('/locais');
  }

  return (
    <>
      <Modal open={error || success } onClose={error ? handleError : handleSuccess}>
        {success && <MessagePage title="Sucesso!" message={success} onConfirm={handleSuccess}/> }
        {error && <MessagePage title="Um erro ocorreu" message={error} onConfirm={handleError} />}
      </Modal>
      
      <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
          <form className="w-1/3 min-w-60 p-2 shadow-lg bg-white rounded-md" onSubmit={handleSubmit}> 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa fa-compass mx-2" aria-hidden="true"></i>Editar Local</h1>
            <hr className="mt-2"/>
            <Input 
              label="Nome" 
              id="nome" 
              type="text" 
              value={place.nome || ''}
              onChange={(event) => handleInputChange('nome', event.target.value)}
            />

            <Input 
              label="Endereço" 
              id="endereco" 
              type="text"
              value={place.endereco || ''}
              onChange={(event) => handleInputChange('endereco', event.target.value)}
            />

            <Input 
              label="Capacidade" 
              id="capacidade" 
              type="number" 
              value={place.capacidade || 0}
              onChange={(event) => handleInputChange('capacidade', event.target.value)}
            />

            <Input 
              label="Tipo de Espaço" 
              id="tipo" 
              type="text" 
              value={place.tipoEspaco || ''}
              onChange={(event) => handleInputChange('tipoEspaco', event.target.value)}
            />

            <Input 
              label="Preço Hora (R$)" 
              id="tipo" 
              type="number" 
              value={place.precoPorHora || 0.0}
              onChange={(event) => handleInputChange('precoPorHora', event.target.value)}
            />

            <div className="mt-2">
              <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
            </div>
          </form>
        </div>
    </>
    
  )
}