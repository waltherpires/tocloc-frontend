import { useParams } from "react-router-dom";
import { fetchUserById } from "../../http";
import { useEffect, useState } from "react";

import Input from '../components/Input';

export default function EditUser(){
  const { userId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  useEffect(() =>{
      async function fetchUser(){
          setIsFetching(true);
          try{
              const editUser = await fetchUserById(userId);
              setUser(editUser);
          }catch(error){
              console.log(error.message);
              setError(error.message);
          }
          setIsFetching(false);
      }
      
      fetchUser();
  }, []);

  function handleInputChange(event){

  }

  return (
    <div className="flex justify-center items-center h-[90vh]"> 
      <form className="w-1/3 p-6 shadow-lg bg-white rounded-md"> 
        <h1 className="text-3xl block text-center font-semibold"><i class="fa-solid fa-user mx-2"></i>Editar Usuário</h1> 
        <hr className="mt-3"/>             
        <Input 
          label="Nome" 
          id="username" 
          type="text" 
          value={user.name}
        />
        <Input 
          label="Nova Senha" 
          id="password" 
          type="password"
          placeholder="Digite sua nova senha" 
        />
        <Input 
          label="E-mail" 
          id="email" 
          type="email" 
          value={user.email}
        />
        <Input 
          label="Tipo de Usuário" 
          id="tipo" 
          type="text" 
          value={user.typeOfUser}
        />
        <div className="mt-5">
          <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
        </div>
      </form>
    </div>
  )
}