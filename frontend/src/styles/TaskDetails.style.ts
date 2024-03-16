import styled from "styled-components";


const Details = styled.details`
    all: unset;
    width: 100%;
    background-color: #4a4a4a;
    border: none;
    border-radius: 15px;
    color: #fff;
    font-family: 'Poppins';
    margin-bottom: 16px;
    padding: 12px;

    @media only screen and (max-width: 500px) {
        width: 100%;
        display: block;
    }

`;

const Summary = styled.summary`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    cursor: pointer;
    width: 96%;

    @media only screen and (max-width: 500px) {
        width: 90%;
    }

    @media only screen and (max-width: 900px) {
        width: 92%;
    }

`;

const SummaryContent = styled.div`
    display: flex; 
    justify-content: space-between;
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

const DropDown = styled.div`
    padding: 2px;
    background-color:#4a4b4b;
    position:absolute;
    border: 2px solid #c2c4c4;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    z-index: 9999;
`;

const Option = styled.p`
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    display: inline-block;
    cursor: pointer;
    &:hover {
        background-color: #5f6161;
    }
    
    @media only screen and (max-width: 500px) {
        text-align: center;
    }

`;


const Text = styled.span`
    display: inline-block;
`;

export { Checkbox, Details, DropDown, Option, Summary, SummaryContent, Text };

