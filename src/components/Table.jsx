export default function PlaceTable({ columns, data, clickEdit, clickDelete }){

  return (
    <table className="center text-left table-auto rounded min-w-[121px] sm:min-w-[185px] md:min-w-[739px]">
      <thead>
          <tr>
            {columns.map(
              (column, index) => (
                <th key={index} className="p-2 md:p-4 border-b border-slate-300 bg-slate-50">{column.label}</th>
              )  
            )}
            <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50">Ações</th>
          </tr>
      </thead>
      <tbody className="bg-gray-100">
        {data.length === 0 &&
          <tr className="hover:bg-gray-300">
            <td className="px-4 py-2 border-b" colSpan={columns.length + 1}><p className="text-center">Nenhuma informação foi encontrada!</p></td>
          </tr>
        } 
        {data.map((item, id) => 
        {
          console.log(item);
          return (
            <tr key={id} className="hover:bg-gray-300">
              {columns.map((column, index) => 
                (
                  <td key={index} className="px-4 py-2 border-b">{item[column.field]}</td>
                )
              )}
                <td className="flex flex-col md:flex-row gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 border-b">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={() => clickEdit(item.id)}>Editar</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" onClick={()=> clickDelete(item.id)}>Excluir</button>
                </td>
            </tr>
          )
        } 
        )}
      </tbody>
    </table>
  )
  
}