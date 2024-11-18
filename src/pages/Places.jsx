import {  json, useLoaderData } from 'react-router-dom'

import PlaceTable from "../components/PlaceTable";

export default function Places(){
  const data = useLoaderData();

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <PlaceTable title="Locais" data={data} />
    </div>
  )
}

export async function loader() {
  const response = await fetch('http://localhost:8080/locais');

  if(!response.ok){
      throw json({ message: "Erro ao tentar obter locais"}, {status: 500})
  }
    const data = response.json();
    return data;
}
