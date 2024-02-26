import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserController } from "../controllers/user";
import { getUserByEmail } from "../db/user/getUserByEmail";
import { IUser } from "../models/User";
import { Schemas } from "../schema";
import { validate } from "../shared/middleware/validation";
const router = Router();

router.get("/", (req, res) => {
	res.send("Teste");
});

// User routes
// router.get("/user", UserController.getUsers);
router.post("/user", validate(Schemas.userSchema.omit({id:true})),UserController.create);

router.post("/user/getEmail", validate(Schemas.userSchema.omit({id:true})), async (req:Request,res:Response) => {
	const {name,email,password} = req.body;

	const userData: IUser = {
		name,
		email,
		password
	};

	getUserByEmail(userData);

	res.status(StatusCodes.OK).send("Buscado");
});

// Collection Routes
router.post("/collection", validate(Schemas.colleactionSchema.omit({collectionId:true})),(req:Request,res:Response) => {
	res.send("TESTE");
});

export { router };
