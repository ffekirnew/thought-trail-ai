import { Router } from "express";
import { CollectionsController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const CollectionsRouter = Router();
const collectionsController = new CollectionsController();

// Use Middleware to authenticate uers comming in
CollectionsRouter.use(authMiddleware);

// CRUD
CollectionsRouter.post("", collectionsController.create);
CollectionsRouter.get("", collectionsController.getAll);
CollectionsRouter.get("/:collectionId", collectionsController.get);
CollectionsRouter.get("/slug/:collectionSlug", collectionsController.getBySlug);
CollectionsRouter.put("/:collectionId", collectionsController.update);
CollectionsRouter.delete("/:collectionId", collectionsController.delete);

// Collection Note Related
CollectionsRouter.post(
  "/slug/:collectionSlug/notes",
  collectionsController.addNoteToCollection,
);
CollectionsRouter.get(
  "/slug/:collectionSlug/notes/:noteId",
  collectionsController.getNote,
);
CollectionsRouter.get(
  "/slug/:collectionSlug/notes",
  collectionsController.getNotes,
);
CollectionsRouter.put(
  "/slug/:collectionSlug/notes/:noteId",
  collectionsController.updateNote,
);
CollectionsRouter.delete(
  "/slug/:collectionSlug/notes/:noteId",
  collectionsController.deleteNote,
);

export default CollectionsRouter;
