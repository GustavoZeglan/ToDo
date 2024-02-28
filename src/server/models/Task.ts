

export interface ITask {
	id?: string;
	collectionId: string;
	name: string; 
	description?: string;
	isDone: boolean;
}