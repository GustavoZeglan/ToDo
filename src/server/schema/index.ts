import * as collectionSchema from "./CollectionSchema";
import * as userSchema from "./UserSchema";

export const Schemas = {
	...userSchema,
	...collectionSchema,
};