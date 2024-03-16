import { TaskService } from "@/service/taskService";
import toast from "react-hot-toast";

export const getTasks = async (id: string, collectionId: number, token: string): Promise<Array<Task>> => {
    const service = new TaskService();

    const data: Array<Task> = await service.getByCollection(id, collectionId, token).then(resp => {
        return resp.data;
    });

    return data;
}


export const updateTask = async (id: string, token: string, taskId: number, name: string, description: string, isDone: boolean) => {
    const service = new TaskService();

    const data = await service.update(id, token, taskId, name, description, isDone).then(resp => {
        return resp.data.message;
    });

    toast.success(String(data), { style: { fontFamily: 'Poppins' } });
}


export const deleteTask = async (id: string, token: string, taskId: number) => {
    const service = new TaskService();

    const data = await service.delete(id, token, taskId).then(resp => {
        return resp.data.message;
    });

    toast.success(String(data), { style: { fontFamily: 'Poppins' } });
}   