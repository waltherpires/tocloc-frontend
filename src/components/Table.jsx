export default function Table({ fetching, columns, data, clickEdit, clickDelete }){

  return (
    <table className="center text-left table-auto rounded min-w-[121px] sm:min-w-[185px] md:min-w-[739px]">
      <thead>
          <tr>
            {columns.map(
              (column, index) => (
                <th key={index} className={`px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base border-b border-r border-slate-300 bg-slate-50 ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}>{column.label}</th>
              )  
            )}
            <th className="px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base border-b border-r border-slate-300 bg-slate-50">Ações</th>
          </tr>
      </thead>
      <tbody className="bg-gray-100">
        {!fetching && data.length === 0 &&
          <tr className="hover:bg-gray-300">
            <td className="px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300" colSpan={columns.length + 1}><p className="text-center">Nenhuma informação foi encontrada!</p></td>
          </tr>
        }
        {fetching &&
          <tr className="hover:bg-gray-300">
            <td className="px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300" colSpan={columns.length + 1}><p className="text-center">Carregando dados...</p></td>
          </tr>
        } 
        {!fetching && data.map((item, id) => 
        {
          return (
            <tr key={id} className="hover:bg-gray-300">
              {columns.map((column, index) => 
                (
                  <td key={index} className={`px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300 ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}>{item[column.field]}</td>
                )
              )}
                <td className="flex flex-col md:flex-row gap-1 px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base font-bold py-2 px-3 rounded" onClick={() => clickEdit(item.id)}>Editar</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm md:text-base font-bold py-2 px-3 rounded" onClick={()=> clickDelete(item.id)}>Excluir</button>
                </td>
            </tr>
          )
        } 
        )}
      </tbody>
    </table>
  )
  
}