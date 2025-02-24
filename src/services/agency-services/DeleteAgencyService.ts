import { deleteFile } from "../../helpers/deleteFile";
import { prisma } from "../../PrismaHandler";


type AgenceTypeRequest = {
    agenceId: string;
    creator_id?: string; 
}

export class DeleteAgencyService {
    async execute({ agenceId, creator_id }: AgenceTypeRequest): Promise<void> {

        const agenceToDelete = await prisma.agency.delete({ where: { id: agenceId }})

        if (agenceToDelete) {
            await deleteFile(String(agenceToDelete.file_key))            
        }

    }
} 