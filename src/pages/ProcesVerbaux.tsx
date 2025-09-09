import meetingLogo from '@assets/meeting.webp'
import {Spinner} from '@components/Spinner.tsx'
import WaveCard from '@components/WaveCard.tsx'
import type {ProcesVerbal} from '@models/ProcesVerbal.ts'
import {getProcesVerbaux} from '@services/strapi.ts'
import {useEffect, useState} from 'react'

export default function ProcesVerbaux() {
    const [procesVerbaux, setProcesVerbaux] = useState<ProcesVerbal[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getProcesVerbaux()
            .then((data) => {
                setProcesVerbaux(data.data || [])
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <h1 className="text-3xl font-bold mb-2">Procès-verbaux</h1>
            <hr className="mb-4"/>

            <p className="mb-8">
                Sur cette page, vous trouverez l’ensemble des procès-verbaux de nos
                réunions. Ces documents détaillent les discussions, les décisions et
                les actions prises tout au long de l’année par l’association. Ils
                sont indispensables pour rester informés sur l’évolution des projets
                de l’association et sur les initiatives mises en place pour
                améliorer la vie scolaire de nos enfants. Consultez régulièrement
                ces procès-verbaux pour suivre de près nos actions et découvrez
                comment vous pouvez vous impliquer davantage dans la vie de l’école.
            </p>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {procesVerbaux.map((procesVerbal) => (
                        <WaveCard
                            key={procesVerbal.titre}
                            hasPointer
                            title={procesVerbal.titre}
                            subtitle={`${new Date(procesVerbal.date).toLocaleDateString('fr-FR')}`}
                            imageUrl={meetingLogo}
                            imageAlt={`${procesVerbal.titre} du ${new Date(procesVerbal.date).toLocaleDateString('fr-FR')}`}
                            onClick={() =>
                                window.open(
                                    procesVerbal.compte_rendu.url,
                                    '_blank'
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
