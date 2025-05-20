import {Button} from "@components/Button.tsx";
import type {Evenement} from "@models/Evenement.ts";
import {Calendar, MapPin} from "@phosphor-icons/react";
import {API_URL} from "@services/config.ts";
import {BlocksRenderer} from '@strapi/blocks-react-renderer';
import {useNavigate} from "react-router-dom";
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

type Props = {
    events: Evenement[];
};

export default function EventCarousel({events}: Props) {
    const navigate = useNavigate()

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            className="h-full"
            autoplay={{
                delay: 2
            }}
            loop
        >
            {events.map((event) => (
                <SwiperSlide key={event.id} className="h-full">
                    <div className="flex h-full ">
                        <div className="flex flex-grow test rounded-2xl mx-10 md:mx-20 my-10">
                            <div className="hidden md:flex items-center">
                                <img
                                    src={`${API_URL}${event.thumbnail.url}`}
                                    alt={event.titre}
                                    className="h-full pl-5 py-5"
                                />
                            </div>
                            <div className="flex-1 flex-grow py-2 md:py-5 px-2 md:px-5 text-primary items-center">
                                <div className="h-full px-2 py-2">
                                    <h2 className="text-center md:text-left text-2xl md:text-4xl font-semibold mb-2 text-secondary">{event.titre}</h2>

                                    <div className="flex flex-col md:flex-row gap-2 mb-4 ">
                                        <div className="flex">
                                            <Calendar className="inline text-tertiary pr-2" size={24}/> <span
                                            className="align-top text-white"> {new Date(event.date_heure_debut).toLocaleString("fr-FR")}</span>
                                            {event.date_heure_fin && <span
                                                className="align-top text-white"> - {new Date(event.date_heure_fin).toLocaleTimeString("fr-FR")}</span>}
                                        </div>
                                        <div className="flex">
                                            <MapPin className="inline text-tertiary pr-2" size={24}/> <span
                                            className="align-top text-white">{event.lieu}</span>
                                        </div>
                                    </div>

                                    <div className="hidden md:block overflow-hidden">
                                        <BlocksRenderer content={event.description} blocks={{
                                            list: ({children}) => <ul
                                                className="text-sm list-disc list-inside mb-2 text-white">{children}</ul>,
                                            paragraph: ({children}) => <p
                                                className="text-sm mb-2 leading-relaxed text-white">{children}</p>,
                                        }}/>
                                    </div>

                                    <div className="flex justify-center md:justify-start">
                                    {event.actualite && <Button label="En savoir plus"
                                                                onClick={() => navigate(`/actualites/${event.actualite.documentId}`)}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
