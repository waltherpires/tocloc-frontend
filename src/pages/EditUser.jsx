import { Form, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";

import Input from '../components/Input';
import Container from '../components/Container'

export default function EditUser(){
  const data = useRouteLoaderData('user-detail');

  const [user, setUser] = useState(data);

  // carregando dados do backend

  //lidando com mudanças nos campos
  function handleInputChange(identifier, value){
    setUser((prevUser) => ({
      ...prevUser,
      [identifier]: value
    }))
  }

  return (
    <>
      <div className="overflow-auto flex justify-center items-center h-[100vh]">
        <Container>
          <Form method="PUT" className="min-w-60 w-96 p-2 bg-[#F0F0F0] rounded-md shadow-md"> 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Editar Usuário</h1>          
            <hr className="mt-2 "/>

            <Input
              required 
              label="Nome" 
              id="name" 
              type="text" 
              value={user.name}
              onChange={(event) => handleInputChange('name', event.target.value)}
            />

            <Input
              label="Nova Senha" 
              id="password" 
              type="password"
              placeholder="Digite sua nova senha" 
              onChange={(event) => handleInputChange('password', event.target.value)}
            />

            <Input
              required
              label="E-mail" 
              id="email" 
              type="email" 
              value={user.email}
              onChange={(event) => handleInputChange('email', event.target.value)}
            />

            <Input
              required
              label="Telefone" 
              id="telefone" 
              type="tel"
              maxLength={11}
              minLength={9}
              value={user.phoneNumber}
              onChange={(event) => handleInputChange('phoneNumber', event.target.value)}
            />

            <div className="mt-2">
              <label className="block text-xs sm:text-sm md:text-base mb-1 md:mb-2">Tipo de Usuário</label>
              <select 
                name="typeOfUser" 
                className="border w-full text-xs sm:text-sm px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                onChange={(event) => handleInputChange('typeOfUser', event.target.value)}
                value={user.typeOfUser}
              > 
                <option value="locador">Locador</option>
                <option value="locatario">Locatário</option>
                <option value="visitante">Visitante</option>
              </select>
            </div>

            <div className="mt-2">
              <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
            </div>
          </Form>
        </Container> 
      </div>
    </>
  )
}