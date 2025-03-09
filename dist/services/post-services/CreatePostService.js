"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
const CreateFileService_1 = require("../file-services/CreateFileService");
const GenerateNotificationsToAllUsersService_1 = require("../notification-services/GenerateNotificationsToAllUsersService");
class CreatePostService {
    async execute({ type, content, entityId, files }) {
        const creator = await PrismaHandler_1.prisma.user.findUnique({ where: { id: entityId } });
        const model = await PrismaHandler_1.prisma.modelEntity.findUnique({
            where: { id: entityId },
            include: { user: true }
        });
        const agency = await PrismaHandler_1.prisma.agency.findUnique({
            where: { id: entityId },
            include: { creator: true }
        });
        const allUsers = await PrismaHandler_1.prisma.user.findMany();
        const fileService = new CreateFileService_1.CreateFileService();
        if (!creator && !model && !agency) {
            return;
        }
        if (type === "MODEL") {
            const newPost = await PrismaHandler_1.prisma.post.create({
                data: {
                    content,
                    type: "MODEL",
                    modelId: model?.id,
                }
            });
            await fileService.execute({ entity_type: type, entity_id: entityId, files: files });
            await new GenerateNotificationsToAllUsersService_1.GenerateNotificationsToAllUsersService().execute({
                creatorId: model ? model.user.id : '',
                content: `${model ? model.user.username : ''} fez uma publicação.`,
                users: allUsers
            });
            const resultPost = await PrismaHandler_1.prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            });
            return resultPost;
        }
        else if (type === "AGENCY") {
            const newPost = await PrismaHandler_1.prisma.post.create({
                data: {
                    content,
                    type: "AGENCY",
                    agencyId: agency?.id
                }
            });
            await fileService.execute({ entity_type: type, entity_id: entityId, files: files });
            await new GenerateNotificationsToAllUsersService_1.GenerateNotificationsToAllUsersService().execute({
                creatorId: agency ? agency.creator.id : "",
                content: `${agency ? agency.creator.username : ''} fez uma publicação.`,
                users: allUsers
            });
            const resultPost = await PrismaHandler_1.prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            });
            return resultPost;
        }
        else {
            const newPost = await PrismaHandler_1.prisma.post.create({
                data: {
                    content,
                    type: "USER",
                    userId: creator?.id
                }
            });
            const resultPost = await PrismaHandler_1.prisma.post.findUnique({
                where: {
                    id: newPost.id
                },
                include: { file_entity: true, model_entity: true, user: true }
            });
            await fileService.execute({ entity_type: type, entity_id: newPost.id, files: files });
            await new GenerateNotificationsToAllUsersService_1.GenerateNotificationsToAllUsersService().execute({
                creatorId: creator ? creator.id : "",
                content: `${creator ? creator.username : ""} fez uma publicação.`,
                users: allUsers
            });
            return resultPost;
        }
    }
}
exports.CreatePostService = CreatePostService;
