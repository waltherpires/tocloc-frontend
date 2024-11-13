import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom' 
import { deleteUserById, fetchAllUsers } from "../../http";

import Modal from "./Modal";
import MessagePage from "./MessagePage";
import Table from "./Table";

export default function UserTable(){
    const navigate = useNavigate();
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
        navigate('/edituser/' + id);
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
        { label: 'Tipo de Usuário', field: 'typeOfUser', smallDisplay: false , specialStyle: true},
    ];

    return (
        <>
            <Modal open={error} onClose={handleError}> 
                {error && <MessagePage title="Um erro ocorreu!" message={error} onConfirm={handleError} />}
            </Modal>
            <Table fetching={isFetching} columns={userColumns} data={users} clickDelete={handleRemoveUser} clickEdit={handleEditUser}/>
        </>
    )
}