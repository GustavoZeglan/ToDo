import { AxiosInstance } from "./axiosInstance";

export class TaskService {
    getAll(userId: string, token: string) {
        return AxiosInstance.get(`/${userId}/collection`, { headers: { Authorization: token } })
    }

    getByCollection(userId: string, collectionId: number, token: string) {
        return AxiosInstance.get(`${userId}/${collectionId}/task`, { headers: { Authorization: token } })
    }

    update(userId: string, token: string, taskId: number, name: string, description: string, isDone: boolean) {
        return AxiosInstance.put(`/${userId}/update/task/${taskId}`, { name: name, description: description, isDone: isDone },
            { headers: { Authorization: token } })
    }

    insert(userId: string, token: string, collectionId: number, name: string, description: string) {
        return AxiosInstance.post(`/${userId}/${collectionId}/create/task`, { name: name, description: description},
        { headers: { Authorization: token } })
    }

    delete(userId: string, token: string, taskId: number) {
        return AxiosInstance.delete(`/${userId}/delete/task/${taskId}`,{ headers: { Authorization: token } })
    }

}