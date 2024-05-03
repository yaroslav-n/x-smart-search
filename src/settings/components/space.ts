import { styled } from "styled-components";

type Props = {
    height?: number;
    width?: number;
};

export const Space = styled.div<Props>`
    float: left;
    min-width: ${({ width }) => (width ? `${width}px` : "0px")};
    width: ${({ width }) => (width ? `${width}px` : "0px")};
    min-height: ${({ height }) => (height ? `${height}px` : "0px")};
    height: ${({ height }) => (height ? `${height}px` : "0px")};
`;
