import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";
import { ModelType } from "../../Types";
import { CreateFileService } from "../file-services/CreateFileService";
import { GetUserService } from "../user-services/GetUserService";

type ModelTypeRequest = ModelType & {
    agencyId: string;
    file_url: string;
    file_key: string;
}

export class  CreateModelService {
    async execute({ height, name, shoes, userId, waist, file_key, file_url, agencyId }: Omit<ModelTypeRequest, "id" | "files">): Promise<any> {

        const verifyAgency = await prisma.agency.findUnique({ where: { id: agencyId }})

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if(!user) return null

        if(!verifyAgency) return null

        const newModel = await prisma.model.create({
            data: {
                name,
                height,
                shoes,
                waist,
                userId: user.id,
                agencyId: verifyAgency.id
            }
        })

        if (newModel) {
            await new CreateFileService().execute({
                file_key,
                file_url,
                entity_type: "MODEL",
                entity_id: newModel.id
            })

            return newModel
        } else {
            await deleteFile(file_key)
        }
    }
}