import { useParams } from "react-router-dom";
import { fetchUserById, updateUser } from "../../http";
import { useEffect, useState } from "react";

import Input from '../components/Input';
import Modal from '../components/Modal';
import MessagePage from '../components/MessagePage';

export default function EditUser(){
  const { userId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  // carregando dados do backend
  useEffect(() =>{
      async function fetchUser(){
          setIsFetching(true);
          try{
              const editUser = await fetchUserById(userId);
              setUser({
                ...editUser,
                originalName: editUser.name,
                originalPassword: editUser.password,
                originalEmail: editUser.email,
                originalTypeOfUser: editUser.typeOfUser,
              });
          }catch(error){
              console.log(error.message);
              setError(error.message);
          }
          setIsFetching(false);
      }
      
      fetchUser();
  }, []);

  //lidando com mudanças nos campos
  function handleInputChange(identifier, value){
    setUser((prevUser) => ({
      ...prevUser,
      [identifier]: value
    }))
  }

  // funcao para enviar o update 
  async function handleSubmit(event){
    event.preventDefault();

    // checando se existem campos vazios
    const updatedUser = {
      ...user,
      name: user.name === ''  ? user.originalName : user.name,
      password: user.password === '' ? user.originalPassword : user.password,
      email: user.email === '' ? user.originalEmail : user.email,
      typeOfUser: user.typeOfUser === '' ? user.originalTypeOfUser : user.typeOfUser,
    }

    // chechando se não houve nenhuma alteração
    const noChange = (
      updatedUser.name === user.originalName &&
      updatedUser.password === user.originalPassword &&
      updatedUser.email === user.originalEmail &&
      updatedUser.typeOfUser === user.originalTypeOfUser
    );

    try{
      if(noChange){
        throw new Error("Nenhum dado foi alterado!");
      }
      await updateUser(userId, updatedUser);
      setSuccess("Usuário atualizado com sucesso");
    }catch(error){
      console.error(error.message);
      setError(error.message);
    }
  }

  // limpar a mensagem de erro
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
        <form className="w-1/3 p-6 shadow-lg bg-white rounded-md" onSubmit={handleSubmit}> 
          <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Editar Usuário</h1> 
          {isFetching && 
            <h3 className="mt-2 block text-center">Carregando dados do usuário...</h3>
          }           
          <hr className="mt-3"/>

          <Input
            required 
            label="Nome" 
            id="name" 
            type="text" 
            value={user.name}
            onChange={(event) => handleInputChange('name', event.target.value)}
          />

          <Input
            required 
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
            label="Tipo de Usuário" 
            id="tipo" 
            type="text" 
            value={user.typeOfUser}
            onChange={(event) => handleInputChange('typeOfUser', event.target.value)}
          />

          <div className="mt-5">
            <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900">Salvar</button>
          </div>
        </form>
      </div>
    </>

  )
}