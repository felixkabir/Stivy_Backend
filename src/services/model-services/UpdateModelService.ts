import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";

type ModelTypeRequest = Partial<Omit<ModelType, "files" | "userId">>

export class UpdateModelService {
    async execute({ id, height, name, shoes, waist, contact}: ModelTypeRequest): Promise<any> {

        const model = await prisma.modelEntity.findUnique({
            where: { id }
        })

        if (model) {
            const updatedModel = await prisma.modelEntity.update({
                where: { id: model.id },
                data: {
                    name: name ? name : model.name,
                    height: height ? height : model.height,
                    shoes: shoes ? shoes : model.shoes,
                    waist: waist ? waist : model.waist,
                    contact: contact ? contact : model.contact
                }
            })

            return updatedModel
        } else {
            throw createHttpError(404, "Model does not exist!")
        }
    }
}