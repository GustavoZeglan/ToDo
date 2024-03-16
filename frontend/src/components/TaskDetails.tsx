import { DashboardContext } from "@/context/dashboardContext";
import { deleteTask, getTasks, updateTask } from "@/controllers/task";
import { Checkbox, Details, DropDown, Option, Summary, SummaryContent, Text } from "@/styles/TaskDetails.style";
import { faCaretDown, faCaretUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

interface TaskDetailsProps {
    id: string,
    token: string,
    taskId: number,
    name: string,
    description: string,
    isDone: boolean,
    handleModal: () => void,
}

export const TaskDetails = ({ id, token, taskId, name, description, isDone, handleModal }: TaskDetailsProps) => {

    const { handleTaskId, collectionId, handleTasks } = useContext(DashboardContext);
    const [isActive, setIsActive] = useState(false);
    const [isMarked, setIsMarked] = useState<boolean>(isDone);
    const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

    return (
        <>
            <div style={{ position: "relative", width: "60%" }}>

                <div style={{ position: "absolute", top: "14px", right: "-8px" }}>
                    <i style={{ color: "#fff", cursor: "pointer" }}
                        onClick={() => setMenuIsActive(!menuIsActive)}><FontAwesomeIcon icon={faEllipsisVertical} /></i>

                    <DropDown style={{ display: menuIsActive ? "block" : "none" }}>

                        <Option onClick={() => {
                            setMenuIsActive(false);
                            handleTaskId(taskId);
                            handleModal()
                        }}>
                            <Text>Editar</Text>
                        </Option>

                        <Option onClick={async () => {
                            await deleteTask(id, token, taskId);
                            if (collectionId != null) {
                                setMenuIsActive(false);
                                const data = await getTasks(id, collectionId, token);
                                handleTasks(data);
                            }
                        }}>
                            <Text>Excluir</Text>
                        </Option>


                    </DropDown>

                </div>

                <Details>

                    <Summary style={{ display: "flex", alignItems: "center" }}>

                        <Checkbox type="checkbox" checked={isMarked}
                            onChange={async () => {
                                const value = !isMarked;
                                setIsMarked(value)
                                await updateTask(id, token, taskId, name, description, value);
                            }} />

                        <SummaryContent onClick={() => { setIsActive(!isActive ? true : false) }}>
                            {name}
                            <i><FontAwesomeIcon icon={!isActive ? faCaretDown : faCaretUp} /></i>
                        </SummaryContent>

                    </Summary>


                    <p style={{ marginTop: "6px" }}>{description}</p>

                </Details>
            </div>
        </>
    )

}