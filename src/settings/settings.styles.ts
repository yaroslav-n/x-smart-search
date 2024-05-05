import styled from "styled-components";
import { Colors } from "./components/colors";

export const Root = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 20px 0 100px 0;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

export const HeaderTitle = styled.h1`
    font-size: 22px;
    font-weight: 600px;
`;

export const Columns = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start ;
    justify-content: center;
    column-gap: 30px;
    row-gap: 20px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 20px;
`;

export const Block = styled.div`
    box-sizing: border-box;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`

export const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin: 0;
    color: #324F6B;
`

export const SubTitle = styled.div`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: ${Colors.prettyGrey};
`;

export const GroqHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
`

export const Text = styled.div`
    font-size: 14px;
    line-height: 150%;
    color: ${Colors.veryDark};
`