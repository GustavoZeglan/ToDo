import styled from "styled-components";


interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode,
}


const Background = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:  rgba(0,0,0,0.7);
    height: 100vh;
    z-index: 1000;
`;

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 10px;
    z-index: 1;
    padding: 100px;
    color: #4a4a4a;
    font-family: 'Poppins';
`;

export default function Modal({ isOpen, children }: ModalProps) {

    if (isOpen) {
        return (
            <Background>
                <Container>
                    {children}
                </Container>
            </Background>
        )
    }


    return null;

}