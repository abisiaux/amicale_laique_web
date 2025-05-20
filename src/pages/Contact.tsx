import {Button} from "@components/Button.tsx";
import {useRef} from "react";

export default function Contact() {
    const contactSubmitButton = useRef<HTMLInputElement>(null);

    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <h1 className="text-3xl font-bold mb-4">Contact</h1>
            <hr className="mb-4"/>

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="question" className="block text-sm font-bold">
                                Ma demande concerne :
                            </label>

                            <select
                                id="question"
                                name="question"
                                required
                                className="mt-1 block w-full rounded-md sm:text-sm"
                            >
                                <option disabled selected value="">Choisir une catégorie</option>
                                <option value="commande">Une commande</option>
                                <option value="evenement">Un événement</option>
                                <option value="association">L'association</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-bold">
                                Votre message :
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={8}
                                className="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                placeholder="Écrivez votre message ici..."
                            ></textarea>
                        </div>
                        <Button label="Envoyer !" onClick={() => contactSubmitButton.current?.click()}/>
                        <input ref={contactSubmitButton} type="submit" hidden/>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-4 text-center">
                    <p><a href='mailto:contact@aljvligne.fr'>contact@aljvligne.fr</a></p>
                    <p><a href='tel:+33768924838'>07.68.92.48.38</a></p>
                    <p className="mt-8">
                        <iframe className="mx-auto"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5400.47419743896!2d-1.3807502147653818!3d47.4073163274006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ff1b8e7b1507%3A0x99096fa290fe8689!2s%C3%89cole%20Publique%20Jules%20Verne!5e0!3m2!1sfr!2sfr!4v1747340794438!5m2!1sfr!2sfr"
                                width="400" height="300"
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </p>
                </div>
            </div>





        </div>
    );
}
