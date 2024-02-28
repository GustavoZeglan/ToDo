import * as collectionSchema from "./CollectionSchema";
import * as taskSchema from "./TaskSchema";
import * as userSchema from "./UserSchema";

export const Schemas = {
	...userSchema,
	...collectionSchema,
	...taskSchema
};