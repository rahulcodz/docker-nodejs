import { Router } from "express"
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller"

const proejctRoutes = Router()

proejctRoutes.route("/").get(getProjects).post(createProject)

proejctRoutes
  .route("/:patientId")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject)

export default proejctRoutes
