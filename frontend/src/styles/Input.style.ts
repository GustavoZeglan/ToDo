import styled from "styled-components";

const Input = styled.input`
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

    @media only screen and (max-width: 500px) {
        width: 276px;
    }

`;

export { Input };
