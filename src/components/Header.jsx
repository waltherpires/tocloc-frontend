import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Header(){
    const navigate = useNavigate();
    const [iconMenu, setIconMenu] = useState(true);

    let listClass = "md:static duration-500 md:top-[100%] absolute bg-white md:min-h-fit min-h-[60vh] left-0  md:w-auto w-full flex items-center px-5"

    function onToggleMenu(url){
        setIconMenu(prevIcon => !prevIcon);

        navigate(url);
    }

    if(iconMenu){
       listClass += ` top-[-100%]`;
    }
    else{
        listClass += ` top-[9%]`;
    }

    return (
        <header className="bg-white font-primary min-h-[40px]">
            <nav className="mx-auto py-1 min-h-[10vh] flex justify-between items-center w-[92%] gap-4">
                <div className="">
                    <p className=" bg-neutral-800 px-2 rounded text-4xl text-center font-logo"><a className="text-white">TocLoc</a></p>
                </div>
                <div className={listClass}>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li className="hover:text-gray-500" onClick={() => onToggleMenu('/')} >Home</li>
                        <li className="hover:text-gray-500" onClick={() => onToggleMenu()} >Reservas</li>
                        <li className="hover:text-gray-500" onClick={() => onToggleMenu('/locais')} >Locais</li>
                        <li className="hover:text-gray-500" onClick={() => onToggleMenu('/users')} >Usuários</li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-5 py-2 rounded-full bg-neutral-500 text-white hover:bg-neutral-900" onClick={() => onToggleMenu('/login')}>Entrar</button>
                    
                    {iconMenu && <IoMdMenu onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                    {!iconMenu && <IoMdClose onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                </div>
            </nav>
        </header>
    )
}