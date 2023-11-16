import styled from "styled-components";

export const Container = styled.section`
    margin: 28px 0;

    > h2 {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: ${({theme}) => theme.lightblue};

        padding-bottom: 16px;
        margin-bottom: 28px;

        color: ${({theme}) => theme.gray};
        font-size: 22px;
        font-weight: 400;

        text-align: center;
    }

`;
