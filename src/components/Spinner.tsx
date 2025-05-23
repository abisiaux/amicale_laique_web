export function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-sm text-primary">
      <div className="animate-spin rounded-full h-18 w-18 border-t-2 border-b-3 border-(--secondary-color) mb-8">
      </div>
        Chargement en cours...
    </div>
  )
}
