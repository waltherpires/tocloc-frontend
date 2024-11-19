import {  json, useLoaderData } from 'react-router-dom'

import PlaceTable from "../components/PlaceTable";
import { globalLoader } from '../util/auth';

export default function MyPlaces(){
  const data = useLoaderData();

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <PlaceTable title="Meus Locais" data={data} />
    </div>
  )
}

export async function loader() {
  const { loggedUserId } = globalLoader();

  const response = await fetch('http://localhost:8080/locais');
  
  if(!response.ok){
    throw json({ message: "Erro ao tentar obter locais"}, {status: 500})
  }

  const places = await response.json();
  const placesOwner = places.filter(place => (String(place.proprietario.id) === loggedUserId));

  return placesOwner;
}
