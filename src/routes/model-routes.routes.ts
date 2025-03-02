import { Router } from "express";
import { CreateModelController } from "../controllers/model-controllers/CreateModelController";
import multer from "multer";
import multerConfig from "../Config/multer";
import { GetAgencyModelsController } from "../controllers/model-controllers/GetAgencyModelController";
import { ListAllPlatformModelsController } from "../controllers/model-controllers/ListAllPlatformModelsController";
import { DeleteModelsFromAnAgencyController } from "../controllers/model-controllers/DeleteModelsFromAnAgencyController";
import { UpdateModelController } from "../controllers/model-controllers/UpdateModelController";
import { DeleteModelFileController } from "../controllers/model-controllers/DeleteModelFileController";
import { UploadModelFilesController } from "../controllers/model-controllers/UploadModelFilesController";

const routes = Router()

routes.post("/add/:agencyId?", multer(multerConfig).single("file"), new CreateModelController().handle);

routes.post("/files/upload/:modelId?", multer(multerConfig).any(), new UploadModelFilesController().handle)

routes.get("/agency-list/:agenceId?", new GetAgencyModelsController().handle);

routes.get("/", new ListAllPlatformModelsController().handle);

routes.put("/update/:modelId?", new UpdateModelController().handle);

routes.delete("/delete/:agencyId/:agencyOwnerId", new DeleteModelsFromAnAgencyController().handle);

routes.delete("/files/delete/:modelId/:fileId", new DeleteModelFileController().handle)

export { routes }