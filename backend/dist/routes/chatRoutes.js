import { Router } from "express";
import { verifyToken } from "../utils/token_manager.js";
import { messageValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chatsController.js";
const chatRoutes = Router();
chatRoutes.post("/new", validate(messageValidator), verifyToken, generateChatCompletion);
export default chatRoutes;
//# sourceMappingURL=chatRoutes.js.map