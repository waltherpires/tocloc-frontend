import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Header(){
    const [iconMenu, setIconMenu] = useState(true);

    let listClass = "md:static duration-500 md:top-[100%] absolute bg-white md:min-h-fit min-h-[60vh] left-0  md:w-auto w-full flex items-center px-5"

    function onToggleMenu(){
        setIconMenu(prevIcon => !prevIcon)
    }

    if(iconMenu){
       listClass += ` top-[-100%]`;
    }
    else{
        listClass += ` top-[9%]`;
    }

    return (
        <header className="bg-white font-primary">
            <nav className="mx-auto h-[10vh] flex justify-between items-center w-[92%] gap-4">
                <div className="">
                    <p className=" bg-neutral-800 px-2 rounded text-4xl text-center font-logo"><a className="text-white">TocLoc</a></p>
                </div>
                <div className={listClass}>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li><Link className="hover:text-gray-500" onClick={onToggleMenu} to="/">Home</Link></li>
                        <li><Link className="hover:text-gray-500" onClick={onToggleMenu} to="reservas">Reservas</Link></li>
                        <li><Link className="hover:text-gray-500" onClick={onToggleMenu} to="locais">Locais</Link></li>
                        <li><Link className="hover:text-gray-500" onClick={onToggleMenu} to="users">Usuários</Link></li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <Link className=" px-5 py-2 rounded-full bg-neutral-500 text-white hover:bg-neutral-900" to="login">Entrar</Link>
                    
                    {iconMenu && <IoMdMenu onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                    {!iconMenu && <IoMdClose onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                </div>
            </nav>
        </header>
    )
}