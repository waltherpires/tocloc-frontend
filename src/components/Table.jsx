import { Link, useLocation } from "react-router-dom";

export default function Table({ columns, data = [], filter = ""}){
  
  // obter rota atual
  const location = useLocation();
  const path = location.pathname;

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
      <table className="
        center 
        text-left 
        table-auto 
        rounded"
      >
        <thead>
            <tr>
              {columns.map(
                (column, index) => (
                  <th key={index} className={`
                    px-1 
                    sm:px-2 
                    md:px-4 
                    py-4 
                    text-xs 
                    sm:text-sm 
                    md:text-base
                    text-center 
                    border-b border-r
                  border-slate-300 
                  bg-[#F0F0F0] 
                    rounded-t-sm ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}
                  >
                    {column.label}
                  </th>
                )  
              )}
              <th className="
                px-1 
                sm:px-2 
                md:px-4 
                py-4 
                text-xs 
                sm:text-sm 
                md:text-base 
                text-center
                border-b 
                border-r 
                border-slate-300 
                bg-[#F0F0F0]"
              >
                Ações
              </th>
            </tr>
        </thead>
        <tbody className="bg-[#F0F0F0]">
          {filteredData.length === 0 &&
            <tr className="hover:bg-gray-300">
              <td className="
                px-1 
                sm:px-2 
                md:px-4 
                py-2 
                text-xs 
                sm:text-sm 
                md:text-base  
                border-b border-r
              border-slate-300" 
                colSpan={columns.length + 1}
              >
                <p className="text-center">Nenhuma informação foi encontrada!</p>
              </td>
            </tr>
          }
          {filteredData.map((item, id) => 
          {
            return (
              <tr key={id} className="hover:bg-[#d8d8d8]">
                {columns.map((column, index) => 
                  (
                    <td key={index} className={`
                      px-1 
                      sm:px-2 
                      md:px-4 
                      py-1 
                      text-sm 
                      md:text-base
                      text-center
                      max-w-48 
                      border-b 
                      border-r 
                      border-slate-300 
                      ${column.smallDisplay === false ? 'hidden sm:table-cell' : ''}`}
                    >
                      {item[column.field]}
                    </td>
                  )
                )}
                  <td className={`
                    px-1 
                    py-3 
                    sm:px-2 
                    md:px-4 
                    text-xs 
                    sm:text-sm 
                    md:text-base 
                    max-w-48
                    text-center
                    border-b 
                    border-r 
                    border-slate-300`}
                  >
                    <Link className="
                      bg-green-500 
                      hover:bg-green-700  
                      text-white 
                      text-center 
                      text-sm 
                      md:text-base 
                      font-bold 
                      py-2 
                      px-3 
                      rounded" 
                      to={path == "/locais/meuslocais" ? `/locais/${item.id}` : `${item.id}`} 
                      relative="path"
                    >
                      Detalhes
                    </Link>
                  </td>
              </tr>
            )
          } 
          )}
        </tbody>
      </table>
  ) 
}