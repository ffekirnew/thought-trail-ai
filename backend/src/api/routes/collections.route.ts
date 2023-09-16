import { Router } from "express";
import { CollectionsController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const CollectionsRouter = Router();
const collectionsController = new CollectionsController();

CollectionsRouter.use(authMiddleware);
CollectionsRouter.post('', collectionsController.create);
CollectionsRouter.get('', collectionsController.getAll);
CollectionsRouter.get('/:collectionId', collectionsController.get);
CollectionsRouter.get('/:collectionId/notes/:noteId', collectionsController.getNote);
CollectionsRouter.get('/slug/:collectionSlug', collectionsController.getBySlug);
CollectionsRouter.put('/:collectionId', collectionsController.update);
CollectionsRouter.delete('/:collectionId', collectionsController.delete);
CollectionsRouter.post('/:collectionId/add-note', collectionsController.addNoteToCollection);

export default CollectionsRouter;
