import Collection from "@/types/collection";
import React, { createContext, useState } from "react";


interface DashboardContextProps {
    collections: Array<Collection>,
    tasks: Array<Task>,
    collectionId: number | null,
    getCollections(arr: Array<Collection>): void,
    handleCollection: (id: number | null) => void,
    handleTasks: (arr: Array<Task>) => void,
}


const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

const DashboardProvider = ({children}: { children: React.ReactNode }) => {

    const [collections, setCollections] = useState<Array<Collection>>([]);
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [collectionId, setCollectionId] = useState<number | null>(null);

    function getCollections(arr: Array<Collection>) {
        setCollections(arr);
    }

    function handleCollection(id: number | null) {
        setCollectionId(id);
    }

    function handleTasks(arr: Array<Task>) {
        setTasks(arr);
    }

    return (
        <DashboardContext.Provider value={{getCollections, handleCollection, collectionId, collections, tasks, handleTasks}}>
            <>{children}</>
        </DashboardContext.Provider>
    )

}

export { DashboardContext, DashboardProvider };

