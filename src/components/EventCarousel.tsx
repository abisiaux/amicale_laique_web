import { Button } from '@components/Button.tsx'
import type { Evenement } from '@models/Evenement.ts'
import { Calendar, MapPin } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
  events: Evenement[]
}

export default function EventCarousel({ events }: Props) {
  const navigate = useNavigate()
  const swiperRef = useRef<SwiperType>(null)

  const hasTime = (date: Date) =>
    date.getHours() !== 0 ||
    date.getMinutes() !== 0 ||
    date.getSeconds() !== 0 ||
    date.getMilliseconds() !== 0

  const isSameDay = (start: Date, end: Date) =>
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()

  return (
    <div
      className="h-full"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // 🔹 Stocke l’instance du Swiper
      >
        {events.map((event) => {
          const startDate = new Date(event.date_heure_debut)
          const endDate = new Date(event.date_heure_fin)

          return (
            <SwiperSlide key={event.id} className="h-full ">
              <div className="flex h-full">
                <div
                  className="
    relative flex flex-grow rounded-2xl mx-10 lg:mx-20 my-10
    bg-carousel
    bg-cover bg-center
    lg:bg-none"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-2xl lg:hidden"
                    style={{
                      backgroundImage: `url(${event.thumbnail.url})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-2xl lg:hidden" />
                  <div className="hidden lg:flex items-center">
                    <img
                      src={event.thumbnail.url}
                      alt={event.titre}
                      className="h-full pl-5 py-5 rounded-l-2xl object-cover"
                    />
                  </div>
                  <div className="relative flex-1 flex-grow py-2 lg:py-5 px-2 lg:px-5 text-primary items-center">
                    <div className="h-full px-2 py-2">
                      <h2 className="text-center lg:text-left text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 text-secondary">
                        {event.titre}
                      </h2>

                      <div className="flex flex-col xl:flex-row gap-2 mb-4 items-center lg:items-start">
                        <div className="flex">
                          <Calendar
                            className="inline text-tertiary pr-2"
                            size={24}
                          />
                          <span className="align-top text-white">
                            {startDate.toLocaleString('fr-FR', {
                              dateStyle: 'short',
                              timeStyle: hasTime(startDate)
                                ? 'short'
                                : undefined,
                            })}
                          </span>
                          {event.date_heure_fin && (
                            <>
                              <span className="pl-1 align-top text-white">
                                {'-'}
                              </span>
                              <span className="pl-1 align-top text-white">
                                {endDate.toLocaleString('fr-FR', {
                                  dateStyle: !isSameDay(startDate, endDate)
                                    ? 'short'
                                    : undefined,
                                  timeStyle: hasTime(endDate)
                                    ? 'short'
                                    : undefined,
                                })}
                              </span>
                            </>
                          )}
                        </div>
                        {event.lieu && (
                          <div className="flex">
                            <MapPin
                              className="inline text-tertiary pr-2"
                              size={24}
                            />
                            <span className="align-top text-white">
                              {event.lieu}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-center lg:text-left">
                        <p className="md:max-h-20 text-sm mb-2 leading-relaxed text-white multi-truncate">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex justify-center lg:justify-start">
                        {(event.actualite || event.lien_bouton) && (
                          <Button
                            label={event.titre_bouton || 'En savoir plus'}
                            onClick={() => {
                              if (event.lien_bouton) {
                                window.open(event.lien_bouton, '_blank')
                              } else if (event.actualite) {
                                navigate(
                                  `/actualites/${event.actualite.documentId}`
                                )
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
