import {Button} from "@components/Button.tsx";
import type {Evenement} from "@models/Evenement.ts";
import {Calendar, MapPin} from "@phosphor-icons/react";
import {API_URL} from "@services/config.ts";
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
            slidesPerGroup={1}
            navigation
            pagination={{clickable: true}}
            className="h-full"
            autoplay={true}
        >
            {events.map((event) => (
                <SwiperSlide key={event.id} className="h-full">
                    <div className="flex h-full ">
                        <div className="flex flex-grow bg-carousel rounded-2xl mx-10 lg:mx-20 my-10">
                            <div className="hidden lg:flex items-center">
                                <img
                                    src={`${API_URL}${event.thumbnail.url}`}
                                    alt={event.titre}
                                    className="h-full pl-5 py-5"
                                />
                            </div>
                            <div className="flex-1 flex-grow py-2 lg:py-5 px-2 lg:px-5 text-primary items-center">
                                <div className="h-full px-2 py-2">
                                    <h2 className="text-center lg:text-left text-2xl lg:text-4xl font-semibold mb-2 text-secondary">{event.titre}</h2>

                                    <div className="flex flex-col xl:flex-row gap-2 mb-4 items-center lg:items-start">
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

                                    <div className="hidden md:block text-center lg:text-left">
                                        <p className="md:max-h-20 text-sm mb-2 leading-relaxed text-white multi-truncate">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="flex justify-center lg:justify-start">
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
