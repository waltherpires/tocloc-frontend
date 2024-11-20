import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";

import ReservationTable from "../components/ReservationTable";

export default function PlaceReservations(){
    const data = useLoaderData();

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <ReservationTable title="Reservas" data={data} />
        </div>
    )
}

export async function loader({params}){
    const { placeId } = params;
    const { token } = globalLoader();
    const response = await fetch('http://localhost:8080/locais/' + placeId + "/reservas", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw json({ message: "Erro ao tentar obter reservas deste local!"}, {status: 500})
    }

    const placeReservations = await response.json();

    // Converter valores das Datas de Inicio e Fim
    const parsedReservations = placeReservations.map(placeReservation => {
        const [dataF, horaF] = placeReservation.dataHoraFim.split('T')
        const [dataI, horaI] = placeReservation.dataHoraInicio.split('T')


        return {
            ...placeReservation,
            horaFim: horaF,
            horaInicio: horaI,
            dataFim: dataF,
            dataInicio: dataI
        };
    });


    return parsedReservations;
}