import { Spinner } from '@components/Spinner.tsx'
import type { Actualite } from '@models/Actualite.ts'
import { ArrowCircleLeft, X } from '@phosphor-icons/react'
import { getActualite } from '@services/strapi.ts'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ActualiteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [actualite, setActualite] = useState<Actualite>()
  const [loading, setLoading] = useState<boolean>(true)
  const [openedImage, setOpenedImage] = useState<{
    url: string
    alt: string
  } | null>(null)

  useEffect(() => {
    if (!id) return

    getActualite(id)
      .then((data) => {
        setActualite(data)
      })
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedImage(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <a className="cursor-pointer" onClick={() => navigate('/actualites')}>
        <ArrowCircleLeft
          className="text-secondary inline mr-2 align-top"
          size={24}
        />
        Retourner aux actualités
      </a>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {!actualite && <div>Actualité introuvable</div>}
          {actualite && (
            <>
              <h1 className="text-3xl font-bold mt-8 mb-2">
                {actualite.titre}
              </h1>
              <hr className="mb-4" />

              {actualite.contenu && (
                <BlocksRenderer
                  content={actualite.contenu}
                  blocks={{
                    list: ({ children }) => (
                      <ul className="text-md list-disc list-inside mb-2">
                        {children}
                      </ul>
                    ),
                    paragraph: ({ children }) => (
                      <p className="text-md mb-2 leading-relaxed">{children}</p>
                    ),
                    image: ({ image }) => (
                      <img
                        className="mx-auto max-h-100 cursor-zoom-in"
                        src={image.url}
                        alt={image.alternativeText || ''}
                        onClick={() =>
                          setOpenedImage({
                            url: image.url,
                            alt: image.alternativeText || '',
                          })
                        }
                      />
                    ),
                    link: ({ url, children, plainText }) => (
                      <a
                        href={url}
                        className="text-(--secondary-color) hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children || plainText || url}
                      </a>
                    ),
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      <div className="flex justify-center mt-8">
        <a
          className="cursor-pointer mb-4"
          onClick={() => navigate('/actualites')}
        >
          <ArrowCircleLeft
            className="text-secondary inline mr-2 align-top"
            size={24}
          />
          Retourner aux actualités
        </a>
      </div>

      {openedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpenedImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white cursor-pointer hover:bg-black/70"
            onClick={() => setOpenedImage(null)}
            aria-label="Fermer l'image"
          >
            <X size={24} />
          </button>

          <img
            className="max-w-full max-h-full object-contain"
            src={openedImage.url}
            alt={openedImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default ActualiteDetail
