import styled from 'styled-components';

interface ButtonProps {
    text: string,
}

const StyledButton = styled.button`
    margin-top: 16px;
    width: 340px;
    height: 48px;
    background-color: #3e3e40;
    color: #f9f9f9;
    border: none;
    border-radius: 10px;
    font-size: 26px;
    font-family: 'Poppins';
    text-align: center;
    cursor:pointer;

    button:hover {
        background-color: #2b2b2c;
    }

`

const Button = ({text}: ButtonProps) => {
    return <StyledButton type='submit'>{text}</StyledButton>
};

export default Button;