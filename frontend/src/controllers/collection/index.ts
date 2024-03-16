import { CollectionService } from "@/service/collectionService";
import Collection from "@/types/collection";
import toast from "react-hot-toast";

export const deleteCollection = async (userId: string, id: number, token: string): Promise<void> => {

    try {
        const service = new CollectionService();

        const data = await service.delete(userId, id, token).then(resp => {
        return resp
        });

        if (data.status != 200) {
            toast.error(String(data.data.message), { style: { fontFamily: 'Poppins' } });
         }   

        toast.success(String(data.data.message), { style: { fontFamily: 'Poppins' } });
    
    } catch(err){
        console.error(err);
    }

};

export const updateCollection = async (userId: string, collectionId: number, collectionName: string, image: string, token: string) => {

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

