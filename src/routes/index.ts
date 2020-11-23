import { Router } from "express";;
import { addUser, dismissNotification, getProjectRecommendationsForUser, getUser, getUsers, getUsersByUsernames, voteForSkill } from "../controllers/usersController"
import { getProjects, addProject, registerInProject, inviteToProject, getProject, getUserRecommendationsForProject, requestToJoinProject, getProjectsByNames, acceptRequest, getMostRecentProjects } from "../controllers/projectsController";
import { isLoggedIn, login, logout } from "../controllers/authenticationController";
import { getFrameworks, getProgrammingLanguages, getSkills } from "../controllers/attributeController";

const router: Router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/isLoggedIn", isLoggedIn);
router.get("/user/:username", getUser);
router.get("/users", getUsers);
router.post("/getUsersByUsernames", getUsersByUsernames);
router.post("/addUser", addUser);
router.get("/project/:name", getProject);
router.get("/projects", getProjects);
router.post("/addProject", addProject);
router.post("/inviteToProject", inviteToProject);
router.post("/registerInProject", registerInProject);
router.get("/skills", getSkills);
router.get("/programmingLanguages", getProgrammingLanguages);
router.get("/frameworks", getFrameworks);
router.get("/getProjectRecommendationsForUser/:username", getProjectRecommendationsForUser);
router.get("/getUserRecommendationsForProject/:name", getUserRecommendationsForProject);
router.post("/requestToJoinProject", requestToJoinProject);
router.post("/getProjectsByNames", getProjectsByNames);
router.post("/acceptRequest", acceptRequest);
router.post("/getMostRecentProjects", getMostRecentProjects);
router.post("/dismissNotification", dismissNotification);
router.post("/voteForSkill", voteForSkill);

export default router;