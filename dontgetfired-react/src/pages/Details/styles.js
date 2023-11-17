import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;

  grid-template-rows: 105px auto;
  grid-template-areas: "header" "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-items: center;
  }

  > h1 {
    font-size: 25px;
    font-weight: 500;
    padding-top: 64px;
    align-items: center;
  }

  > p {
    font-size: 18px;
    margin-top: 16px;
    text-align: justify;
    align-items: center;
  }

`;
