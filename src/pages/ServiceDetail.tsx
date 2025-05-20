import {Button} from "@components/Button.tsx";
import type {Service} from "@models/Service.ts";
import {getService} from "@services/api.ts";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';

function ServiceDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState<Service>()

    useEffect(() => {
        if (!id) return;

        getService(id).then((data) => {
            setService(data);
        });
    }, [id]);

    if (!service) {
        return;
    }

    const returnButton = <Button label="Retourner aux services" onClick={() => navigate('/services')} className="mb-4"/>


    return (
        <div className="container mx-auto px-8 py-8 md:px-24">
            <div className="flex justify-center mb-4">
                {returnButton}
            </div>

            <h1 className="text-3xl font-bold mb-2">{service.titre}</h1>
            <hr className="mb-4"/>

            <BlocksRenderer content={service.description} blocks={{
                list: ({children}) => <ul
                    className="text-md list-disc list-inside mb-2">{children}</ul>,
                paragraph: ({children}) => <p
                    className="text-md mb-2 leading-relaxed">{children}</p>,
                image: ({image}) => <img className="mx-auto max-h-100" src={image.url}/>
            }}/>

            <div className="flex justify-center mt-8">
                {returnButton}
            </div>
        </div>
    );
}

export default ServiceDetail;
