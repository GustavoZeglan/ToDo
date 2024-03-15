import styled from "styled-components";


const StyledInput = styled.input`
    margin-top: 12px;
    margin-bottom: 2px;
    width: 340px;
    height: 48px;
    border: none;
    border-radius: 10px;
    padding-left: 10px;
    background-color: #f5f1f1;
    display: block;
    font-size: 16px;
    font-family: 'Poppins';
`;

const ErrorSpan = styled.span`
    color: #cf3939;
    font-size: 16px;
    margin-top:2px;
    font-family: 'Poppins';
`;

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

export { BottomAlignment, CloseButton, ErrorSpan, StyledInput, SubmitButton, Title };

