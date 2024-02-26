import * as create from "./create";
import * as getUsers from "./getUsers";

export const UserController = {
	...create,
	...getUsers,
};