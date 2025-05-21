import { Button } from '@components/Button.tsx';
import EventCarousel from '@components/EventCarousel.tsx';
import WaveCard from '@components/WaveCard.tsx';
import { Envelope } from '@phosphor-icons/react';
import {
  ADHESION_URL,
  NB_AMICALISTES,
  NB_EVENTS,
  NB_STUDENTS,
} from '@services/config.ts';
import { sendToHubSpot } from '@services/hubspot.ts';
import { getProchainsEvenements } from '@services/strapi.ts';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [evenements, setEvenements] = useState([]);
  const [hasSubscribeNewsletter, setHasSubscribeNewsletter] = useState(false);

  const newsletterSubmitButton = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProchainsEvenements().then((data) => setEvenements(data || []));
  }, []);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailInput = e.currentTarget.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    const email = emailInput?.value;

    if (email) {
      try {
        await sendToHubSpot(email); // Envoi des données à HubSpot
        toast.success('Merci de vous être inscrit à notre newsletter !');
        setHasSubscribeNewsletter(true);
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
        );
        console.error('Erreur HubSpot:', error);
      }
    }
  };

  return (
    <>
      <div className="bg-primary h-70 md:h-90">
        <EventCarousel events={evenements} />
      </div>

      <div className="container mx-auto px-8 py-8 md:px-24">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Qui sommes-nous ?</h2>
          <hr className="mb-4" />

          <p className="text-md mb-6 leading-relaxed">
            <strong className="font-semibold">
              L’Amicale Laïque de l’école Jules Verne
            </strong>{' '}
            est une association de parents bénévoles engagés pour soutenir les
            projets de l’école publique. Tout au long de l’année, nous
            organisons des événements festifs et solidaires — vide-greniers,
            bourses aux vêtements et aux jouets, marché de Noël, fête de
            l’école, parc de structures gonflables, ventes de gâteaux ou de
            saucissons — afin de récolter des fonds.
          </p>
          <p className="text-md mb-6 leading-relaxed">
            Les bénéfices de ces actions sont intégralement reversés à l’école
            pour financer des projets pédagogiques et surtout les sorties
            scolaires :<em>Puy du Fou</em>, <em>Planète Sauvage</em>,{' '}
            <em>Terra Botanica</em>, <em>le Moulin de l’Épinay</em>, journées
            poney pour les maternelles, et même des séjours au{' '}
            <em>Pouliguen</em> ou à <em>La Bourboule</em> pour les CM2 !
          </p>
          <p className="text-md font-semibold text-center mb-6">
            👉 Rejoignez-nous ! L’association a besoin de toutes les bonnes
            volontés.
            <br />
            Plus nous serons nombreux, plus nous pourrons offrir d’expériences
            riches et variées à nos enfants.
          </p>
          <p className="text-center">
            <Button
              label="Nous rejoindre !"
              onClick={() => window.open(ADHESION_URL, '_blank')}
            />
          </p>
        </section>

        {!hasSubscribeNewsletter && (
          <section className="relative bg-tertiary rounded-[3rem] mb-8 px-6 py-6 max-w-xl mx-auto text-center shadow-md">
            <div className="flex">
              <div className="flex-1 self-center">
                <h2 className="text-xl font-bold text-primary mb-4">
                  <Envelope
                    className="text-primary inline mr-2 align-middle"
                    size={32}
                  />
                  Pour rester informé des dernières nouvelles !
                </h2>

                <form
                  className="flex items-center justify-center gap-2 flex-wrap"
                  onSubmit={handleNewsletterSubmit}
                >
                  <input
                    type="email"
                    placeholder="Entrez votre adresse mail"
                    className="px-4 py-2 rounded-md w-64 max-w-full"
                    required
                  />
                  <Button
                    label="Go !"
                    onClick={() => newsletterSubmitButton.current?.click()}
                  />
                  <input ref={newsletterSubmitButton} type="submit" hidden />
                </form>
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Les chiffres de l'année
          </h2>
          <hr className="mb-6" />
          <div className="flex flex-wrap justify-around flex-col md:flex-row gap-6 justify-self-center md:justify-self-auto">
            <WaveCard
              nbCardsPerRow={3}
              title="Amicalistes engagés"
              number={NB_AMICALISTES}
            />
            <WaveCard
              nbCardsPerRow={3}
              title="Evénements organisés"
              number={NB_EVENTS}
            />
            <WaveCard nbCardsPerRow={3} title="Enfants" number={NB_STUDENTS} />
          </div>
        </section>
      </div>
    </>
  );
}
