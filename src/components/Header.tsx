import logo from '@assets/logo.jpg'
import {ADHESION_URL} from "@services/config.ts";
import {useState} from "react";
import {Link} from 'react-router-dom';

import {Button} from "./Button.tsx";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="mx-auto flex h-24 max-w-screen-xl items-center gap-8 px-4">
                <a className="block" href="/">
                    <span className="sr-only">Amicale Laïque Ecole Jules Verne</span>
                    <img src={logo} alt="Logo" className="h-16"/>
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-md">
                            <li>
                                <Link to="/">Accueil</Link>
                            </li>

                            <li>
                                <Link to="/actualites">Actualités</Link>
                            </li>

                            <li>
                                <Link to="/proces-verbaux">Procès-verbaux</Link>
                            </li>

                            <li>
                                <Link to="/a-propos">L'association</Link>
                            </li>

                            <li>
                                <Link to="/services">Nos services</Link>
                            </li>

                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <Button label="Nous rejoindre !"
                                    onClick={() => window.open(ADHESION_URL, '_blank')}/>
                        </div>

                        <button
                            className="block rounded-sm bg-gray-100 p-3 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            id="menu-button" aria-expanded={isMenuOpen} aria-haspopup="true"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute top-24 right-4 bg-white shadow-lg rounded-md px-6 py-4 md:hidden">
                                <ul className="flex flex-col gap-4 text-sm">
                                    <li>
                                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                                    </li>
                                    <li>
                                        <Link to="/actualites" onClick={() => setIsMenuOpen(false)}>Actualités</Link>
                                    </li>
                                    <li>
                                        <Link to="/proces-verbaux" onClick={() => setIsMenuOpen(false)}>Procès-verbaux</Link>
                                    </li>
                                    <li>
                                        <Link to="/a-propos" onClick={() => setIsMenuOpen(false)}>L'association</Link>
                                    </li>
                                    <li>
                                        <Link to="/services" onClick={() => setIsMenuOpen(false)}>Nos services</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
