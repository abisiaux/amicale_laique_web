import WaveCard from "@components/WaveCard.tsx";
import type {Membre} from "@models/Membre.ts";
import {getMembres} from '@services/api';
import {useEffect, useState} from 'react';

export default function APropos() {
    const [members, setMembers] = useState<Membre[]>([]);

    useEffect(() => {
        getMembres().then(data => setMembers(data || []));
    }, []);

    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <h1 className="text-3xl font-bold mb-2">Les membres du bureau</h1>
            <hr className="mb-4"/>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {members.map((member) => (
                    <WaveCard title={`${member.prenom} ${member.nom}`} subtitle={member.fonction}
                              imageUrl={member.photo.url}
                              imageAlt={`Photo de ${member.nom}  ${member.prenom}`}/>
                ))}
            </div>

            <h1 className="text-3xl font-bold mb-2">Le statut de l'association</h1>
            <hr className="mb-4"/>

            <section className="prose max-w-3xl mx-auto px-4">
                <h2>Article 1</h2>
                <p>
                    Il a été fondé le 13 mai 1981 et modifié le 11 octobre 2012 une association régie par la loi du 1er
                    juillet 1901 ayant pour dénomination
                    <strong>« Amicale Laïque de l’école Jules Verne »</strong>.
                </p>
                <p>Sa durée est illimitée.</p>
                <p>
                    Son siège social est installé au sein de l’école publique Jules Verne, 77 avenue Jules Verne, 44 850
                    LIGNE.
                </p>

                <h2>Article 2 : Buts de l’association</h2>
                <p>Cette association a pour but :</p>
                <ul className="list-disc list-inside">
                    <li>D’organiser des fêtes et des manifestations ayant pour objectif de récolter des fonds et
                        contribuer ainsi aux frais qui incombent à l’école.
                    </li>
                    <li>D’encourager les projets scolaires et extra-scolaires en les finançant en partie.</li>
                    <li>D’offrir la possibilité aux élèves de participer aux rencontres sportives scolaires et
                        extra-scolaires dans le cadre de l’USEP.
                    </li>
                    <li>De créer des liens entre les familles, les enfants et les enseignants.</li>
                </ul>

                <h2>Article 3 : Composition</h2>
                <p>L’association est ouverte à tous.</p>
                <p>Elle est composée :</p>
                <ul className="list-disc list-inside">
                    <li>
                        Du Conseil d’Administration ou Bureau soit 3 personnes minimum élues lors de l’assemblée
                        générale (Président, Trésorier et Secrétaire)
                    </li>
                    <li>De membres actifs</li>
                </ul>
                <p>
                    L’ensemble de ces personnes adhèrent à ses statuts et participent régulièrement aux réunions et aux
                    différentes manifestations.
                </p>

                <h2>Article 4 : Affiliation</h2>
                <p>
                    L’association est affiliée à la Ligue de l’Enseignement, par l’intermédiaire de la Fédération des
                    Amicales Laïques 44.
                </p>

                <h2>Article 5 : Admission et adhésion</h2>
                <p>Pour faire partie de l’Association, il faut adhérer aux présents statuts et être majeur.</p>
                <p>Le conseil d’administration pourra refuser des adhésions.</p>

                <h2>Article 6 : Perte de la qualité de membre</h2>
                <p>La qualité de membre se perd par :</p>
                <ul className="list-disc list-inside">
                    <li>Démission</li>
                    <li>Décès</li>
                    <li>
                        Radiation prononcée par le Conseil d’Administration pour non-respect des statuts, l’intéressé
                        ayant été invité à faire valoir ses droits de défense auprès du conseil d’administration.
                    </li>
                    <li>Dissolution de l’association</li>
                </ul>
                <p>
                    Les membres qui cessent de faire partie de l’association pour une cause quelconque n’ont aucun droit
                    sur l’actif social et celle-ci est entièrement dégagée à leur égard.
                </p>

                <h2>Article 7 : Modification des statuts et dissolution de l’association</h2>
                <p>
                    Les statuts ne peuvent être modifiés que sur proposition du Conseil d’Administration ou du quart des
                    membres qui composent l’Assemblée Générale.
                </p>
                <p>
                    Le texte des modifications doit être communiqué aux membres de l’Assemblée Générale et à la
                    Fédération des Amicales Laïques.
                </p>
                <p>
                    L’Assemblée Générale appelée à se prononcer sur la dissolution de l’Association, convoquée
                    spécialement à cet effet, doit comprendre au moins la moitié plus un de ses membres.
                    Si cette proportion n’est pas atteinte, l’Assemblée est convoquée de nouveau mais à 15 jours au
                    moins d’intervalle, et cette fois, elle peut valablement délibérer quel que soit le nombre des
                    membres présents.
                    Dans tous les cas, la dissolution ne peut être prononcée qu’à la majorité des deux tiers des membres
                    présents.
                </p>
                <p>
                    Le Conseil d’Administration peut se réunir en séance extraordinaire à la demande du Président ou du
                    quart des membres.
                </p>

                <p className="mt-6 italic">Fait à Ligné, le 19 octobre 2012.</p>
            </section>

        </div>
    );
}
