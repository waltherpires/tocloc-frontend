import { useRouteLoaderData, json, Link } from "react-router-dom"

import Container from "../components/Container"

export default function UserDetail(){
    const data = useRouteLoaderData('user-detail');

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <Container title="Dados do Usuário">
                {/* Botoes e campos */}
                <div className="flex flex-col gap-2 items-center md:justify-start">
                    {/* Campos */}
                    <div className="flex flex-col gap-2 md:flex-row ">
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Nome</h1>
                            <p className="text-center">{data.name}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">E-mail</h1>
                            <p className="text-center">{data.email}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Telefone</h1>
                            <p className="text-center">{data.phoneNumber}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Tipo de Usuário</h1>
                            <p className="text-center">{data.typeOfUser}</p>
                        </div>
                    </div>

                    {/* Botoes */}
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                        <Link className="bg-yellow-500 hover:bg-yellow-700 text-white w-16 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" to="edit" relative="path">Editar</Link>
                        {/* Fazer */}
                        <Link className="bg-red-500 hover:bg-red-700 text-white w-16 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" to="edit" relative="path">Excluir</Link>
                    </div>
                </div>



            </Container>
        </div>
    )
}

export async function loader({params}){
    const userId = params.userId;

    const response = await fetch('http://localhost:8080/users/' + userId);

    if(!response.ok){
        throw json(
            {message: "Erro ao carregar dados do usuário"}, 
            {status: 500}
        );
    }

    const data = await response.json();
    console.log("Dados carregados: ", data);
    
    return data;
}



