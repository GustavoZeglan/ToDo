import Modal from "@/components/Modal";
import { DashboardContext } from "@/context/dashboardContext";
import { getData } from "@/controllers/collection";
import { collectionSchema } from "@/schemas/collectionSchema";
import { CollectionService } from "@/service/collectionService";
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

export const InsertCollectionModal = ({ id, token, isOpen, handleModal }: CollectionModalProps) => {

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

    const addCollection = async (data: FormProps) => {

        const { collectionName, image } = data;

        const service = new CollectionService();

        const response = await service.insert(id, collectionName, image, token).catch((error) => {
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
                    <StyledInput  {...register('collectionName')} placeholder="Nome:" />
                    {errors.collectionName?.message && (
                        <ErrorSpan>{errors.collectionName?.message}</ErrorSpan>
                    )}
                    <StyledInput style={{ marginBottom: "16px" }} {...register('image')} placeholder="Imagem:" />

                    <BottomAlignment>
                        <SubmitButton type="submit">Adicionar</SubmitButton>
                        <CloseButton onClick={handleModal}>Fechar</CloseButton>
                    </BottomAlignment>
                </form>
            </Modal>
        </>
    )

}