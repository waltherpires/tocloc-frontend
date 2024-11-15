import { useRouteLoaderData, json, Link } from "react-router-dom"

import Container from "../components/Container"

export default function PlaceDetail(){
    const data = useRouteLoaderData('place-detail');

    return (
        <div className="flex justify-center mt-2 items-center min-h-screen">
            <Container title="Dados do Local">
                {/* Botoes e campos */}
                <div className="flex flex-col gap-2 items-center md:justify-start">
                    {/* Campos */}
                    <div className="flex flex-col gap-2 md:flex-row ">
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Nome</h1>
                            <p className="text-center">{data.nome}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Endereço</h1>
                            <p className="text-center">{data.endereco}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Tipo de Espaço</h1>
                            <p className="text-center">{data.tipoEspaco}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Capacidade</h1>
                            <p className="text-center">{data.capacidade}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Preço por Hora (R$)</h1>
                            <p className="text-center">{data.precoPorHora}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Proprietário</h1>
                            <p className="text-center">{data.proprietario.name}</p>
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
    const placeId = params.placeId;

    const response = await fetch('http://localhost:8080/locais/' + placeId);

    if(!response.ok){
        throw json(
            {message: "Erro ao carregar dados do local"}, 
            {status: 500}
        );
    }

    const data = await response.json();
    console.log("Dados carregados: ", data);
    
    return data;
}



