import { prisma } from "../../PrismaHandler";
import { DeleteFileService } from "../file-services/DeleteFileService";
import { GetPostService } from "./GetPostService";


type PostTypeRequest = {
    postId: string;
}

export class DeletePostService {
    async execute({ postId }: PostTypeRequest): Promise<any> {
        const post = await new GetPostService().execute({ postId })

        const fileService = new DeleteFileService()

        if (post) {
            await prisma.post.delete({ where: { id: post.id } })
            await fileService.execute({ entity_id: post.id })
        } else {
            return null
        }
    }
}