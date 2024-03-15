import styled from "styled-components";


const Details = styled.details`
    all: unset;
    width: 60%;
    background-color: #4a4a4a;
    border: none;
    border-radius: 15px;
    color: #fff;
    font-family: 'Poppins';
    margin-bottom: 16px;
    padding: 12px;
`;

const Summary = styled.summary`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
`;

const Checkbox = styled.input`
    border: none;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border-radius: 0.15em;
    cursor: pointer;
    margin-right: 6px;
`;


export { Checkbox, Details, Summary };
