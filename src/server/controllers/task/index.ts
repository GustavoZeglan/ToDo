import * as create from "./create";
import * as updateTask from "./update";

export const TaskController = {
	...create,
	...updateTask
};