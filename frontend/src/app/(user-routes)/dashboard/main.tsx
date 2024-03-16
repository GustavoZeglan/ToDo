"use client"
import { Header, HomeContent, Layout, LogoImg } from "@/styles/DashboardPage.style";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Content from "./Content";
import DashBoard from "./dashboard";
import { InsertCollectionModal } from "./modals/insertCollectionModal";
import { InsertTaskModal } from "./modals/insertTaskModal";
import { UpdateCollectionModal } from "./modals/updateCollectionModal";
import { UpdateTaskModal } from "./modals/updateTaskModal";

interface MainProps {
    name: string,
    id: string,
    token: string,
}

export default function Main({ name, id, token }: MainProps) {
    const router = useRouter();

    const [insertCollectionModalIsOpen, setInsertCollectionIsOpen] = useState(false);
    const [updateCollectionModalIsOpen, setUpdateCollectionModalIsOpen] = useState(false);
    const [insertTaskModalIsOpen, setInsertTaksModalIsOpen] = useState(false);
    const [updateTaskModalIsOpen, setUpdateTaksModalIsOpen] = useState(false);

    function handleInsertCollectionModal() {
        const value = insertCollectionModalIsOpen ? false : true;
        setInsertCollectionIsOpen(value);
    }

    function handleUpdateCollectionModal() {
        const value = updateCollectionModalIsOpen ? false : true;
        setUpdateCollectionModalIsOpen(value);
    }

    function handleInsertTaskModal() {
        const value = insertTaskModalIsOpen ? false : true;
        setInsertTaksModalIsOpen(value);
    }

    function handleUpdateTaskModal() {
        const value = updateTaskModalIsOpen ? false : true;
        setUpdateTaksModalIsOpen(value);
    }

    return (<>
        <Layout>
            <Header><LogoImg src="/Tarefas.png" onClick={() => {router.push('/')}}/></Header>
            <DashBoard name={name} handleModal={handleInsertCollectionModal} />
            <HomeContent>
                <Content id={id} token={token} handleUpdateModal={() => setUpdateCollectionModalIsOpen(!updateCollectionModalIsOpen)}
                    handleAddTaskModal={handleInsertTaskModal} handleUpdateTaskModal={handleUpdateTaskModal}
                    handleAddCollectionModal={handleInsertCollectionModal} />
            </HomeContent>
            <InsertCollectionModal id={id} token={token} isOpen={insertCollectionModalIsOpen} handleModal={handleInsertCollectionModal} />
            <UpdateCollectionModal id={id} token={token} isOpen={updateCollectionModalIsOpen} handleModal={handleUpdateCollectionModal} />
            <InsertTaskModal id={id} token={token} isOpen={insertTaskModalIsOpen} handleModal={handleInsertTaskModal} />
            <UpdateTaskModal id={id} token={token} isOpen={updateTaskModalIsOpen} handleModal={handleUpdateTaskModal} />
        </Layout>
    </>)

}