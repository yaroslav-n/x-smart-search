import { FC } from "react";
import { styled } from "styled-components";
import { Colors } from "../colors";

type Props = {
    iconName?: string;
    label: string;
    type: "primary" | "secondary";
    size?: "large" | "small";
    width?: number;
    disabled?: boolean;
    onClick: () => void;
    "data-tooltip-id"?: string;
    "data-tooltip-content"?: string;
};

export const Button: FC<Props> = ({
    iconName,
    label,
    type,
    size = "large",
    width,
    disabled = false,
    onClick,
    ...rest
}) => {
    return (
        <ButtonEl
            onClick={onClick}
            type={type}
            size={size}
            disabled={disabled}
            width={width}
            data-tooltip-id={rest["data-tooltip-id"]}
            data-tooltip-content={rest["data-tooltip-content"]}
        >
            {label}
        </ButtonEl>
    );
};

type ButtonElProps = {
    type: Props["type"];
    size: "large" | "small";
    disabled: boolean;
    width?: number;
};

const ButtonEl = styled.button<ButtonElProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: ${({ size }) => (size === "large" ? "40px" : "27px")};
    width: 100%;
    white-space: nowrap;
    cursor: pointer;
    padding: ${({ size }) => (size === "large" ? "8px 16px" : "6px 12px")};
    box-sizing: border-box;
    border-width: 0;
    border-radius: 6px;
    font-size: ${({ size }) => (size === "large" ? "14px" : "12px")};
    font-weight: 500;
    user-select: none;

    ${({ width }) => (width ? `width: ${width}px;` : "")}

    ${({ disabled }) =>
        disabled
            ? `
        opacity: 0.5;
        pointer-events: none;
    `
            : ""}

    ${({ type }) => {
        if (type === "primary") {
            return `
                background-color: ${Colors.mainBlue};
                color: ${Colors.white};

                &:hover {
                    background-color: ${Colors.veryBlue};
                }
            `;
        } else if (type === "secondary") {
            return `
                background-color: ${Colors.slightlyBlue};
                color: ${Colors.veryDark};
                border: 1px solid ${Colors.somewhatBlue};
                
                &:hover {
                    background-color: ${Colors.typicalGreySemi};
                }
            `;
        }
    }};
`;
