import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";

import ReservationTable from "../components/ReservationTable";

export default function MyReservations(){
    const data = useLoaderData();

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <ReservationTable title="Minhas Reservas" data={data} />
        </div>
    )
}

export async function loader(){
    const { loggedUserId, token } = globalLoader();

    const response = await fetch('http://localhost:8080/reservas/usuario/' + loggedUserId,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw json({ message: "Erro ao tentar obter locais"}, {status: 500})
    }

    const myReservations = await response.json();
    console.log(myReservations);

    return myReservations;

}