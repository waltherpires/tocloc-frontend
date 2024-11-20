import { Form, json, redirect, useNavigation } from 'react-router-dom';

import Input from './Input';
import { globalLoader } from '../util/auth';

export default function PlaceForm({title , method }){
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    let now = new Date();
    let maxDate = new Date(now);
    maxDate.setMonth(maxDate.getMonth() + 2);

    now = now.toISOString().slice(0, 16);
    maxDate = maxDate.toISOString().slice(0,16);

    return (
        <Form method={method} className="w-1/3 min-w-60 p-2 shadow-lg bg-white rounded-md" > 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa fa-compass mx-2" aria-hidden="true"></i>{title}</h1>
            <hr className="mt-2"/>

            <Input type="datetime-local" label="Data/Hora Início" id="reservationtime" name="reservationtime" defaultValue={now} min={now} max={maxDate}/>

            <Input type="datetime-local" label="Data/Hora Fim" id="reservationend" name="reservationend" defaultValue={now} min={now} max={maxDate}/>

            <div className="mt-2">
                <button className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" disabled={isSubmitting}>
                    { isSubmitting ? 'Enviando...' : 'Reservar' }
                </button>
            </div>
        </Form>
    )
}

export async function action({request, params}){
    const { placeId } = params;
    const data = await request.formData();
    const { token, typeOfUser, loggedUserId } = globalLoader();

    if(!typeOfUser || typeOfUser === "VISITANTE" ) {
        throw json({message: "Tipo de usuário inválido para esta operação"}, {status: 500})
    }

    const reservationData = {
        dataHoraInicio: data.get("reservationtime"),
        dataHoraFim: data.get("reservationend")
    }

    //"/{localId}/locar/{usuarioId}"
    let url = 'http://localhost:8080/locais/' + placeId + '/locar/' + loggedUserId;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData)
    })

    if(response.status === 422){
        return response;
    }
    
    const responseData = await response.json();

    if(!response.ok) {
        throw json({message: responseData.message || "Não foi possível salvar os dados da reserva"}, {status: 500})
    }

    return redirect('/locais/' + placeId + "/reservations");
}