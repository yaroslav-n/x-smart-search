import { FC, useCallback, useEffect, useState } from "react"
import { LLMClient } from "../generic/llm_client"
import { TextInput } from "./components/inputs/text_input";
import { Button } from "./components/inputs/button";
import styled from "styled-components";
import { Space } from "./components/space";
import { Colors } from "./components/colors";

export const Settings: FC<{}> = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        LLMClient.getToken().then(setToken);
    }, []);

    const onSave = useCallback(() => {
        LLMClient.setToken(token ?? "");
    }, [token])

    const onTest = useCallback(() => {
        // LLMClient.setToken(token ?? "");
    }, [token])


    return (
        <Root>
            <Columns>
                <TokenContainer onSubmit={onSave}>
                    <Block>
                        <GroqHeader>
                            <Title>Groq API Key&nbsp;<span style={{color: 'red'}}>*</span></Title>
                            <img src="./images/groq_logo.png" alt="Groq logo" width={40} />
                        </GroqHeader>
                        <Space height={20} />
                        <TextInput value={token ?? ""} onChange={setToken} placeholder="Groq API Key" />
                        <Space height={8} />
                        <ButtonWrap>
                            <Button type="primary" label="Save API Key" size="small" onClick={onSave} />
                            <Space width={10} />
                            <Button type="secondary" label="Test" size="small" onClick={onTest} />
                        </ButtonWrap>
                        <Space height={30} />
                        <SubTitle>How to get API key</SubTitle>
                    </Block>
                </TokenContainer>
            </Columns>
        </Root>
    )
}

const Root = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Columns = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    row-gap: 20px;
`;

const Block = styled.div`
    box-sizing: border-box;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin: 0;
    color: #324F6B;
`

const SubTitle = styled.div`
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 500;
    color: ${Colors.prettyGrey};
`;

const TokenContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const GroqHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
`