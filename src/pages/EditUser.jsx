import { useRouteLoaderData } from "react-router-dom";

import UserForm from "../components/UserForm";

export default function EditUser(){
  const data = useRouteLoaderData('user-detail');
  console.log("detalhes: " + data)

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]">
      <UserForm title="Editar Usuário" user={data} method="PUT" />
    </div>
  )
}