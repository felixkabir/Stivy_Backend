import { prisma } from "../../PrismaHandler";
import { EventType } from "../../Types";

type EventTypeRequest = Omit<EventType, "id" | "created_at"> & {
    entityId: string;
};

export class CreateEventService {
    async execute({ name, start_date, end_date, entityId, file_key, file_url, location }: EventTypeRequest): Promise<any> {
        if (!entityId) {
            throw new Error("entityId is required");
        }

        // Verifica se o entityId é um usuário
        const user = await prisma.user.findUnique({
            where: { id: entityId },
        });

        // Verifica se o entityId é uma agência
        const agency = await prisma.agency.findUnique({
            where: { id: entityId },
        });

        // Se não for nem usuário nem agência, lança um erro
        if (!user && !agency) {
            throw new Error("Entity not found (user or agency)");
        }

        // Cria o evento com o userId ou agencyId, dependendo da entidade encontrada
        const newEvent = await prisma.eventEntity.create({
            data: {
                end_date: new Date(end_date),
                name,
                start_date: new Date(start_date),
                userId: user ? entityId : null, 
                agencyId: agency ? entityId : null, 
                file_key,
                file_url,
                location
            },
            include: { user: true, agency: true } // Inclui os relacionamentos
        });

        return newEvent;
    }
}