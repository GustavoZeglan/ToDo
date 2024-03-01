

export interface ITask {
	id?: string;
	userId: number;
	collectionId: string;
	name: string; 
	description?: string;
	isDone: boolean;
}