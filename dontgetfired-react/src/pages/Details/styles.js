import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  > main {
    padding: 3rem 0;
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
    font-size: 1.125rem;
    font-weight: 500;
    padding-top: 4rem;
    align-items: center;
  }

  > p {
    font-size: 1rem;
    margin-top: 1rem;
    text-align: justify;
    align-items: center;
  }

`;
