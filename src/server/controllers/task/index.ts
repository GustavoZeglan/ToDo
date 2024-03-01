import * as create from "./create";
import * as getByCollectionId from "./getByCollectionId";
import * as getById from "./getById";
import * as updateTask from "./update";

export const TaskController = {
	...create,
	...updateTask,
	...getById,
	...getByCollectionId,
};