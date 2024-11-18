import { useNavigate, Form } from "react-router-dom";

import Input from '../components/Input';

export default function EditPlace(){
  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
          <Form className="w-1/3 min-w-60 p-2 shadow-lg bg-white rounded-md" onSubmit={handleSubmit}> 
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
          </Form>
        </div>
    </>
    
  )
}