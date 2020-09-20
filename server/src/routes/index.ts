import { Router } from "express";;
import { addUser, getUsers } from "../controllers/users"
import { getProjects, addProject, registerInProject } from "../controllers/projects";

const router: Router = Router();

router.get("/users", getUsers);
router.post("/addUser", addUser);
router.get("/projects", getProjects);
router.post("/addProject", addProject);
router.post("/registerInProject", registerInProject);

export default router;