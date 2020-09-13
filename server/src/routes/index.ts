import { Router } from "express"
import { addUser, getUsers } from "../controllers/users"

const router: Router = Router()

router.get("/users", getUsers);
router.post("/addUser", addUser);

export default router