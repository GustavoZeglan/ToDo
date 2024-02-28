import { Router } from "express";
import { CollectionController } from "../controllers/collection";
import { login } from "../controllers/login/login";
import { TaskController } from "../controllers/task";
import { UserController } from "../controllers/user";
import { Schemas } from "../schema";
import { authentication } from "../shared/middleware/authentication";
import { validate } from "../shared/middleware/validation";
const router = Router();

router.get("/", (req, res) => {
	res.send("Teste");
});

// User routes
// router.get("/user", UserController.getUsers);
router.post("/user", validate(Schemas.userSchema.omit({ id: true })), UserController.create);

//login 
router.post("/login", validate(Schemas.userSchema.omit({ id: true })), login);
router.post("/signup", validate(Schemas.userSchema.omit({ id: true })), UserController.create);

// Collection Routes
router.post("/:userId/collection",
	authentication,
	validate(Schemas.colleactionSchema.omit({ collectionId: true })), CollectionController.create);

// Task Routes
router.post("/:userId/:collectionId/task"
	, authentication
	, validate(Schemas.TaskSchema.omit({ taskId: true, isDone: true })), TaskController.create);

router.put("/:userId/task/:id"
	, authentication
	, validate(Schemas.TaskSchema.omit({taskId:true})), TaskController.updateTask);


export { router };
