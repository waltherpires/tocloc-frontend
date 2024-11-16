import Input from "./Input"

export default function SearchBar({filterChange}){
  return (
    <div className="p-2 bg-slate-50 rounded my-2 max-w-60">
      <h1 className="text-center font-semibold text-xl"><i className="fa-solid fa-magnifying-glass mx-1"></i>Pesquisar</h1>
      <Input label="Procurar por:" id="search" type="search" onChange={(event) => filterChange(event.target.value)}/>
    </div>
  )
}