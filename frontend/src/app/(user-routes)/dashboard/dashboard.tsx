import { DashboardContext } from "@/context/dashboardContext";
import { Collumn, DashBoardStyle, DashboardSummary, Hi, List, Row, Text } from "@/styles/DashBoard.style";
import { faAdd, faCaretDown, faCaretUp, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";

interface DashBoardProps {
    name: string,
    handleModal: () => void,
}

export default function DashBoard({ name, handleModal}: DashBoardProps) {

    const {collections, handleCollection } = useContext(DashboardContext);
    const [isActive, setIsActive] = useState(false);

    return (
        <DashBoardStyle>
            <Hi>Olá, {name}</Hi>
            <Collumn>
                <div>
                    <Row style={{ backgroundColor: isActive ? "#4b4a4a" : "#2A2A2A", padding: "12px", 
                    borderRadius: "10px", border: "1px solid #4b4a4a"}}>

                        <details style={{ width: "100%" }}>
                            <DashboardSummary style={{width:"100%", display: "flex", justifyContent:"space-between"}}
                             onClick={() => {
                                    setIsActive(!isActive ? true : false)
                                    handleCollection(null)
                                }
                                }>Coleções <i><FontAwesomeIcon icon={!isActive ? faCaretDown : faCaretUp} /></i> </DashboardSummary>
                            <ul>
                                {
                                    collections.map((value, i) => {
                                        return <List style={{cursor:"pointer"}} onClick={() => handleCollection(value.id)} key={i}>{value.name}</List>
                                    })
                                }
                            </ul>
                        </details>
                    </Row>

                
                <Text onClick={handleModal}>
                    <i><FontAwesomeIcon icon={faAdd} style={{ paddingRight: "10px", fontSize: "18px" }}/></i>
                    Criar Coleção
                </Text>


                </div>

                <p style={{ cursor: "pointer", padding:"12px"}}
                    onClick={() => { signOut() }}><i><FontAwesomeIcon style={{ paddingRight: "10px", fontSize: "18px" }}
                        icon={faRightToBracket} /></i>
                    Desconectar</p>

            </Collumn>
        </DashBoardStyle>
    )

}