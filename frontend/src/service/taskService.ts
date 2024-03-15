import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});


export class TaskService {
    getAll(userId: string, token: string) {
        return axiosInstance.get(`/${userId}/collection`, { headers: { Authorization: token } })
    }

    getByCollection(userId: string, collectionId: number, token: string) {
        return axiosInstance.get(`${userId}/${collectionId}/task`, { headers: { Authorization: token } })
    }

    update(userId: string, token: string, taskId: number, name: string, description: string, isDone: boolean) {
        return axiosInstance.put(`/${userId}/task/${taskId}`, { name: name, description: description, isDone: isDone },
            { headers: { Authorization: token } })
    }
}