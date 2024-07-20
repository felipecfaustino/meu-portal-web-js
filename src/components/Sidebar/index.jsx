import styled from 'styled-components';

import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaRegSun, 
  FaUserAlt, 
  FaIdCardAlt, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: var(--azul-escuro);
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 300px;
  animation: showSidebar .4s;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

const Content = styled.div`
  margin-top: 100px;
`;

export default function Sidebar( active ) {
  const navigate = useNavigate();

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} label="Home" navigateTo="/"/>
        <SidebarItem Icon={FaUserAlt} label="Login" navigateTo="/login"/>
        <SidebarItem Icon={FaIdCardAlt} label="Países" navigateTo="/paises"/>
        <SidebarItem Icon={FaIdCardAlt} label="Estados" navigateTo="/estados"/>
        <SidebarItem Icon={FaIdCardAlt} label="Cidades" navigateTo="/cidades"/>
        <SidebarItem Icon={FaIdCardAlt} label="Alunos" navigateTo="/alunos"/>
        <SidebarItem Icon={FaRegSun} label="Configurações" navigateTo="/"/>
      </Content>
    </Container>
  )
};