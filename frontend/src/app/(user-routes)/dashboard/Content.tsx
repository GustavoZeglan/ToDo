"use client"
import CollectionCard from "@/components/CollectionCard";
import { TaskDetails } from "@/components/TaskDetails";
import { DashboardContext } from "@/context/dashboardContext";
import { deleteCollection, getData } from "@/controllers/collection";
import { getTasks } from "@/controllers/task";
import { Arrow, BottomAlignment, Collumn, DeleteButton, Div, FloatingButton, Image, ImageBox, Title, UpdateButton } from "@/styles/Content.style";
import Collection from "@/types/collection";
import { isValidURL } from "@/utils/urlValidator";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

interface ContentProps {
    id: string,
    token: string,
    handleUpdateModal: () => void,
    handleAddTaskModal: () => void,
    handleUpdateTaskModal: () => void,
    handleAddCollectionModal: () => void,
}

export default function Content({ id, token, handleUpdateModal,
    handleAddTaskModal, handleUpdateTaskModal, handleAddCollectionModal }: ContentProps) {

    const { collections, collectionId, getCollections, handleCollection, tasks, handleTasks } = useContext(DashboardContext);
    const [loadCollections, setLoadCollections] = useState<boolean>(false);


    useEffect(() => {

        if (collectionId != null) {

            const fetchTasks = async () => {
                const data = await getTasks(id, collectionId, token);
                handleTasks(data);
            }

            fetchTasks();

        } else if (collectionId == null && !loadCollections) {

            setLoadCollections(true);

            const fetchCollections = async () => {
                const data = await getData(id, token);
                getCollections(data);
            }

            fetchCollections();
        }

    }, [collectionId, collections, loadCollections]);

    function renderCards() {

        return (<Div> {
            collections.map((value, i) => {
                return <CollectionCard onClick={() => {
                    setLoadCollections(false);
                    handleCollection(value.id)
                }
                } key={i} name={value.name}
                    image={value.image} id={value.id} />
            })}
            <FloatingButton onClick={handleAddCollectionModal}>
                <p><i><FontAwesomeIcon icon={faAdd} /></i></p>
            </FloatingButton>
        </Div>)
    }

    function renderCollection() {
        let collection: Collection = collections[0];

        collections.forEach(element => {
            if (element.id == collectionId) {
                collection = element;
            }
        });

        if (collection) {
            const img = isValidURL(collection.image) ? collection.image : "/ian-dooley-DJ7bWa-Gwks-unsplash.jpg";

            return (
                <Collumn>
                    <Arrow onClick={() => {
                        handleCollection(null);
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Arrow>
                    <ImageBox>
                        <Image src={img} />
                    </ImageBox>
                    <Title>{collection.name}</Title>

                    {
                        tasks.map((value) => {
                            return (
                                <TaskDetails key={value.id} id={id} taskId={value.id} token={token} handleModal={handleUpdateTaskModal}
                                    name={value.name} description={value.description} isDone={value.isDone} />
                            )
                        })
                    }

                    <BottomAlignment>
                        <UpdateButton type="submit" onClick={handleUpdateModal}>Editar coleção</UpdateButton>
                        <UpdateButton type="submit" onClick={handleAddTaskModal}>Adicionar Tarefa</UpdateButton>
                        <DeleteButton onClick={async () => {
                            const collecId: number = collectionId || 0;
                            await deleteCollection(id, collecId, token);
                            setLoadCollections(false);
                            const data = await getData(id, token);
                            getCollections(data);
                            handleTasks([]);
                            handleCollection(null);
                        }}>Excluir coleção</DeleteButton>
                    </BottomAlignment>

                </Collumn>
            )
        }

    }

    return collectionId != null ? renderCollection() : renderCards()
}
