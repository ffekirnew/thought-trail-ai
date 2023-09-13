import { Router } from "express";
import { NotesController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const NotesRouter = Router();
const notesController = new NotesController();

NotesRouter.use(authMiddleware);
NotesRouter.post('', notesController.create);
NotesRouter.get('', notesController.getAll);
NotesRouter.get('/:id', notesController.get);
NotesRouter.put('/:id', notesController.update);
NotesRouter.delete('/:id', notesController.delete);

export default NotesRouter;
