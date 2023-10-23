import { Router } from "express";
import { getAllUsers, userSignUp, userLogin, } from "../controllers/userControllers.js";
import { signUpValidator, validate, loginValidator, } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map