import { isValidURL } from "@/utils/urlValidator";
import styled from "styled-components";

interface CollectionProps {
    id: number,
    name: string,
    image: string,
    onClick: () => void
}

const Card = styled.div`
    width:184px;
    height:200px;
    display: grid;
    flex-direction: column;
    box-sizing: border-box;
    justify-content:space-evenly;
    border: 1px solid #575757;
    border-radius: 10px;
    margin:18px;
    font-weight: 400;
    cursor: pointer;
    -webkit-box-shadow: 0px 7px 5px 0px rgba(138,130,138,1);
    -moz-box-shadow: 0px 7px 5px 0px rgba(138,130,138,1);
    box-shadow: 0px 7px 5px 0px rgba(138,130,138,1);
`;

const Div = styled.img`
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0px 0px;
`;

const Paragraph = styled.p`
    padding-left: 10px;
`;

export default function CollectionCard({ id, name, image, onClick }: CollectionProps) {

    const img = isValidURL(image) ? image : "/ian-dooley-DJ7bWa-Gwks-unsplash.jpg";

    return (
        <Card onClick={onClick}>
            <Div src={img} alt={""} />
            <Paragraph>{name}</Paragraph>
        </Card>
    )
}