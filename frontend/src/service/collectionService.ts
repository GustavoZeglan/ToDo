import { AxiosInstance } from "./axiosInstance";

export class CollectionService {

    getAll(userId: string, token: string) {
        return AxiosInstance.get(`/${userId}/collection`, { headers: { Authorization: token } })
    }

    delete(userId: string, id: number, token: string) {
        return AxiosInstance.delete(`/${userId}/delete/collection/${id}`, { headers: { Authorization: token } })
    }

    insert(userId: string, collectionName: string, image: string, token: string) {
        return AxiosInstance.post(`/${userId}/create/collection`,
            { collectionName: collectionName, image: image }, { headers: { Authorization: token } })
    }

    update(userId: string, collectionId: number, collectionName: string, image: string, token: string) {
        return AxiosInstance.put(`/${userId}/update/collection/${collectionId}`,
            { collectionName: collectionName, image: image }, { headers: { Authorization: token } })
    }

}