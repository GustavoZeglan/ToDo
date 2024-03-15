import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 36px auto;
    width: 80%;
    height: 100%;
`;

const Collumn = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    margin: 36px auto;
`;

const ImageBox = styled.div`
    width: 60%;
    height: 244px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-repeat: repeat;
    background-size: cover;
`;

const UpdateButton = styled.button`
    background-color: #1f69c4;
    padding: 16px;
    border: none;
    color: #fff;
    border-radius: 12px;
    margin: 6px;
    font-family: 'Poppins';
    font-size: 16px;
    cursor: pointer;
`;

const DeleteButton = styled.button`
    background-color: #c83d3d;
    padding: 16px;
    border: none;
    color: #fff;
    border-radius: 12px;
    margin: 6px;
    font-family: 'Poppins';
    font-size: 16px;
    cursor: pointer;
`;

const BottomAlignment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 24px;
`;

const Title = styled.h1`
    text-align: center;
`;

export { BottomAlignment, Collumn, DeleteButton, Div, Image, ImageBox, Title, UpdateButton };

