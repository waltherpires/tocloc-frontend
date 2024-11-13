import { useEffect, useState } from "react"

import { deleteUserById, fetchAllUsers } from "../../http";

import Modal from "./Modal";
import MessagePage from "./MessagePage";
import Table from "./Table";

export default function UserTable(){
    const [isFetching, setIsFetching] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    useEffect(() =>{
        async function fetchUsers(){
            setIsFetching(true);
            try{
                const newUsers = await fetchAllUsers();
                setUsers(newUsers);
            }catch(error){
                console.log(error.message);
                setError(error.message);
            }
            setIsFetching(false);
        }
        
        fetchUsers();
    }, []);

    async function handleRemoveUser(id){
        setUsers((prevUsers) => 
            prevUsers.filter((user) => user.id !== id)
        );

        try{
            await deleteUserById(id);
        }catch(error){
            console.log(error.message);
            setUsers(users);
            setError(error.message)
        }
    }

    function handleEditUser(id){
        window.location = `http://localhost:5173/edituser/${id}`;
    };

    function handleError() {
        setError(null);
    }

    // let whiteRow = 'p-2 md:p-4 border-b border-slate-300 bg-slate-50';
    // let grayRow = 'p-2 md:p-4 border-b border-slate-300 bg-gray-200';

    const userColumns = [
        { label: 'Nome', field: 'name' },
        { label: 'E-mail', field: 'email', smallDisplay: false },
        { label: 'Telefone', field: 'phoneNumber' },
        { label: 'Tipo de Usuário', field: 'typeOfUser', smallDisplay: false },
    ];

    return (
        <>
            <Modal open={error} onClose={handleError}> 
                {error && <MessagePage title="Um erro ocorreu!" message={error} onConfirm={handleError} />}
            </Modal>
            <Table fetching={isFetching} columns={userColumns} data={users} clickDelete={handleRemoveUser} clickEdit={handleEditUser}/>
 
            {/* <table className="center text-left table-auto min-w-max rounded min-w-[121px] sm:min-w-[185px] md:min-w-[739px]">
                <thead>
                    <tr>
                        <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50">Nome</th>
                        <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50 hidden sm:table-cell">E-mail</th>
                        <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50 hidden md:table-cell">Telefone</th>
                        <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50 hidden md:table-cell">Tipo de Usuário</th>
                        <th className="p-2 md:p-4 border-b border-slate-300 bg-slate-50">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {isFetching && <tr className="bg-gray-100"><td className={`${whiteRow}`} colSpan={5}><p className="text-center
                    ">Carregando dados...</p></td></tr>}
                    {!isFetching && users && users.length > 0 && users.map((user) => 
                        (
                            <tr key={user.id} className="bg-gray-100">
                                <td className={`${user.id % 2 === 0 ? whiteRow: grayRow}`}>{user.name}</td>
                                <td className={`${user.id % 2 === 0 ? whiteRow: grayRow} hidden sm:table-cell`}>{user.email}</td>
                                <td className={`${user.id % 2 === 0 ? whiteRow: grayRow} hidden md:table-cell`}>{user.phoneNumber}</td>
                                <td className={`${user.id % 2 === 0 ? whiteRow: grayRow} hidden md:table-cell`}>{user.typeOfUser}</td>
                                <td className={`${user.id % 2 === 0 ? whiteRow: grayRow} space-x-2`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={() => handleEditUser(user)}>Editar</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded" onClick={() => handleRemoveUser(user.id)}>Excluir</button>
                                </td>   
                            </tr>
                        ) 
                    )}
                </tbody>
            </table> */}
        </>
    )
}