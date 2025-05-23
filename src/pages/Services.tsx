import {Spinner} from '@components/Spinner.tsx'
import WaveCard from '@components/WaveCard.tsx'
import type {Service} from '@models/Service.ts'
import {getServices} from '@services/strapi.ts'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Services() {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data.data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <h1 className="text-3xl font-bold mb-2">Locations</h1>
      <hr className="mb-4" />

      <p className="mb-8">
        L’Amicale Laïque propose un service de location de matériel à
        destination des familles, des associations et des collectivités. Ce
        service comprend la mise à disposition de matériel événementiel tel que
        des percolateurs, crêpières, machine à barbe à papa ou encore friteuses.
        Que ce soit pour une fête familiale, une manifestation locale ou un
        événement scolaire, notre matériel est disponible à des tarifs
        accessibles afin de soutenir la vie associative locale. N’hésitez pas à
        nous contacter pour connaître les conditions de location, les
        disponibilités et les modalités de retrait.
      </p>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {services.map((service) => (
              <WaveCard
                key={service.titre}
                hasPointer
                title={service.titre}
                imageUrl={service.thumbnail?.url}
                imageAlt={service.titre}
                onClick={() => navigate(`/services/${service.documentId}`)}
              />
            ))}
          </div>
        )}
    </div>
  )
}
