import { FC, FormEvent, useState } from "react";
import { Colors } from "../colors";
import { styled } from "styled-components";

type Props = {
    value: string;
    limit?: number;
    multiline?: boolean;
    height?: number;
    autofocus?: boolean;
    onChange: (value: string) => void;
    placeholder: string;
};

export const TextInput: FC<Props> = ({
    value,
    onChange,
    multiline = false,
    autofocus = false,
    height,
    limit,
    placeholder,
}) => {
    const [isInFocus, setInFocus] = useState(false);
    let newValue = value;

    if (typeof limit !== "undefined") {
        newValue = newValue.substring(0, limit - 1);
    }

    if (multiline) {
        return (
            <TextAreaContainer>
                <InputContainer $isInFocus={isInFocus} $height={height}>
                    <TextAreaEl
                        value={newValue}
                        onFocus={() => setInFocus(true)}
                        onBlur={() => setInFocus(false)}
                        onChange={(ev: FormEvent<HTMLTextAreaElement>) => onChange(ev.currentTarget.value)}
                        placeholder={placeholder}
                        autoFocus={autofocus}
                    />
                </InputContainer>
                {typeof limit !== "undefined" && isInFocus && (
                    <LimitLabelTextArea>
                        {value.length}/{limit}
                    </LimitLabelTextArea>
                )}
            </TextAreaContainer>
        );
    }

    return (
        <InputContainer $isInFocus={isInFocus} $height={height}>
            <TextInputEl
                type="text"
                value={newValue}
                onFocus={() => setInFocus(true)}
                onBlur={() => setInFocus(false)}
                onChange={(ev: FormEvent<HTMLInputElement>) => onChange(ev.currentTarget.value)}
                placeholder={placeholder}
                autoFocus={autofocus}
            />

            {typeof limit !== "undefined" && isInFocus && (
                <LimitLabel>
                    {value.length}/{limit}
                </LimitLabel>
            )}
        </InputContainer>
    );
};

const InputContainer = styled.div<{ $isInFocus: boolean; $height?: number }>`
    border: 1px solid ${Colors.prettyGrey};
    outline: 2px solid ${Colors.typicalGreySemi};
    outline-offset: 0px;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    height: ${(props) => props.$height ?? 34}px;
    width: 100%;
    border-radius: 6px;

    transition: border-color 200ms, outline-color 200ms;

    ${(props) =>
        props.$isInFocus &&
        `
        background-color: ${Colors.white};
        border-color: ${Colors.mainBlue};
        outline-color: rgba(28, 141, 255, 0.5);
    `}
`;

const TextAreaContainer = styled.div`
    position: relative;
`;

const TextInputEl = styled.input`
    border-width: 0;
    outline-style: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 13px;
    text-align: left;
    vertical-align: middle;

    &::placeholder {
        color: ${Colors.prettyGrey};
    }
`;

const TextAreaEl = styled.textarea`
    border-width: 0;
    outline-style: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 13px;
    line-height: 18px;
    text-align: left;
    resize: none;

    &::placeholder {
        color: ${Colors.prettyGrey};
    }
`;

const LimitLabel = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    color: ${Colors.prettyGrey};
    font-size: 13px;
    border-radius: 3px;
`;

const LimitLabelTextArea = styled(LimitLabel)`
    height: auto;
    position: absolute;
    right: -5px;
    bottom: calc(100% + 7px);
`;
