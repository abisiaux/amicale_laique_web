import newsletter from "@assets/newsletter.png"
import {Button} from "@components/Button.tsx";
import EventCarousel from '@components/EventCarousel.tsx';
import WaveCard from "@components/WaveCard.tsx";
import {getProchainsEvenements} from '@services/api';
import {ADHESION_URL} from "@services/config.ts";
import {useEffect, useRef, useState} from 'react';

export default function Home() {
    const [evenements, setEvenements] = useState([]);
const newsletterSubmitButton = useRef<HTMLInputElement>(null)

    useEffect(() => {
        getProchainsEvenements().then((data) => setEvenements(data || []));
    }, []);

    return (

        <>
            <div className="bg-primary h-70 md:h-90">
                <EventCarousel events={evenements}/>
            </div>

            <div className="container mx-auto px-8 py-8 md:px-24">


                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mb-4">Qui sommes-nous ?</h2>
                    <hr className="mb-4"/>

                    <p className="text-md mb-6 leading-relaxed">
                        <strong className="font-semibold">L’Amicale Laïque de l’école Jules Verne</strong> est une
                        association de parents bénévoles engagés pour soutenir les projets de l’école publique.
                        Tout au long de l’année, nous organisons des événements festifs et solidaires — vide-greniers,
                        bourses aux vêtements et aux jouets, marché de Noël, fête de l’école, parc de structures
                        gonflables, ventes de gâteaux ou de saucissons — afin de récolter des fonds.
                    </p>
                    <p className="text-md mb-6 leading-relaxed">
                        Les bénéfices de ces actions sont intégralement reversés à l’école pour financer des projets
                        pédagogiques et surtout les sorties scolaires :
                        <em>Puy du Fou</em>, <em>Planète Sauvage</em>, <em>Terra Botanica</em>, <em>le Moulin de
                        l’Épinay</em>,
                        journées poney pour les maternelles, et même des séjours au <em>Pouliguen</em> ou à <em>La
                        Bourboule</em> pour les CM2 !
                    </p>
                    <p className="text-md font-semibold text-center mb-6">
                        👉 Rejoignez-nous ! L’association a besoin de toutes les bonnes volontés.<br/>
                        Plus nous serons nombreux, plus nous pourrons offrir d’expériences riches et variées à nos
                        enfants.
                    </p>
                    <p className="text-center">
                        <Button label="Nous rejoindre !"
                                onClick={() => window.open(ADHESION_URL, '_blank')}/>
                    </p>
                </section>

                <section
                    className="relative bg-tertiary rounded-[3rem] mb-8 px-6 py-6 max-w-xl mx-auto text-center shadow-md">
                    <img src={newsletter} alt="Newsletter"
                         className="absolute bottom-5 left-10 w-12 h-12 object-contain"/>

                    <h2 className="text-xl font-bold text-primary mb-4">
                        Pour rester informé des dernières nouvelles !
                    </h2>

                    <form className="flex items-center justify-center gap-2 flex-wrap">
                        <input
                            type="email"
                            placeholder="Entrez votre adresse mail"
                            className="px-4 py-2 rounded-md w-64 max-w-full"
                            required
                        />
                        <Button label="Go !" onClick={() => newsletterSubmitButton.current?.click()}/>
                        <input ref={newsletterSubmitButton} type="submit" hidden/>
                    </form>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-semibold mb-4">Les chiffres de l'année</h2>
                    <hr className="mb-6"/>
                    <div className="flex flex-wrap justify-around flex-col md:flex-row gap-6">
                        <WaveCard title='Amicalistes engagés' number={20}/>
                        <WaveCard title='Evénements organisés' number={20}/>
                        <WaveCard title='Enfants' number={300}/>
                    </div>
                </section>
            </div>
        </>
    );
}
