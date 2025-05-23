import {Button} from '@components/Button.tsx'
import {Spinner} from '@components/Spinner.tsx'
import type {Service} from '@models/Service.ts'
import {ArrowCircleLeft} from '@phosphor-icons/react'
import {getService} from '@services/strapi.ts'
import {BlocksRenderer} from '@strapi/blocks-react-renderer'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function ServiceDetail() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [service, setService] = useState<Service>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!id) return

        getService(id).then((data) => {
            setService(data)
        }).finally(() => setLoading(false))
    }, [id])

    if (!service) {
        return
    }

    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <a className="cursor-pointer" onClick={() => navigate('/services')}>
                <ArrowCircleLeft
                    className="text-secondary inline mr-2 align-top"
                    size={24}
                />
                Retourner aux locations
            </a>

            {loading ? (
                <Spinner/>
            ) : (

                <>
                    {!service && (<div>Location introuvable</div>)}
                    {service && (
                        <>
                            <h1 className="text-3xl font-bold mt-8 mb-2">{service.titre}</h1>
                            <hr className="mb-4"/>

                            <BlocksRenderer
                                content={service.description}
                                blocks={{
                                    list: ({children}) => (
                                        <ul className="text-md list-disc list-inside mb-2">{children}</ul>
                                    ),
                                    paragraph: ({children}) => (
                                        <p className="text-md mb-2 leading-relaxed">{children}</p>
                                    ),
                                    image: ({image}) => (
                                        <img
                                            className="mx-auto max-h-100"
                                            src={image.url}
                                            alt={image.alternativeText || ''}
                                        />
                                    ),
                                }}
                            />

                            <div className="flex justify-center mt-8">
                                <Button
                                    className="cursor-pointer"
                                    label="Demande de réservation"
                                    onClick={() =>
                                        navigate(`/contact?subject=location&location=${service?.titre}`)
                                    }
                                />
                            </div>
                        </>)}
                </>
            )}
            <div className="flex justify-center mt-8">
                <a
                    className="cursor-pointer mb-4"
                    onClick={() => navigate('/services')}
                >
                    <ArrowCircleLeft
                        className="text-secondary inline mr-2 align-top"
                        size={24}
                    />
                    Retourner aux locations
                </a>
            </div>
        </div>
    )
}

export default ServiceDetail
