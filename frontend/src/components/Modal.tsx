import { Background, Container } from "@/styles/Modal.style";


interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode,
}

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