import PlaceForm from "../components/PlaceForm";

export default function CreatePlace(){

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
      <PlaceForm title="Criar Local" method="POST" />
    </div>
  )
}