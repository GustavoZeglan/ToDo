import styled from "styled-components";


interface InputProps {
    text: string,
    type: string,
}

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

const Input = ({text,type}: InputProps) => {
    return <StyledInput type={type} placeholder={text}/>
}

export default Input;