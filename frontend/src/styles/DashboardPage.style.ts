import styled from "styled-components";

const Layout = styled.div`
    font-family: 'Poppins';
    height: 100vh;
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const HomeContent = styled.div`
    width: calc(100% - 20% - 36px);
    display: flex;
    top:0;
    left: 28.5%;
    transform: translateX(28.5%);
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;  

    @media only screen and (max-width: 500px) {
        transform: none;
        justify-content: center;
        width: 100%;
        padding-top: 50px;
    }
`;

const Header = styled.header`
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    padding: 12px 16px;
    background-color: #2e2d2d;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Poppins';
    color: #fff;
    display: none;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    
    @media only screen and (max-width: 500px) {
        display: flex;
    } 
`;

const LogoImg = styled.img`
    height: 60px;
    cursor: pointer;
`;



export { Header, HomeContent, Layout, LogoImg };

