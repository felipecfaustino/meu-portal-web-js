import styled from 'styled-components';
import logo from './Assets/logo.png';
import perfil from './Assets/perfil.png';

import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'

const CabecalhoEstilizado = styled.header`
    background-color: var(--cinza-claro);
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 4em
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: .1;
`
export const ContainerSideBar = styled.div`
  height: 100%;
  display: flex;
`;

const LinkEstilizado = styled.a`
 color: var(--azul-escuro);
 font-weight: 700;
`
const Logotipo = styled.img`
    margin = 0px;
    padding = 0px;
`

function Cabecalho() {

    const [sidebar, setSidebar] = useState(false)

    const showSiderbar = () => setSidebar(!sidebar)

    return (
        <CabecalhoEstilizado>
            <ContainerSideBar>
                <FaBars onClick={showSiderbar} />
                {sidebar && <Sidebar active={setSidebar} />}
            </ContainerSideBar>
            <Logotipo src={logo} alt="logo da empresa Felipex" />
            <Container>
                <img src={perfil} alt="imagem de perfil do usuário" />
                <LinkEstilizado href="#">Sair</LinkEstilizado>
            </Container>
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;