import { DashboardContext } from "@/context/dashboardContext";
import { faAdd, faCaretDown, faCaretUp, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import styles from "../../../styles/DashBoard.module.css";

interface DashBoardProps {
    name: string,
    handleModal: () => void,
}

export default function DashBoard({ name, handleModal}: DashBoardProps) {

    const {collections, handleCollection } = useContext(DashboardContext);
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.DashBoard}>
            <h2>Olá, {name}</h2>
            <div className={styles.Collumn}>
                <div>
                    <div style={{ backgroundColor: isActive ? "#4b4a4a" : "#2A2A2A", padding: "12px", 
                    borderRadius: "10px", border: "1px solid #4b4a4a"}}
                        className={styles.Row}>

                        <details style={{ width: "100%" }}>
                            <summary style={{width:"100%", display: "flex", justifyContent:"space-between"}}
                             onClick={() => {
                                    setIsActive(!isActive ? true : false)
                                    handleCollection(null)
                                }
                                }>Coleções <i><FontAwesomeIcon icon={!isActive ? faCaretDown : faCaretUp} /></i> </summary>
                            <ul>
                                {
                                    collections.map((value, i) => {
                                        return <li style={{cursor:"pointer"}} onClick={() => handleCollection(value.id)} key={i}>{value.name}</li>
                                    })
                                }
                            </ul>
                        </details>
                    </div>

                
                <p style={{cursor:"pointer", padding:"12px",borderRadius: "10px", border: "1px solid #4b4a4a"}} onClick={handleModal}>
                    <i><FontAwesomeIcon icon={faAdd} style={{ paddingRight: "10px", fontSize: "18px" }}/></i>
                    Criar Coleção
                </p>


                </div>

                <p style={{ cursor: "pointer", padding:"12px"}}
                    onClick={() => { signOut() }}><i><FontAwesomeIcon style={{ paddingRight: "10px", fontSize: "18px" }}
                        icon={faRightToBracket} /></i>
                    Desconectar</p>

            </div>
        </div>
    )

}