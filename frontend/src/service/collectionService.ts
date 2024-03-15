import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});


export class CollectionService {

    getAll(userId: string, token: string) {
        return axiosInstance.get(`/${userId}/collection`, { headers: { Authorization: token } })
    }

    delete(userId: string, id: number, token: string) {
        return axiosInstance.delete(`/${userId}/collection/${id}`, { headers: { Authorization: token } })
    }

    insert(userId: string, collectionName: string, image: string, token: string) {
        return axiosInstance.post(`/${userId}/collection`,
        { collectionName: collectionName, image: image, color: "#000" }, { headers: { Authorization: token } })
    }

    update(userId: string, collectionId: number ,collectionName: string, image: string, token: string) {
        return axiosInstance.put(`/${userId}/collection/${collectionId}`,
        { collectionName: collectionName, image: image, color: "#000" }, { headers: { Authorization: token } })
    }

}