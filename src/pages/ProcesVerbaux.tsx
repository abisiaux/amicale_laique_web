import meetingLogo1 from '@assets/meeting1.webp'
import meetingLogo2 from '@assets/meeting2.webp'
import meetingLogo3 from '@assets/meeting3.webp'
import meetingLogo4 from '@assets/meeting4.webp'
import meetingLogo5 from '@assets/meeting5.webp'
import meetingLogo6 from '@assets/meeting6.webp'
import meetingLogo7 from '@assets/meeting7.webp'
import meetingLogo8 from '@assets/meeting8.webp'
import Pagination from '@components/Pagination.tsx'
import { Spinner } from '@components/Spinner.tsx'
import WaveCard from '@components/WaveCard.tsx'
import type { ProcesVerbal } from '@models/ProcesVerbal.ts'
import { getProcesVerbaux } from '@services/strapi.ts'
import { useEffect, useState } from 'react'

const LOGO_ARRAY = [
  meetingLogo1,
  meetingLogo2,
  meetingLogo3,
  meetingLogo4,
  meetingLogo5,
  meetingLogo6,
  meetingLogo7,
  meetingLogo8,
]

export default function ProcesVerbaux() {
  const [procesVerbaux, setProcesVerbaux] = useState<ProcesVerbal[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)

  useEffect(() => {
    getProcesVerbaux(currentPage)
      .then((data) => {
        setProcesVerbaux(data.data || [])
        setPageCount(data.meta.pagination.pageCount)
      })
      .finally(() => setLoading(false))
  }, [currentPage])

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <h1 className="text-3xl font-bold mb-2">Procès-verbaux</h1>
      <hr className="mb-4" />

      <p className="mb-8">
        Sur cette page, vous trouverez l’ensemble des procès-verbaux de nos
        réunions. Ces documents détaillent les discussions, les décisions et les
        actions prises tout au long de l’année par l’association. Ils sont
        indispensables pour rester informés sur l’évolution des projets de
        l’association et sur les initiatives mises en place pour améliorer la
        vie scolaire de nos enfants. Consultez régulièrement ces procès-verbaux
        pour suivre de près nos actions et découvrez comment vous pouvez vous
        impliquer davantage dans la vie de l’école.
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {procesVerbaux.map((procesVerbal, index) => (
              <WaveCard
                key={procesVerbal.titre}
                hasPointer
                title={procesVerbal.titre}
                subtitle={`${new Date(procesVerbal.date).toLocaleDateString('fr-FR')}`}
                imageUrl={LOGO_ARRAY[index]}
                imageAlt={`${procesVerbal.titre} du ${new Date(procesVerbal.date).toLocaleDateString('fr-FR')}`}
                onClick={() =>
                  window.open(procesVerbal.compte_rendu.url, '_blank')
                }
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  )
}
