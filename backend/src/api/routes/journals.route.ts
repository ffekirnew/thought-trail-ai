import { Router } from "express";
import { JournalsController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const JournalsRouter = Router();
const journalsController = new JournalsController();

JournalsRouter.use(authMiddleware);
JournalsRouter.post('', journalsController.create);
JournalsRouter.get('', journalsController.getAll);
JournalsRouter.get('/:journalId', journalsController.get);
JournalsRouter.put('/:journalId', journalsController.update);
JournalsRouter.delete('/:journalId', journalsController.delete);

export default JournalsRouter;
