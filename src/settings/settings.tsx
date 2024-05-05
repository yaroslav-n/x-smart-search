import { FC, useCallback, useEffect, useState } from "react"
import { LLMClient } from "../generic/llm_client"
import { TextInput } from "./components/inputs/text_input";
import { Button } from "./components/inputs/button";
import { Space } from "./components/space";
import { Block, ButtonWrap, Column, Columns, GroqHeader, Header, HeaderTitle, Root, SubTitle, Text, Title } from "./settings.styles";

export const Settings: FC<{}> = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        LLMClient.getToken().then(setToken);
    }, []);

    const onSave = useCallback(() => {
        LLMClient.setToken(token ?? "");
        alert('API Key saved');
    }, [token])

    const onTest = useCallback(async () => {
        try {
            LLMClient.setToken(token ?? "");
            const result = await LLMClient.convertText('test');

            if (!result) {
                throw new Error('Test failed');
            }
            alert('Test successful');
        } catch (e) {
            alert('Test failed. Please check your API key or network connection.');
        }
    }, [token])


    return (
        <Root>
            <Header>
                <img src="./icons/48.png" alt="X Smart Search" width={36} />
                <Space width={10} />
                <HeaderTitle>X Smart Search</HeaderTitle>
            </Header>
            <Columns>
                <Column>
                    <Block>
                        <Title>Welcome to the X Smart Search extension.</Title>
                        <Space height={15} />
                        <Text>
                        To continue, please add an API Key from a Groq AI service.<br/>It’s free while in beta and will cost ~2-3 cents per 1000 (thousand) of search query completions when it’ll go public.
                        </Text>
                    </Block>
                    <Block>
                        <Title>How to use this extension</Title>
                        <Space height={15} />
                        <Text>
                        Open X and start searching for tweets. Use natural language to narrow your search, e.g. “<i>tweets by elon musk last week with only images</i>” will be automatically converted into filters that X can understand, “<i>filter:images from:elonmusk since:2024-04-29 unti:2024-05-06</i>”
                        <img src="./images/example.gif" style={{ margin: '10px 0' }} alt="Example" width="100%" />
                        </Text>
                    </Block>
                    <Block>
                        <Title>Recognized filters</Title>
                        <Space height={15} />
                        <Text>
                            <ul style={{ marginBlockStart: 0, paddingInlineStart: 15, lineHeight: '20px' }}>
                                <li>posts with images, media, links, quote tweets</li>
                                <li>replies to or from a certain user</li>
                                <li>posts wil links to a certain domain</li>
                                <li>posts near certain location, e.g. “near Los Angeles” or “within 10km of New York”</li>
                                <li>posts for certain time period, e.g. “posts in 2023” or “posts last week”</li>
                                <li>posts with certain amount of likes, retweets, replies, quote tweets</li>
                            </ul>
                        </Text>
                    </Block>
                </Column>
                <Column>
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
                        <Text>
                            <ul style={{ marginBlockStart: 10, paddingInlineStart: 15, lineHeight: '20px' }}>
                                <li>Open <a href="https://console.groq.com" target="_blank">console.groq.com</a></li>
                                <li>Sign in</li>
                                <li>In the left menu, click “API Keys”</li>
                                <li>Click “Create API Key” button</li>
                                <li>Name your API Key, it can be anything</li>
                                <li>Copy your API Key and insert it into the input on this page</li>
                            </ul>
                        </Text>
                    </Block>
                    <Block>
                        <Title>Why Groq</Title>
                        <Space height={15} />
                        <Text>
                            Groq is an AI Platform, much like OpenAI. The main difference is that Groq returns results much faster, which is handy when we need to return search suggestions in near real-time. You can read about them on <a href="https://en.wikipedia.org/wiki/Groq" target="_blank">Wikipedia</a>.
                        </Text>
                    </Block>
                    <Block>
                        <Title>Extension Author</Title>
                        <Space height={15} />
                        <Text>
                            This extension was made by <a href="https://x.com/512x512">@512x512</a> in 2024
                        </Text>
                    </Block>
                </Column>
            </Columns>
        </Root>
    )
}