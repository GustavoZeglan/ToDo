"use client"
import CollectionCard from "@/components/CollectionCard";
import { TaskDetails } from "@/components/TaskDetails";
import { DashboardContext } from "@/context/dashboardContext";
import { deleteCollection, getData } from "@/controllers/collection";
import { getTasks } from "@/controllers/task";
import { BottomAlignment, Collumn, DeleteButton, Div, Image, ImageBox, Title, UpdateButton } from "@/styles/Content.style";
import Collection from "@/types/collection";
import { useContext, useEffect, useState } from "react";

interface ContentProps {
    id: string,
    token: string,
    handleModal: () => void,
}

export default function Content({ id, token, handleModal }: ContentProps) {

    const { collections, collectionId, getCollections, handleCollection, tasks, handleTasks } = useContext(DashboardContext);
    const [loadCollections, setLoadCollections] = useState<boolean>(false);

    
    useEffect(() => {

        if (collectionId != null) {

            const fetchTasks = async () => {
                const data = await getTasks(id, collectionId, token);
                handleTasks(data);
            }

            fetchTasks();

        } else if(collectionId == null && !loadCollections) {

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
                    handleCollection(value.id)}
                } key={i} name={value.name}
                    image={value.image} id={value.id} color={value.color} />
            })}
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
            return (
                <Collumn>
                    <ImageBox>
                        <Image src={'/ian-dooley-DJ7bWa-Gwks-unsplash.jpg'} />
                    </ImageBox>
                    <Title>{collection.name}</Title>

                    {
                        tasks.map((value, i) => {
                            return (
                                <TaskDetails key={i} id={id} taskId={value.id} token={token}
                                    name={value.name} description={value.description} isDone={value.isDone} />
                            )
                        })
                    }

                    <BottomAlignment>
                        <UpdateButton type="submit" onClick={handleModal}>Editar coleção</UpdateButton>
                        <DeleteButton onClick={async () => {
                            deleteCollection(id, collectionId, token);
                            setLoadCollections(false);
                            const data = await getData(id,token);
                            getCollections(data);
                            handleCollection(null);
                        }}>Excluir coleção</DeleteButton>
                    </BottomAlignment>

                </Collumn>
            )
        }

    }

    return collectionId != null ? renderCollection() : renderCards()
}
