import { useRouteError } from "react-router-dom"

import Header from "../components/Header"
import Container from "../components/Container";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "Ocorreu um erro!";
    let message = "Algo deu errado!";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Nada Encontrado!";
        message = "Ops... Não encontramos nada aqui!"
    }

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-[90vh]">
               <Container title={title}>
                    <div className="p-2 bg-[#F0F0F0] rounded">
                        <p>{message}</p>
                    </div>
               </Container>
            </div>
        </>
    )
}