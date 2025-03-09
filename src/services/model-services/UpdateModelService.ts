import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";
import { deleteFile } from "../../helpers/deleteFile";

type ModelTypeRequest = Partial<Omit<ModelType, "files" | "userId">>

export class UpdateModelService {
    async execute({ id, height, name, shoes, waist, contact, file_key, file_url}: ModelTypeRequest): Promise<any> {

        const model = await prisma.modelEntity.findUnique({
            where: { id }
        })

        
        if (model) {
            if (file_key && file_url) {
                await deleteFile(String(model.file_key))
            }
            
            const updatedModel = await prisma.modelEntity.update({
                where: { id: model.id },
                data: {
                    name: name ? name : model.name,
                    height: height ? height : model.height,
                    shoes: shoes ? shoes : model.shoes,
                    waist: waist ? waist : model.waist,
                    contact: contact ? contact : model.contact,
                    file_key: file_key ? file_key : model.file_key,
                    file_url: file_url ? file_url : model.file_url
                }
            })

            return updatedModel
        } else {
            throw createHttpError(404, "Model does not exist!")
        }
    }
}