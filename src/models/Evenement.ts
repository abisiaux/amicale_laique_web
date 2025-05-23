export type Evenement = {
  id: string
  titre: string
  description: string
  date_heure_debut: string
  date_heure_fin: string
  lieu: string
  thumbnail: { url: string }
  actualite: { documentId: string }
}
