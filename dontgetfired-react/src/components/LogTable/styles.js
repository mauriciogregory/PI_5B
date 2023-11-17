import styled from 'styled-components'

export const Container = styled.div`
    background-color: lightblue;
    margin: 5rem;
    
    table {
        width: 100%;
        border-spacing: 0 2rem;
        /* margin: 10px; */

        th {
            text-align: center;
            border: solid 2px #f1f1f1;
            font-weight: 500;
            color: #231212;
            padding: 0.8rem;
            font-size: 1.rem;
        }

        td {
            text-align: center;

            border: 1px solid #f1f1f1;
            padding: 0.8rem;
        }

        button {
            color: red;
            background-color: gray;
        }
    }
`