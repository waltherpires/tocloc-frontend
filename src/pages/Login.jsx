
export default function Login(){
  return (
    <div className="flex justify-center items-center h-[90vh]"> 
      <div className="w-1/3 p-6 shadow-lg bg-white rounded-md"> 
        <h1 className="text-3xl block text-center font-semibold"><i class="fa-solid fa-user mx-2"></i>Login</h1> 
        <hr className="mt-3"/>      
        <div className="mt-3">
          <label for="username" className="block text-base mb-2">Usuário</label>
          <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Digite seu usuário..."/>  
        </div>
        <div className="mt-3">
          <label for="password" className="block text-base mb-2">Senha</label>
          <input type="password" id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Digite sua senha..."/>  
        </div>
        <div className="mt-3 flex justify-between items-center"> 
          <div>
            <input type="checkbox" className="mx-1"/>
            <label>Lembrar de mim?</label>
          </div>
          <div>
            <a href="#" className="text-indigo-800 font-semibold">Esqueceu sua senha?</a>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" >Entrar</button>
        </div>
      </div>
    </div>
  )
}