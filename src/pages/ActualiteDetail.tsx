import {Button} from "@components/Button.tsx";
import type {Actualite} from "@models/Actualite.ts";
import {getActualite} from "@services/api.ts";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';

function ActualiteDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [actualite, setActualite] = useState<Actualite>()

    useEffect(() => {
        if (!id) return;

        getActualite(id).then((data) => {
            setActualite(data);
        });
    }, [id]);

    if (!actualite) {
        return;
    }

    const returnActualitesButton = <Button label="Retourner aux actualités" onClick={() => navigate('/actualites')}
                                           className="mb-4"/>


    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <div className="flex justify-center mb-4">
                {returnActualitesButton}
            </div>

            <h1 className="text-3xl font-bold mb-2">{actualite.titre}</h1>
            <hr className="mb-4"/>

            {actualite.contenu && <BlocksRenderer content={actualite.contenu} blocks={{
                list: ({children}) => <ul
                    className="text-md list-disc list-inside mb-2">{children}</ul>,
                paragraph: ({children}) => <p
                    className="text-md mb-2 leading-relaxed">{children}</p>,
                image: ({image}) => <img className="mx-auto max-h-100" src={image.url}/>
            }}/>}

            <div className="flex justify-center mt-8">
                {returnActualitesButton}
            </div>
        </div>
    );
}

export default ActualiteDetail;
