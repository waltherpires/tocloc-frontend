import { Outlet, useNavigation } from 'react-router-dom';
  
import Header from '../components/Header';
import Modal from '../components/Modal';
import MessagePage from '../components/MessagePage';

export default function RootLayout() {
    const navigation = useNavigation();

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