import styled from "styled-components";

const SubmitButton = styled.button`
    background-color: #0da994;
    padding: 16px;
    border: none;
    color: #fff;
    border-radius: 12px;
    margin: 6px;
    font-family: 'Poppins';
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #148f7e;
    }
`;

const CloseButton = styled.button`
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

export { BottomAlignment, CloseButton, SubmitButton, Title };

