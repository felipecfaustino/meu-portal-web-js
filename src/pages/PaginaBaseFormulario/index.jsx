import styled from "styled-components";
import imagemDeFundo from "./ImagemDeFundo.png";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";

const ContainerPrincipal = styled.div`
    background-color: var(--azul-claro);    
    --background-image: url(${imagemDeFundo});
    background-size: cover;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Container = styled.div`
    width: 40%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    background-color: white;  
    align-items: center;
`

export default function PaginaBaseFormulario() {
    return (
        <>
        <Cabecalho />
        <ContainerPrincipal>
            <Container>
                <Outlet />
            </Container>
        </ContainerPrincipal>
        <Rodape />
        </>
    )
}