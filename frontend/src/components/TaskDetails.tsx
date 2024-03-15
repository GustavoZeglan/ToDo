import { TaskService } from "@/service/taskService";
import { Checkbox, Details, Summary } from "@/styles/TaskDetails.style";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";

interface TaskDetailsProps {
    id: string,
    token: string,
    taskId: number,
    name: string,
    description: string,
    isDone: boolean,
}


export const updateTask = async (id: string, token: string, taskId: number, name: string, description: string, isDone: boolean) => {
    const service = new TaskService();

    const data = await service.update(id,token,taskId,name,description,isDone).then(resp => {
        return resp.data.message;
    });

    toast.success(String(data), {style: {fontFamily: 'Poppins'}});
}   

export const TaskDetails = ({ id, token, taskId, name, description, isDone }: TaskDetailsProps) => {

    const [isActive, setIsActive] = useState(false);
    const [isMarked, setIsMarked] = useState<boolean>(isDone);

    return (
        <>
            <Details>
                
                <Summary onClick={() => {
                    setIsActive(!isActive ? true : false)
                }}> <div style={{display:"flex",alignItems:"center"}}><Checkbox type="checkbox" checked={isMarked} 
                onChange={async () => {
                    const value = !isMarked;
                    setIsMarked(value)
                    await updateTask(id, token, taskId, name, description, value);
                    }} /> 
                {name}</div><i><FontAwesomeIcon icon={!isActive ? faCaretDown : faCaretUp} /></i></Summary>
                
                
                <p style={{marginTop:"6px"}}>{description}</p>
                
            </Details>
        </>
    )

}