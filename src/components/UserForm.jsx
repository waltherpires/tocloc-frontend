import { useEffect } from 'react'

import { 
  Form, 
  useNavigation, 
  redirect, 
  json, useRouteLoaderData, 
  useNavigate} from "react-router-dom"

import Input from "./Input"
import { globalLoader } from "../util/auth";
import { action as logoutAction } from '../pages/Logout';

export default function UserForm({title , method, user }){
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { loggedUserId } = useRouteLoaderData('root');

  useEffect(() => {

    if (method === "PUT" && user.id != loggedUserId) {
      navigate('/');
    }

  }, [method, user, loggedUserId]);
  
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method={method} className="min-w-60 md:w-96 p-2 bg-[#F0F0F0] rounded-md shadow-md"> 
        <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>{title}</h1>       
        <hr className="mt-2 "/>

        <Input
          required 
          label="Nome"
          name="name" 
          id="name" 
          type="text"
          defaultValue={user ? user.name : ''}
          placeholder="Digite seu nome..."
        />

        <Input
          label="Nova Senha" 
          name="password"
          id="password"
          type="password"
          placeholder="Digite sua senha..." 
        />

        <Input
          required
          label="E-mail" 
          name="email"
          id="email" 
          defaultValue={user ? user.email : ''}
          placeholder="Digite seu e-mail..."
          type="email" 
        />

        <Input
          required
          label="Telefone"
          name="phoneNumber" 
          id="telefone" 
          defaultValue={user ? user.phoneNumber : ''}
          placeholder="Digite seu telefone..."
          type="tel"
          maxLength={11}
          minLength={9}
        />

        <div className="mt-2">
          <label className="block text-xs sm:text-sm md:text-base mb-1 md:mb-2">Tipo de Usuário</label>
          <select 
            name="typeOfUser" 
            defaultValue={user ? user.typeOfUser : 'USUARIO'}
            className="border w-full text-xs sm:text-sm px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          > 
            <option value="ANFITRIAO">Anfitrião</option>
            <option value="USUARIO">Usuário</option>
          </select>
        </div>

        <div className="mt-2">
          <button className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" disabled={isSubmitting}>
            {
              isSubmitting ? 'Enviando...'
              : user ? 'Salvar' : 'Criar'
            }
            </button>
        </div>
      </Form>
    )
}

export async function action({request, params}) {
  const method = request.method;
  const data = await request.formData();

  const userData = {
    name: data.get('name'),
    password: data.get('password'),
    email: data.get('email'),
    phoneNumber: data.get('phoneNumber'),
    typeOfUser: data.get('typeOfUser'),
  }

  let url = 'http://localhost:8080/users';

  let headers = {
    'Content-Type' : 'application/json',
  } 

  if(method === 'PUT'){
    const { token, loggedUserId } = globalLoader()
    url = 'http://localhost:8080/users/' + loggedUserId;

    headers = { 
      ...headers, 
      'Authorization' : `Bearer ${token}` 
    };
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(userData)
  });

  if(response.status === 422){
    return response;
  }

  if(!response.ok) {
    throw json({message: "Não foi possível salvar o usuário"}, {status: 500})
  }

  if(method === 'PUT'){
    logoutAction();
  }

  return redirect('/')
}