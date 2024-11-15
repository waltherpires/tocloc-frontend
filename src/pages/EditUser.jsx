import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUser } from "../../http";
import { useEffect, useState } from "react";

import Input from '../components/Input';
import Modal from '../components/Modal';
import MessagePage from '../components/MessagePage';
import Container from '../components/Container'

export default function EditUser(){
  const navigate = useNavigate();
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
                originalPhoneNumber: editUser.phoneNumber,
              });
          }catch(error){
              console.log(error.message);
              setError(error.message);
          }
          setIsFetching(false);
      }
      
      fetchUser();
  }, [userId]);

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
      phoneNumber: user.phoneNumber === '' ? user.originalPhoneNumber : user.phoneNumber,
    }

    // chechando se não houve nenhuma alteração
    const noChange = (
      updatedUser.name === user.originalName &&
      updatedUser.password === user.originalPassword &&
      updatedUser.email === user.originalEmail &&
      updatedUser.typeOfUser === user.originalTypeOfUser &&
      updatedUser.phoneNumber === user.originalPhoneNumber
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
    navigate('/users')
  }

  return (
    <>
      <Modal open={error || success} onClose={error ? handleError : handleSuccess}>
        {success && <MessagePage title="Sucesso!" message={success} onConfirm={handleSuccess}/> }
        {error && <MessagePage title="Um erro ocorreu" message={error} onConfirm={handleError} />}
      </Modal>
      <div className="overflow-auto flex justify-center items-center h-[100vh]">
        <Container>
          <form className="min-w-60 w-96 p-2 shadow-lg bg-[#F0F0F0] rounded-md shadow-md" onSubmit={handleSubmit}> 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Editar Usuário</h1> 
            {isFetching && 
              <h3 className="mt-2 block text-center">Carregando dados do usuário...</h3>
            }           
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
              maxlength={11}
              minlength={9}
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
          </form>
        </Container> 
      </div>
    </>

  )
}