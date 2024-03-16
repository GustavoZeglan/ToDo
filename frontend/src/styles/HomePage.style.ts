import styled from "styled-components";

const Header = styled.header`
    width: 100%;
    padding: 12px 16px;
    background-color: #2e2d2d;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Poppins';
    color: #fff;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
`;

const Img = styled.img`
    height: 60px;
    cursor: pointer;
`;

const Item = styled.li`
    display: inline-block;
    padding-right: 16px;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
`;

const Main = styled.main`
    padding: 16px;
    background-color: #1b4a56;
    font-family: "Poppins";
    color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media only screen and (max-width: 500px) {
        flex-direction: column;
        justify-content: center;
    }
`;

const Title = styled.h1`
    font-family: "Montserrat", Arial;
    font-size: 40px;

    @media only screen and (max-width: 500px) {
        font-size: 20px;
    }
`;

const ImageMain = styled.img`
    width: 30%;

    @media only screen and (max-width: 500px) {
        width: 80%;
    }
`;

const Tecnologies = styled.div`
    display: flex;
    justify-content: center;
    background-color: #2e2d2d;
    align-items: center;
    padding: 16px;
    color: #fff;
`;

const Subtitle = styled.h1`
    font-family: "Montserrat", Arial;
    text-align: center;

    @media only screen and (max-width: 500px) {
        font-size: 22px;
    }
`;

const TechContent = styled.div`
    margin-top: 16px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    
`;

const FrameworkImg = styled.img`
    height: 44px;
    padding: 12px;
`;

const CustomizedBr = styled.br`
    display: block;

    @media only screen and (max-width: 500px) {
        display: none;
    }

`;

export { CustomizedBr, FrameworkImg, Header, ImageMain, Img, Item, Main, Subtitle, TechContent, Tecnologies, Title };

