import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
  
import Header from '../components/Header';
import Modal from '../components/Modal';
import MessagePage from '../components/MessagePage';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

export default function RootLayout() {
    const { token } = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();

    // Logout quando token expirar
    useEffect(() => {
        if(!token) {
            return;
        }

        if(token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'post'})
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'})
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <Header />
            <Modal open={navigation.state === "loading"}>
                {navigation.state === "loading" && <MessagePage title="Carregando..." message="Carregando os dados" />}
            </Modal>
            <main>
                <Outlet />
            </main>
        </>
    )
}