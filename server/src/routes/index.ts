import { Router } from "express";;
import { addUser, getUsers } from "../controllers/usersController"
import { getProjects, addProject, registerInProject, inviteToProject } from "../controllers/projectsController";

const router: Router = Router();

router.get("/users", getUsers);
router.post("/addUser", addUser);
router.get("/projects", getProjects);
router.post("/addProject", addProject);
router.post("/inviteToProject", inviteToProject);
router.post("/registerInProject", registerInProject);

export default router;