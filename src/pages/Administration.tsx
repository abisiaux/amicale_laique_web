import { Button } from '@components/Button.tsx'
import { flushResource } from '@services/admin.ts'
import toast from 'react-hot-toast'

export default function Administration() {
  const handleFlush = async (resource: string) => {
    try {
      await flushResource(resource)
      toast.success(`Flush de la ressource ${resource} effectué avec succés."`)
    } catch {
      toast.error('Erreur lors du flush de la ressource : ' + resource)
    }
  }

  return (
    <div className="container mx-auto px-8 py-8 md:px-24">
      <h1 className="text-3xl font-bold mb-2">Administration</h1>
      <hr className="mb-4" />

      <h2 className="text-xl font-bold mb-2">Flush des collections</h2>

      <div className="flex flex-row items-center gap-2">
        <Button
          label="Actualités"
          onClick={() => handleFlush('actualites')}
        ></Button>

        <Button
          label="Evénements"
          onClick={() => handleFlush('evenements')}
        ></Button>

        <Button
          label="Procès-verbaux"
          onClick={() => handleFlush('proces-verbaux')}
        ></Button>

        <Button
          label="Services"
          onClick={() => handleFlush('services')}
        ></Button>

        <Button label="Membres" onClick={() => handleFlush('membres')}></Button>
      </div>
    </div>
  )
}
