import Modal from "@/components/Modal";
import { DashboardContext } from "@/context/dashboardContext";
import { getData, updateCollection } from "@/controllers/collection";
import { CollectionSchema } from "@/schemas/collectionSchema";
import { ErrorSpan } from "@/styles/ErrorSpan.style";
import { Input } from "@/styles/Input.style";
import { BottomAlignment, CloseButton, SubmitButton, Title } from "@/styles/Main.style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CollectionModalProps {
    id: string,
    token: string,
    isOpen: boolean,
    handleModal: () => void;
}

type FormProps = z.infer<typeof CollectionSchema>;

export const UpdateCollectionModal = ({id, token, isOpen, handleModal}: CollectionModalProps) => {

    const { getCollections, collectionId } = useContext(DashboardContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(CollectionSchema),
        defaultValues: {
            collectionName: '',
            image: '',
        }
    });

    const update = async (data: FormProps) => {
        const { collectionName, image } = data;

        if (collectionId != null ) {

            const img = image ?? "";

            const resp = await updateCollection(id, collectionId, collectionName, img, token); 

            if (resp.status != 401) {
                toast.success(resp.message, {style:{fontFamily:"Poppins"}});
                const collec = await getData(id, token);
                getCollections(collec)
            } else {
                toast.error(resp.details, {style:{fontFamily:"Poppins"}});
            }

            handleModal();
        }
        
    }
    
    return (
        <>
            <Modal isOpen={isOpen}>
                <Title>Editar Coleção</Title>
                <form onSubmit={handleSubmit(update)}>
                    <Input  {...register('collectionName')} placeholder="Nome:" />
                    {errors.collectionName?.message && (
                        <ErrorSpan>{errors.collectionName?.message}</ErrorSpan>
                    )}
                    <Input style={{ marginBottom: "16px" }} {...register('image')} placeholder="Imagem:" />

                    <BottomAlignment>
                        <SubmitButton>Editar</SubmitButton>
                        <CloseButton onClick={handleModal}>Fechar</CloseButton>
                    </BottomAlignment>
                </form>
            </Modal>
        </>
    )

};