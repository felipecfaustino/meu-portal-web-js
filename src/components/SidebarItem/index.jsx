import styled from 'styled-components';

const LinkNavigate = styled.a`
  text-decoration: none;
  color: white;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #1A202C; 
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: black;
  }
`

export default function SidebarItem({ Icon, label, navigateTo }) {
  return (
    <Container>
      <Icon />
      <LinkNavigate href={navigateTo}>
      {label}
      </LinkNavigate>
    </Container>
  )
};