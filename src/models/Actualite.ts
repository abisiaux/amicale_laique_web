import type {BlocksContent} from "@strapi/blocks-react-renderer";

export type Actualite = {
    titre: string
    documentId: string
    publishedAt: string
    contenu: BlocksContent
    thumbnail?: { url: string }
}
