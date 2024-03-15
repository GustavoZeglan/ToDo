import { TaskService } from "@/service/taskService";

export const getTasks = async (id: string, collectionId: number, token: string): Promise<Array<Task>> => {
    const service = new TaskService();

    const data: Array<Task> = await service.getByCollection(id, collectionId, token).then(resp => {
        return resp.data;
    });

    return data;
}