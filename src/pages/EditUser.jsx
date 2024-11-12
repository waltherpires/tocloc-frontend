import { useParams } from "react-router-dom";
import { fetchUserById } from "../../http";
import { useEffect, useState } from "react";

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



  return (
    <div className="flex justify-center items-center h-[90vh]"> 
      <form className="w-1/3 p-6 shadow-lg bg-white rounded-md"> 
        <h1 className="text-3xl block text-center font-semibold"><i class="fa-solid fa-user mx-2"></i>Editar Usuário</h1> 
        <hr className="mt-3"/>      
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">Nome</label>
          <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" value={user.name}/>  
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="block text-base mb-2">Nova Senha</label>
          <input type="password" id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Digite sua nova senha"/>  
        </div>
        <div className="mt-3">
          <label htmlFor="email" className="block text-base mb-2">E-mail</label>
          <input type="email" id="email" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" value={user.email}/>
        </div>
        <div className="mt-3">
          <label htmlFor="tipo" className="block text-base mb-2">Tipo de Usuário</label>
          <input type="text" id="tipo" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" value={user.typeOfUser}/>  
        </div>
        <div className="mt-5">
          <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
        </div>
      </form>
    </div>

  )
}