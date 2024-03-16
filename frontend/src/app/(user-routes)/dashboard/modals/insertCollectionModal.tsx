import Modal from "@/components/Modal";
import { DashboardContext } from "@/context/dashboardContext";
import { getData } from "@/controllers/collection";
import { CollectionSchema } from "@/schemas/collectionSchema";
import { CollectionService } from "@/service/collectionService";
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

export const InsertCollectionModal = ({ id, token, isOpen, handleModal }: CollectionModalProps) => {

    const { getCollections } = useContext(DashboardContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(CollectionSchema),
        defaultValues: {
            collectionName: '',
            image: '',
        }
    });

    const addCollection = async (data: FormProps) => {

        const { collectionName, image } = data;

        const service = new CollectionService();

        const img = image ? image : "";

        const response = await service.insert(id, collectionName, img, token).catch((error) => {
            throw new Error(error);
        });

        if (response.status != 201) {
            toast.error(response.data.details, { style: { fontFamily: "Poppins" } });
        } else {
            const collec = await getData(id, token);
            getCollections(collec);
            toast.success(response.data.message, { style: { fontFamily: "Poppins" } })
        }
        handleModal()

    };


    return (
        <>
            <Modal isOpen={isOpen}>
                <Title>Cadastrar Coleção</Title>
                <form onSubmit={handleSubmit(addCollection)}>
                    <Input  {...register('collectionName')} placeholder="Nome:" />
                    {errors.collectionName?.message && (
                        <ErrorSpan>{errors.collectionName?.message}</ErrorSpan>
                    )}
                    <Input style={{ marginBottom: "16px" }} {...register('image')} placeholder="Imagem:" />

                    <BottomAlignment>
                        <SubmitButton type="submit">Adicionar</SubmitButton>
                        <CloseButton onClick={handleModal}>Fechar</CloseButton>
                    </BottomAlignment>
                </form>
            </Modal>
        </>
    )

}