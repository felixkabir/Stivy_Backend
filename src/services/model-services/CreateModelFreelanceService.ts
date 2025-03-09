import createHttpError from "http-errors";
import { addInterestToUser } from "../../helpers/addInterestToUser";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";


type ModelFreelanceTypeRequest = Omit<ModelType, "files" | "name" | "file_url" | "file_key"> & {
    userId: string;
}

export class  CreateModelFreelanceService {
    async execute({ height, shoes, waist, userId, contact }: Omit<ModelFreelanceTypeRequest, "id">): Promise<any> {

        const user = await prisma.user.findUnique({ where: { id: userId }})
        const getModelInterest = await prisma.interest.findMany({
            where: { interest_type: "MODEL_FREELANCE" }
        })

        if(!user) throw createHttpError(404, "User not found!")


        const newModel = await prisma.modelEntity.create({
            data: {
                name: user.username,
                height,
                shoes,
                waist,
                contact,
                file_url: user.file_url,
                file_key: user.file_key,
                userId: user.id,
            }
        })

        if (newModel) {
            await addInterestToUser(user.id, getModelInterest[0].id)
            return newModel
        }
    }
}