import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import styled from "styled-components";

const Container = styled.div`
    width: 60%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    background-color: white;  
    align-items: center;
`

function PaginaBase() {
    return (
        <>
            <Cabecalho />
                <Container>
                    <Outlet />
                </Container>
            <Rodape />
        </>
    )
}

export default PaginaBase;