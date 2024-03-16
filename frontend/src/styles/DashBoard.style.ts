import styled from "styled-components";


const DashBoardStyle = styled.div`
    width: 20%;
    height: 100%;
    top:0;
    left: 0;
    padding: 16px;
    background-color: #2A2A2A;
    color: #fff;
    position: fixed;

    @media only screen and (max-width: 500px) {
        display: none;
    }

`;

const Hi = styled.h2`
    text-align: center;
`;

const DashboardSummary = styled.summary`
    all: unset;
    cursor: pointer;
    font-size: 18px;

    @media only screen and (max-width: 900px) {
        font-size: 16px;
    }

`;

const List = styled.li`
    list-style: none;

    @media only screen and (max-width: 900px) {
        font-size: 14px;
    }

`;

const Text = styled.p`
    cursor:pointer; 
    padding:12px;
    border-radius:10px; 
    border: 1px solid #4b4a4a;
    font-size: 18px;
    @media only screen and (max-width: 900px) {
        font-size: 14px;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Collumn = styled.div`
    display: flex;
    height: 85%;
    flex-direction: column;
    justify-content: space-between;
`;

export { Collumn, DashBoardStyle, DashboardSummary, Hi, List, Row, Text };

