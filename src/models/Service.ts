import type {BlocksContent} from "@strapi/blocks-react-renderer";

export type Service = {
    titre: string
    documentId: string
    publishedAt: string
    description: BlocksContent
    thumbnail?: { url: string }
}
