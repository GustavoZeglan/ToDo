import Modal from "@/components/Modal";
import { DashboardContext } from "@/context/dashboardContext";
import { getData, updateCollection } from "@/controllers/collection";
import { collectionSchema } from "@/schemas/collectionSchema";
import { BottomAlignment, CloseButton, ErrorSpan, StyledInput, SubmitButton, Title } from "@/styles/Main.style";
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

type FormProps = z.infer<typeof collectionSchema>;

export const UpdateCollectionModal = ({id, token, isOpen, handleModal}: CollectionModalProps) => {

    const { getCollections, collectionId } = useContext(DashboardContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            collectionName: '',
            image: '',
        }
    });

    const update = async (data: FormProps) => {
        const { collectionName, image } = data;

        if (collectionId != null ) {

            const resp = await updateCollection(id, collectionId, collectionName, image, token); 

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
                    <StyledInput  {...register('collectionName')} placeholder="Nome:" />
                    {errors.collectionName?.message && (
                        <ErrorSpan>{errors.collectionName?.message}</ErrorSpan>
                    )}
                    <StyledInput style={{ marginBottom: "16px" }} {...register('image')} placeholder="Imagem:" />

                    <BottomAlignment>
                        <SubmitButton>Adicionar</SubmitButton>
                        <CloseButton onClick={handleModal}>Fechar</CloseButton>
                    </BottomAlignment>
                </form>
            </Modal>
        </>
    )

};