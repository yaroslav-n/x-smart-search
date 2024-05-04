import { FC, useCallback, useEffect, useState } from "react"
import { LLMClient } from "../generic/llm_client"
import { TextInput } from "./components/inputs/text_input";
import { Button } from "./components/inputs/button";
import styled from "styled-components";
import { Space } from "./components/space";
import { Colors } from "./components/colors";
import { promptTemplate } from "../generic/prompt_template";

export const Settings: FC<{}> = () => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [input, setInput] = useState("")
    const [result, setResult] = useState("")

    useEffect(() => {
        LLMClient.getToken().then(setToken);
    }, []);

    const onSave = useCallback(() => {
        LLMClient.setToken(token ?? "");
    }, [token])

    const onSubmitPrompt = useCallback(() => {
        const prompt = promptTemplate(input);
        LLMClient.convertText(prompt).then((result) => setResult(result ?? ""))
    }, [input])

    return (
        <div>
            <TokenContainer onSubmit={onSave}>
                <TextInput value={token ?? ""} onChange={setToken} placeholder="groq token" />
                <Space width={8} />
                <Button type="secondary" label="Save" onClick={onSave} />
            </TokenContainer>
            <InputContainer>
                <TextInput value={input} onChange={setInput} placeholder="search query" />
                <Space width={8} />
                <Button type="secondary" label="Submit" onClick={onSubmitPrompt} />
            </InputContainer>
            <Result>{result}</Result>
        </div>
    )
}

const TokenContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputContainer = styled.div`

`;

const Result = styled.div`
    background-color: ${Colors.somewhatGrey};
`;