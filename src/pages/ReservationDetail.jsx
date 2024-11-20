import { useLoaderData, json, redirect, Form } from "react-router-dom";
import Container from "../components/Container";
import { globalLoader } from '../util/auth';


export default function ReservationDetail() {

    const data = useLoaderData();
    const { loggedUserId } = globalLoader();


    return (
        <div className="flex justify-center items-center h-[100vh]">
            <Container title="Dados da Reserva">
                <div className="flex flex-col gap-2 items-center md:justify-start">
                    {/* Campos */}
                    <div className="flex flex-col gap-2 md:flex-row">
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Local</h1>
                            <p className="text-center">{data.local.nome} - {data.local.endereco}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Dia</h1>
                            <p className="text-center">{data.dataInicio}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Horário</h1>
                            <p className="text-center">{data.horaInicio}-{data.horaFim}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Proprietário</h1>
                            <p className="text-center">{data.local.proprietario.name}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Locatário</h1>
                            <p className="text-center">{data.usuario.name}</p>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                        {(data.usuario.id == loggedUserId || data.local.proprietario.id == loggedUserId) &&
                            <Form method="delete">
                                <button className="bg-red-500 hover:bg-red-700 text-white w-20 p-2 text-center text-xs sm:text-sm md:text-base font-bold rounded"
                                >
                                    Excluir
                                </button>
                            </Form>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
}

export async function loader({ params }) {
    const { placeId, reservationId } = params;
    const { token } = globalLoader();

    const response = await fetch(`http://localhost:8080/locais/${placeId}/reservas/${reservationId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({ message: "Erro ao carregar dados da reserva!" }, { status: 500 });
    }

    const reservation = await response.json();
    const [dataF, horaF] = reservation.dataHoraFim.split('T');
    const [dataI, horaI] = reservation.dataHoraInicio.split('T');

    return {
        ...reservation,
        horaFim: horaF,
        horaInicio: horaI,
        dataFim: dataF,
        dataInicio: dataI,
    };
}

export async function action({ params, request }) {
    const { reservationId, placeId } = params;
    const { token } = globalLoader();

    const response = await fetch(`http://localhost:8080/locais/${placeId}/reservas/${reservationId}`, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({ message: "Erro ao deletar reserva!" }, { status: 500 });
    }

    return redirect('/locais');
}
