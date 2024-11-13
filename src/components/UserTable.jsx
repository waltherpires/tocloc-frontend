import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom' 
import { deleteUserById, fetchAllUsers } from "../../http";

import Modal from "./Modal";
import MessagePage from "./MessagePage";
import Table from "./Table";
import SearchBar from "./SearchBar";

export default function UserTable(){
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const [filter, setFilter] = useState("");

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

    function handleFilter(value) {
        let valueToLower = value.toLowerCase();
        setFilter(valueToLower);
    }

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
            <div className="p-3 sm:px-5 sm:py-8 bg-neutral-900 flex flex-col gap-1 justify-start items-center rounded">
                <h1 className="md:text-6xl font-logo text-center font-bold text-white shadow-md mb-3 sm:mb-6">Usuários</h1>
                <SearchBar filterChange={handleFilter}/>
                <Table filter={filter} fetching={isFetching} columns={userColumns} data={users} clickDelete={handleRemoveUser} clickEdit={handleEditUser}/>
            </div>
        </>
    )
}