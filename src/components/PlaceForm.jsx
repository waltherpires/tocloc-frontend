import { useEffect } from 'react';
import { Form, json, redirect, useNavigate, useNavigation, useRouteLoaderData, useSubmit } from 'react-router-dom';

import Input from './Input';
import { globalLoader } from '../util/auth';

export default function PlaceForm({title , method, place }){
    const navigate = useNavigate();
    const { loggedUserId } = useRouteLoaderData('root');


    useEffect(() => {
        if (method === "PUT" && place.proprietario.id != loggedUserId) {
            navigate('/');
        }
    }, [method, place, loggedUserId]);


    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method={method} className="w-1/3 min-w-60 p-2 shadow-lg bg-white rounded-md" > 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa fa-compass mx-2" aria-hidden="true"></i>{title}</h1>
            <hr className="mt-2"/>
            <Input 
            label="Nome" 
            id="nome" 
            name="nome" 
            type="text" 
            defaultValue={place ? place.nome : ''}
            />
        
            <Input 
            label="Endereço" 
            id="endereco" 
            name="endereco" 
            type="text"
            defaultValue={place ? place.endereco : ''}
        
            />
        
            <Input 
            label="Capacidade" 
            id="capacidade" 
            name="capacidade" 
            type="number" 
            defaultValue={place ? place.capacidade : 0}
        
            />
        
            <Input 
            label="Tipo de Espaço" 
            id="tipo" 
            name="tipoEspaco" 
            type="text" 
            defaultValue={place ? place.tipoEspaco : ''}
        
            />
        
            <Input 
            label="Preço Hora (R$)" 
            id="precoPorHora" 
            name="precoPorHora" 
            type="number" 
            step="0.01"
            defaultValue={place ? place.precoPorHora : 0.0}
            />

            <Input 
                label="Descrição" 
                id="descricao" 
                name="descricao" 
                type="text" 
                defaultValue={place ? place.descricao : ''}
            />
        
            <div className="mt-2">
                <button className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" disabled={isSubmitting}>
                    {
                    isSubmitting ? 'Enviando...' 
                        : place ? 'Salvar' : 'Criar'
                    }
                </button>
            </div>
        </Form>
    )
}

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const { token, typeOfUser, loggedUserId } = globalLoader();

    if(typeOfUser !== "ANFITRIAO") {
        throw json({message: "Tipo de usuário inválido para esta operação"}, {status: 500})
    }

    const placeData = {
        nome: data.get('nome'),
        endereco: data.get('endereco'),
        descricao: data.get('descricao'),
        tipoEspaco: data.get('tipoEspaco'),
        capacidade: data.get('capacidade'),
        precoPorHora: data.get('precoPorHora'),
        proprietario: { id: loggedUserId },
    }

    let url = 'http://localhost:8080/locais/' + loggedUserId;

    if(method === 'PUT') {
        const placeId = params.placeId;
        if(!placeId) {
            throw json({ message: "ID do local não encontrado"}, {status: 400});
        }

        if(loggedUserId)
        url = 'http://localhost:8080/locais/' + placeId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(placeData)
    })

    if(response.status === 422){
        return response;
    }
    
    const responseData = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', responseData);

    if(!response.ok) {
        throw json({message: responseData.message || "Não foi possível salvar os dados do local"}, {status: 500})
    }

    return redirect('/locais')
}