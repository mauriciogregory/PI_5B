import styled from 'styled-components'

export const Container = styled.div`
    background-color: lightblue;
    margin: 4rem;
    
    table {
        width: 100%;
        border-spacing: 0 1rem;
        /* margin: 10px; */

        th {
            text-align: left;
            border: solid 1px #f1f1f1;
            font-weight: 500;
            color: #231212;
            padding: 0.8rem;
        }

        td {
            text-align: center;

            border: 1px solid #f1f1f1;
            padding: 0.8rem;
        }
    }
`