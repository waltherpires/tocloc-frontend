import UserForm from "../components/UserForm";

export default function CreateAccount(){

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]">
      <UserForm title="Cadastrar Usuário" method="POST"/>
    </div>
  )
}
