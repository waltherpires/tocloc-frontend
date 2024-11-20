import { Link } from "react-router-dom"

export default function Home(){
    return (
        <div className="
            flex
            min-h-screen 
            bg-[url('images/home-background.jpg')] 
            items-center
            justify-center
            bg-center 
            bg-cover 
            w-full
            sm:justify-start
            "
        >

            <div className='
                flex
                flex-col
                sm:flex-row
                text-white 
                m-10 
                p-4 
                rounded 
                bg-gradient-to-br 
                from-black
                w-fit
                '
            >
                <h1 className='font-logo font-bold text-7xl lg:text-8xl leading-normal'>Tocou<br/>Locou<br/>Jogou!</h1>

                <div className="flex flex-col justify-center sm:ml-3 lg:ml-12">
                    <p className="font-base text-xl lg:text-2xl">O lugar perfeito pro seu bem estar!</p>
                    <div className="mt-5 flex sm:flex-col gap-4">
                        <Link className="p-2 bg-[#F0F0F0] hover:bg-transparent border-2 border-[#F0F0F0] text-black hover:text-white max-w-36 rounded" to="/users/new">Criar Conta</Link>
                        <Link className="p-2 bg-[#F0F0F0] hover:bg-transparent border-2 border-[#F0F0F0] text-black hover:text-white max-w-36 rounded" to="/login">Entrar</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
