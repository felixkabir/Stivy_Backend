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
import { GetModelFilesController } from "../controllers/model-controllers/GetModelFilesController";
import { CreateRequestModelController } from "../controllers/request-model-controllers/CreateRequestModelController";
import { CreateModelFreelanceController } from "../controllers/model-controllers/CreateModelFreelanceController";
import { GetModelRequestsController } from "../controllers/request-model-controllers/GetModelRequestsController";
import { GetAgencyModelRequestController } from "../controllers/request-model-controllers/GetAgencyModelRequestController";

const routes = Router();

routes.post("/add/:agencyId?", multer(multerConfig).single("file"), new CreateModelController().handle);

routes.post("/freelance/create/:userId?", new CreateModelFreelanceController().handle);

routes.post("/files/upload/:modelId?", multer(multerConfig).any(), new UploadModelFilesController().handle);

// Request Model Route
routes.post("/request/:userId?", new CreateRequestModelController().handle);

routes.get("/request/:modelId?", new GetModelRequestsController().handle);

routes.get("/agency-list/:agenceId?", new GetAgencyModelsController().handle);

routes.get("/request/agency/:agencyId?", new GetAgencyModelRequestController().handle);

routes.get("/", new ListAllPlatformModelsController().handle);

routes.get("/files/:modelId?", new GetModelFilesController().handle);

routes.put("/update/:modelId?", multer(multerConfig).single("file"), new UpdateModelController().handle);

routes.delete("/delete/:agencyId/:agencyOwnerId", new DeleteModelsFromAnAgencyController().handle);

routes.delete("/files/delete/:modelId/:fileId", new DeleteModelFileController().handle);

export { routes }