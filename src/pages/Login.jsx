import { useNavigate } from "react-router-dom"


export default function Login(){
  const navigate = useNavigate();

  function handleCreateAccount(){
    navigate('/users/new');
  }

  return (
    <div className="flex justify-center items-center h-[100vh]"> 
      <div className="sm:w-1/2 md:w-96 p-6 shadow-lg bg-white rounded-md"> 
        <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>Login</h1> 
        <hr className="mt-3"/>      
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">E-mail</label>
          <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Digite seu e-mail..."/>  
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="block text-base mb-2">Senha</label>
          <input type="password" id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Digite sua senha..."/>  
        </div>
        <div className="mt-3 flex justify-between gap-1 md:gap-2 items-center"> 
          <div>
            <input type="checkbox" className="mx-1"/>
            <label className="text-xs sm:text-s">Lembrar de mim?</label>
          </div>
          <div>
            <p className="text-indigo-800 text-xs sm:text-sm cursor-pointer" onClick={handleCreateAccount}><>Ainda não é cadastrado? <br /> Crie sua conta!</></p>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" >Entrar</button>
        </div>
      </div>
    </div>
  )
}