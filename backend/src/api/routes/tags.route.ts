import { Router } from "express";
import { TagsController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";

const TagsRouter = Router();
const tagsController = new TagsController();

TagsRouter.use(authMiddleware);
TagsRouter.post('', tagsController.create);
TagsRouter.get('', tagsController.getAll);
TagsRouter.get('/:id', tagsController.get);
TagsRouter.put('/:id', tagsController.update);
TagsRouter.delete('/:id', tagsController.delete);

export default TagsRouter;
