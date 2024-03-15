import styled from "styled-components";

const Layout = styled.div`
    min-height: 100vh;
    display: flex; 
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1; 
    display: flex; 
    flex-direction: column;
    justify-content:center;
    align-items:center;
`

export { Content, Layout };
