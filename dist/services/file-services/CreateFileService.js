"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileService = void 0;
const PrismaHandler_1 = require("../../PrismaHandler");
class CreateFileService {
    async execute({ files, entity_id, entity_type, post_id }) {
        if (entity_type === "MODEL") {
            if (files && files.length) {
                for (const file of files) {
                    await PrismaHandler_1.prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            modelId: entity_id,
                            postId: post_id
                        }
                    });
                }
            }
            return;
        }
        else if (entity_type === "AGENCY") {
            if (files && files.length) {
                for (const file of files) {
                    await PrismaHandler_1.prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            postId: entity_id
                        }
                    });
                }
            }
        }
        else {
            if (files && files.length) {
                for (const file of files) {
                    await PrismaHandler_1.prisma.fileEntity.create({
                        data: {
                            file_key: file.filename,
                            file_url: file.path,
                            postId: entity_id
                        }
                    });
                }
            }
        }
    }
}
exports.CreateFileService = CreateFileService;
