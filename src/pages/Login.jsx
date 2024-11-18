import { useNavigate, Form, json, redirect } from "react-router-dom"

import Input from "../components/Input";

export default function Login(){
  const navigate = useNavigate();

  function handleCreateAccount(){
    navigate('/users/new');
  }

  return (
    <div className="flex justify-center items-center h-[100vh]"> 
      <Form method="POST" className="sm:w-1/2 md:w-96 p-6 shadow-lg bg-white rounded-md"> 
        <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Login</h1> 
        <hr className="mt-3"/>    

        <Input
          required
          label="E-mail" 
          name="email"
          id="email" 
          placeholder="Digite seu e-mail..."
          type="email" 
        />

        <Input
          label="Senha" 
          name="password"
          id="password"
          type="password"
          placeholder="Digite sua senha..." 
        />

        <div className="mt-3 flex justify-between gap-1 md:gap-2 items-center"> 
          <div>
            <p className="text-indigo-800 text-xs sm:text-sm cursor-pointer" onClick={handleCreateAccount}><>Ainda não é cadastrado? <br /> Crie sua conta!</></p>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" >Entrar</button>
        </div>
      </Form>
    </div>
  )
}

export async function action({request}) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const response = await fetch('http://localhost:8080/api/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Erro ao autenticar usuário'}, {status: 500});
  }

  const resData = await response.json();

  // Salvando Token no LocalStorage
  const token = resData.token;
  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 10);
  localStorage.setItem('expiration', expiration.toISOString());

  const userId = await getCurrentId(token);

  await getCurrentUser(userId, token);

  return redirect('/users/' + userId);
}

async function getCurrentId(token){
  const response = await fetch('http://localhost:8080/users/current',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Erro ao obter id do usuário'}, {status: 500});
  }

  const userId = await response.json();
  // Salvando id do usuário no LocalStorage
  localStorage.setItem('userId', userId);
  return userId;
}

async function getCurrentUser(id, token){
  const response = await fetch('http://localhost:8080/users/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Erro ao obter informações do usuário'}, {status: 500});
  }

  const resData = await response.json();

  const typeOfUser  = resData.typeOfUser;
  localStorage.setItem('typeOfUser', typeOfUser);

  return typeOfUser;
}