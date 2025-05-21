import { Button } from '@components/Button.tsx';
import { Email } from '@components/Email.tsx';
import Plunk from '@plunk/node';
import { render } from '@react-email/components';
import {
  EMAIL_ADDRESS,
  PLUNK_API_KEY,
  RECAPTCHA_KEY,
} from '@services/config.ts';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

type FormValues = {
  name: string;
  surname: string;
  childClass: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      subject: searchParams.get('subject') || '',
      message: searchParams.get('service')
        ? `Service : ${searchParams.get('service')}`
        : '',
    },
  });

  const contactSubmitButton = useRef<HTMLInputElement>(null);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const plunk = new Plunk(PLUNK_API_KEY);

  const onSubmit: SubmitHandler<FormValues> = async ({
    name,
    surname,
    childClass,
    email,
    subject,
    message,
  }: FormValues) => {
    if (!recaptcha.current?.getValue()) {
      toast.error('Veuillez résoudre le captcha');
      return;
    }

    const emailHtml = await render(
      <Email
        sender={{
          name,
          surname,
          childClass,
          email,
        }}
        message={message}
      />
    );

    plunk.emails
      .send({
        to: EMAIL_ADDRESS,
        subject: `[${subject.toUpperCase()}]`,
        body: emailHtml,
      })
      .then(() => {
        reset();
        toast.success('Votre message a été envoyé !');
      })
      .catch(() => {
        toast.error(
          "Une erreur est survenue lors de l'envoi de votre message."
        );
      });
  };

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <hr className="mb-4" />

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mb-4 flex-col xl:flex-row gap-4">
              <div className="w-full xl:w-1/3">
                <label htmlFor="name" className="block text-md font-bold">
                  Nom :
                </label>
                <input
                  {...register('name')}
                  id="name"
                  name="name"
                  required
                  type="text"
                  className="px-4 py-2 rounded-md w-full"
                  placeholder="Votre nom"
                />
              </div>
              <div className="w-full xl:w-2/3">
                <label htmlFor="surname" className="block text-md font-bold">
                  Prénom :
                </label>
                <input
                  {...register('surname')}
                  id="surname"
                  name="surname"
                  required
                  type="text"
                  className="px-4 py-2 rounded-md w-full"
                  placeholder="Votre prénom"
                />
              </div>
            </div>
            <div className="flex mb-4 flex-col xl:flex-row gap-4">
              <div className="w-full xl:w-1/3">
                <label htmlFor="childClass" className="block text-md font-bold">
                  Classe :
                </label>
                <input
                  {...register('childClass')}
                  id="childClass"
                  name="childClass"
                  type="text"
                  className="px-4 py-2 rounded-md w-full"
                  placeholder="Classe de l'enfant"
                />
              </div>
              <div className="w-full xl:w-2/3">
                <label htmlFor="email" className="block text-md font-bold">
                  Email :
                </label>
                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  required
                  type="email"
                  className="px-4 py-2 rounded-md w-full"
                  placeholder="Votre adresse email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-md font-bold">
                Objet :
              </label>

              <select
                {...register('subject')}
                id="subject"
                name="subject"
                required
                className="px-4 py-2 rounded-md w-full"
              >
                <option disabled selected value="">
                  Choisir un objet
                </option>
                <option value="commande">
                  Question par rapport à une commande
                </option>
                <option value="evenement">
                  Question sur l'organisation d'un événement
                </option>
                <option value="association">Question sur l'association</option>
                <option value="service">
                  Demande de réservation de service
                </option>
                <option value="autre">Autre demande</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-md font-bold">
                Message :
              </label>
              <textarea
                {...register('message')}
                id="message"
                name="message"
                required
                rows={8}
                className="px-4 py-2 rounded-md w-full"
                placeholder="Écrivez votre message ici..."
              ></textarea>
            </div>
            <div className="mb-4 flex justify-center">
              <ReCAPTCHA sitekey={RECAPTCHA_KEY} ref={recaptcha} />
            </div>
            <div className="text-center">
              <Button
                label="Envoyer !"
                onClick={() => contactSubmitButton.current?.click()}
              />
            </div>
            <input ref={contactSubmitButton} type="submit" hidden />
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4 text-center">
          <p>
            <a href="mailto:contact@aljvligne.fr">contact@aljvligne.fr</a>
          </p>
          <p>
            <a href="tel:+33768924838">07.68.92.48.38</a>
          </p>
          <p className="mt-8">
            <iframe
              className="mx-auto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5400.47419743896!2d-1.3807502147653818!3d47.4073163274006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ff1b8e7b1507%3A0x99096fa290fe8689!2s%C3%89cole%20Publique%20Jules%20Verne!5e0!3m2!1sfr!2sfr!4v1747340794438!5m2!1sfr!2sfr"
              width="400"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </p>
        </div>
      </div>
    </div>
  );
}
