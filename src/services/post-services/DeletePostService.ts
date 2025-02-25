import { prisma } from "../../PrismaHandler";
import { GetPostService } from "./GetPostService";


type PostTypeRequest = {
    postId: string;
}

export class DeletePostService {
    async execute({ postId }: PostTypeRequest): Promise<any> {
        const post = await new GetPostService().execute({ postId })

        if (post) {
            await prisma.post.delete({ where: { id: post.id } })            
        } else {
            return post
        }
    }
}