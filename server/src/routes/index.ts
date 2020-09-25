import { Router } from "express";;
import { addUser, getUser, getUsers } from "../controllers/usersController"
import { getProjects, addProject, registerInProject, inviteToProject, getProject } from "../controllers/projectsController";
import { login } from "../controllers/authenticationController";

const router: Router = Router();

router.post("/login", login);
router.get("/user/:username", getUser);
router.get("/users", getUsers);
router.post("/addUser", addUser);
router.get("/project/:name", getProject);
router.get("/projects", getProjects);
router.post("/addProject", addProject);
router.post("/inviteToProject", inviteToProject);
router.post("/registerInProject", registerInProject);

export default router;