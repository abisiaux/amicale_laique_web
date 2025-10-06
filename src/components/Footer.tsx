import { FacebookLogo, WhatsappLogo } from '@phosphor-icons/react'
import { FACEBOOK_URL, HELLOASSO_URL, WHATSAPP_URL } from '@services/config.ts'

export default function Footer() {
  return (
    <footer className="py-6 mt-8">
      <div className="max-w-screen-xl container mx-auto px-4 text-sm ">
        <div className="flex justify-between flex-col md:flex-row gap-4 items-center">
          <div className="text-center">
            <p className="font-bold">Amicale Laïque - École Jules Verne</p>
            <p>77 allée Jules Verne, 44850 Ligné</p>
            <p>
              <a href="mailto:contact@aljvligne.fr"><span className="text-(--text-color) hover:text-(--secondary-color)">contact@aljvligne.fr</span></a>
            </p>
            <p>
              <a href="tel:+33768924838"><span className="text-(--text-color) hover:text-(--secondary-color)">07.68.92.48.38</span></a>
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href={FACEBOOK_URL}
              className="text-tertiary hover:text-(--secondary-color)"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookLogo size={36} />
            </a>
            <a
              href={WHATSAPP_URL}
              className="text-tertiary hover:text-(--secondary-color)"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsappLogo size={36} />
            </a>
            <a
              className="border-2 rounded-2xl p-1 text-tertiary h-8 my-auto"
              href={HELLOASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HelloAsso"
            >
              HelloAsso
            </a>
          </div>
          <div className="flex">
            <p>© {new Date().getFullYear()} Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
