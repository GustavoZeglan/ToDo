import { CollectionService } from "@/service/collectionService";
import Collection from "@/types/collection";
import toast from "react-hot-toast";

export const deleteCollection = async (userId: string, id: number | null, token: string): Promise<void> => {
    if (id != null) {
        const service = new CollectionService();

        const data = await service.delete(userId, id, token).then(resp => {
            return resp.data.message
        });

        toast.success(String(data), { style: { fontFamily: 'Poppins' } });

    }
};

export const updateCollection = async (userId: string, collectionId: number ,collectionName: string, image: string, token: string) => {
    
    const service = new CollectionService();

    const data = await service.update(userId, collectionId, collectionName, image, token).then(resp => {
        return resp.data;
    });

    return data;
};

export const getData = async (id: string, token: string): Promise<Array<Collection>> => {
    const service = new CollectionService();

    const data: Array<Collection> = await service.getAll(id, token).then(resp => {
        return resp.data;
    })

    return data;
}

