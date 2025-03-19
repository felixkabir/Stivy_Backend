import { prisma } from "../../PrismaHandler";
import { AgencyType } from "../../Types";
import { GetAgencyService } from "./GetAgencyService";

type UpdateAgencyTypeRequest = Partial<Omit<AgencyType, "file_key" | "file_url">>

export class UpdateAgencyService {
    async execute({ id, contact, name }: UpdateAgencyTypeRequest): Promise<any> {

        const agency = await new GetAgencyService().execute({ agenceId: id || null})


        if (!agency) {
            return null
        }

        const updatedAgency = await prisma.agency.update({
            where: { id },
            data: {
                name,
                contact,
            },

            select: {
                id: true,
                created_at: true,
                name: true,
                contact: true,
                file_url: true,
            }
        })

        return updatedAgency
    }
}