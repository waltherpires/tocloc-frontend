export default function Table({ fetching, columns, data, clickEdit, clickDelete, filter = "" }){

  // Filtrando linhas da tabela
  const filteredData = data.filter((element) => {
    if (filter === ""){
      return element;
    }
    else{
      return Object.values(element).some((value) =>
        value?.toString().toLowerCase().includes(filter)
      );
    }
  })

  return (
      <table className="center text-left table-auto min-w-[121px] sm:min-w-[185px] md:min-w-[739px] rounded">
        <thead>
            <tr>
              {columns.map(
                (column, index) => (
                  <th key={index} className={`px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base border-b border-r border-slate-300 bg-[#F0F0F0] rounded-t-sm ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}>
                    {column.label}
                  </th>
                )  
              )}
              <th className="px-1 sm:px-2 md:px-4 py-4 text-xs sm:text-sm md:text-base border-b border-r border-slate-300 bg-[#F0F0F0]">Ações</th>
            </tr>
        </thead>
        <tbody className="bg-gray-100">
          {!fetching && filteredData.length === 0 &&
            <tr className="hover:bg-gray-300">
              <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300" colSpan={columns.length + 1}><p className="text-center">Nenhuma informação foi encontrada!</p></td>
            </tr>
          }
          {fetching &&
            <tr className="hover:bg-[#F0F0F0]">
              <td className="px-1 sm:px-2 md:px-2 py-2 text-xs sm:text-sm md:text-base  border-b border-r border-slate-300" colSpan={columns.length + 1}><p className="text-center">Carregando dados...</p></td>
            </tr>
          } 
          {!fetching && filteredData.map((item, id) => 
          {
            return (
              <tr key={id} className="hover:bg-gray-300">
                {columns.map((column, index) => 
                  (
                    <td key={index} className={`px-1 sm:px-2 md:px-4 py-1 text-xs sm:text-sm md:text-base max-w-48 border-b border-r border-slate-300 ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}>
                      {column.specialStyle && (
                        <div
                          className={`rounded text-center ${
                            item[column.field] === 'admin'
                            ? 'bg-yellow-400'
                            : item[column.field] === 'locatario'
                            ? 'bg-gray-500'
                            : 'bg-blue-300'
                            }
                          `}>{item[column.field]}</div>
                      )}
                      {!column.specialStyle && item[column.field]}
                      </td>
                  )
                )}
                  <td className="flex flex-col md:flex-row gap-1 px-1 sm:px-2 md:px-4 py-1 text-xs sm:text-sm md:text-base">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white text-xs sm:text-sm md:text-base font-bold py-2 px-3 rounded" onClick={() => clickEdit(item.id)}>Editar</button>
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