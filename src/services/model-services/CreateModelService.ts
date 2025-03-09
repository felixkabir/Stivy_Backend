import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";


type ModelTypeRequest = Omit<ModelType, "files" | "userId"> & {
    agencyId: string;
}

export class CreateModelService {
    async execute({ height, name, shoes, waist, agencyId, contact, file_key, file_url }: Omit<ModelTypeRequest, "id">): Promise<any> {

        const verifyAgency = await prisma.agency.findUnique({ where: { id: agencyId } })

        if (!verifyAgency) throw createHttpError(404, "Agency not found!")

        const newModel = await prisma.modelEntity.create({
            data: {
                name: name ? name : "undefined",
                height,
                shoes,
                waist,
                contact,
                file_url,
                file_key,
                agencyId: verifyAgency.id
            }
        })

        if (newModel) {
            return newModel
        }

    }
}