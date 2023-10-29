import { Router } from "express";
import { NotesController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const NotesRouter = Router();
const notesController = new NotesController();

NotesRouter.use(authMiddleware);
NotesRouter.post("", notesController.create);
NotesRouter.get("", notesController.getAll);
NotesRouter.get("/:noteId", notesController.get);
NotesRouter.put("/:noteId", notesController.update);
NotesRouter.delete("/:noteId", notesController.delete);

export default NotesRouter;
