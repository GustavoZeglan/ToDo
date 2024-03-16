import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    

    @media only screen and (max-width: 500px) {
        margin-top: 40px;
        justify-content: center;
    }

    @media only screen and (max-width: 900px) {
        justify-content: center;
    }

`;

const FloatingButton = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: #1f69c4;
    position: fixed;
    bottom: 16px;
    right: 16px;
    display: none;
    cursor: pointer;

    @media only screen and (max-width: 500px) {
        display: block;
    }

`;

const Collumn = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    margin: 36px auto;

    @media only screen and (max-width: 500px) {
        width: 100%;
        margin: 16px;
    }

`;

const ImageBox = styled.div`
    width: 60%;
    height: 244px;

    @media only screen and (max-width: 500px) {
        width: 100%;
    }

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
    &:hover {
        background-color: #1e518f;
    }

    @media only screen and (max-width: 500px) {
        width: 100%;
        display: block;
    }

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
    &:hover {
        background-color: #a63737;
    }

    @media only screen and (max-width: 500px) {
        width: 100%;
        display: block;
    }

`;

const BottomAlignment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 24px;

    @media only screen and (max-width: 500px) {
        flex-direction: column;
    }

`;

const Title = styled.h1`
    text-align: center;
`;

const Arrow = styled.p`
    font-size: 32px;
    color: #4a4a4a;
    display: none;
    align-self: flex-start;

    @media only screen and (max-width: 500px) {
        display: block;
    }

`;


export { Arrow, BottomAlignment, Collumn, DeleteButton, Div, FloatingButton, Image, ImageBox, Title, UpdateButton };

