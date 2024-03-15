"use client"
import { useState } from "react";
import styles from "../../../styles/HomePage.module.css";
import Content from "./Content";
import DashBoard from "./dashboard";
import { InsertCollectionModal } from "./modals/insertCollectionModal";
import { UpdateCollectionModal } from "./modals/updateCollectionModal";

interface MainProps {
    name: string,
    id: string,
    token: string,
}

export default function Main({ name, id, token }: MainProps) {

    const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

    function handleInsertModal() {
        const value = insertModalIsOpen ? false : true;
        setInsertModalIsOpen(value);
    }

    function handleUpdateModal() {
        const value = updateModalIsOpen ? false : true;
        setUpdateModalIsOpen(value);
    }

    return (<>
        <div className={styles.Layout}>
            <DashBoard name={name} handleModal={handleInsertModal}/>
            <div className={styles.Content}>
                <Content id={id} token={token} handleModal={() => setUpdateModalIsOpen(!updateModalIsOpen)} />
            </div>
            <InsertCollectionModal id={id} token={token} isOpen={insertModalIsOpen} handleModal={handleInsertModal}/>
            <UpdateCollectionModal id={id} token={token} isOpen={updateModalIsOpen} handleModal={handleUpdateModal}/>
        </div>
    </>)

}