import { useParams } from "react-router-dom";

import ReservationForm from "../components/ReservationForm";

export default function CreateReservation(){
  const { placeId } = useParams();

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]">
      <ReservationForm title="Fazer Reserva" method="POST" placeId={placeId}/>
    </div>
  )
}
