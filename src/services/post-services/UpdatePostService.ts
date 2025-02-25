import { prisma } from "../../PrismaHandler";
import { GetPostService } from "./GetPostService";

type PostTypeRequest = {
    postId: string;
    content: string
}

export class UpdatePostService {
    async execute({ postId, content }: PostTypeRequest): Promise<any> {

        const post = await new GetPostService().execute({ postId })

        if (post === null) {
            
        } else {
            await prisma.post.update({
                where: { id: post.id },
                data: {
                    content
                }
            })
        }
    }
}