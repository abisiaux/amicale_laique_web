import Pagination from '@components/Pagination.tsx';
import WaveCard from '@components/WaveCard.tsx';
import type { Actualite } from '@models/Actualite.ts';
import { getActualites } from '@services/strapi.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Actualites() {
  const navigate = useNavigate();
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    getActualites(currentPage).then((data) => {
      setActualites(data.data || []);
      setPageCount(data.meta.pagination.pageCount);
    });
  }, [currentPage]);

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <h1 className="text-3xl font-bold mb-2">Actualités</h1>
      <hr className="mb-4" />

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {actualites.map((actualite) => (
          <WaveCard
            key={actualite.titre}
            hasPointer
            title={actualite.titre}
            subtitle={`Publiée le ${new Date(actualite.publishedAt).toLocaleDateString('fr-FR')}`}
            imageUrl={actualite.thumbnail?.url}
            imageAlt={actualite.titre}
            onClick={() => navigate(`/actualites/${actualite.documentId}`)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}
