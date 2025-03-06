import { addInterestToUser } from "../../helpers/addInterestToUser";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";


type ModelTypeRequest = Omit<ModelType, "files"> & {
    agencyId: string;
}

export class  CreateModelService {
    async execute({ height, name, shoes, userId, waist, agencyId, contact, file_key, file_url }: Omit<ModelTypeRequest, "id">): Promise<any> {

        const verifyAgency = await prisma.agency.findUnique({ where: { id: agencyId }})
        const getModelInterest = await prisma.interest.findMany({
            where: { interest_type: "MODEL" }
        })

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { interests: true }
        })

        if(!user) return null

        if(!verifyAgency) return null

        const newModel = await prisma.modelEntity.create({
            data: {
                name,
                height,
                shoes,
                waist,
                contact,
                file_url,
                file_key,
                userId: user.id,
                agencyId: verifyAgency.id
            }
        })

        if (newModel) {
            await addInterestToUser(user.id, getModelInterest[0].id)
            return newModel
        }
    }
}