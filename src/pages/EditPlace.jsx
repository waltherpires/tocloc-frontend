import { useRouteLoaderData } from "react-router-dom";

import PlaceForm from "../components/PlaceForm";

export default function EditPlace(){
  const data = useRouteLoaderData('place-detail');

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
      <PlaceForm title="Editar Local" place={data} method="PUT" />
    </div>
  )
}