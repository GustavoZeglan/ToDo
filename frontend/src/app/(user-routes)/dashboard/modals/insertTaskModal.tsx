import Modal from "@/components/Modal";
import { DashboardContext } from "@/context/dashboardContext";
import { getTasks } from "@/controllers/task";
import { TaskSchema } from "@/schemas/taskSchema";
import { TaskService } from "@/service/taskService";
import { ErrorSpan } from "@/styles/ErrorSpan.style";
import { Input } from "@/styles/Input.style";
import { BottomAlignment, CloseButton, SubmitButton, Title } from "@/styles/Main.style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TaskModalProps {
    id: string,
    token: string,
    isOpen: boolean,
    handleModal: () => void;
}

const formType = TaskSchema.omit({ taskId: true });

type FormProps = z.infer<typeof formType>;

export const InsertTaskModal = ({ id, token, isOpen, handleModal }: TaskModalProps) => {

    const { collectionId, handleTasks } = useContext(DashboardContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(formType),
        defaultValues: {
            name: '',
            description: '',
        }
    });

    const addCollection = async (data: FormProps) => {

        const { name, description } = data;

        const service = new TaskService();

        const str = description ? description : "";

        if (collectionId != null) {
            const response = await service.insert(id, token, collectionId, name, str).catch((error) => {
                throw new Error(error);
            });
            
            if (response.status != 201) {
                toast.error(response.data.details, { style: { fontFamily: "Poppins" } });
            } else {
                const tsk = await getTasks(id, collectionId, token);
                handleTasks(tsk);
                toast.success(response.data.message, { style: { fontFamily: "Poppins" } })
            }

        }

        handleModal()

    };


    return (
        <>
            <Modal isOpen={isOpen}>
                <Title>Adicionar Tarefa</Title>
                <form onSubmit={handleSubmit(addCollection)}>
                    <Input  {...register('name')} placeholder="Nome:" />
                    {errors.name?.message && (
                        <ErrorSpan>{errors.name?.message}</ErrorSpan>
                    )}
                    <Input style={{ marginBottom: "16px" }} {...register('description')} placeholder="Descrição:" />

                    <BottomAlignment>
                        <SubmitButton type="submit">Adicionar</SubmitButton>
                        <CloseButton onClick={handleModal}>Fechar</CloseButton>
                    </BottomAlignment>
                </form>
            </Modal>
        </>
    )

}