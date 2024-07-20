import { useState } from "react";
import CampoDigitacao from "../../components/CampoDigitacao";
import styled from "styled-components";
import usePost from "../../usePost";
import autenticaStore from "../../stores/autentica.store";
import { useNavigate } from "react-router-dom";

const BotaoLogin = styled.button`
    background-color: var(--azul-escuro);
    border-radius: 8px;
    padding: 12px 16px;
    color: var(--branco);
    border: none;
    margin-top: 1em;
    font-weight: 700;
    line-height: 19px;
    width: 200px;
`
const SenhaForget = styled.a`
    display: block;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px
    color: var(--cinza)
    padding: 5px;
    margin: 5px;
`
const ContainerFazerCadastro = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    margin: 5px;
`
const TextoFazerCadastro = styled.label`
    display: block;
    font-weight: 200;
    font-size: 14px;
    line-height: 19px
    color: var(--cinza)
`
const LinkFazerCadastro = styled.a`
    display: block;
    font-weight: 200;
    font-size: 14px;
    line-height: 19px
    color: var(--cinza)
`
const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`
const Formulario = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  --align-items: center;
`

export default function Login() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const {cadastrarDados, erro, sucesso, resposta} = usePost();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const usuario = {
            email: email,
            senha: pass
        }

        try {
            cadastrarDados({ url: "auth/login", dados: usuario})
            autenticaStore.login({email: email, token: resposta})
            resposta && navigate("/dashboard")
        } catch (erro) {
            erro && alert('Não foi possível fazer login')
        }
    }
    return (
        <>
            <Titulo>Faça o login em sua conta</Titulo>
            <Formulario onSubmit={handleLogin}>
                <CampoDigitacao 
                    valor={email} 
                    tipo="text" 
                    placeholder="Insira seu endereço de e-mail" 
                    onChange={setEmail}
                    rotulo="Email"/>
                <CampoDigitacao 
                    valor={pass} 
                    tipo="password" 
                    placeholder="Digite sua senha" 
                    onChange={setPass}
                    rotulo="Senha"/>
                <BotaoLogin type="submit">
                    Entrar
                </BotaoLogin>
            </Formulario>   
            <SenhaForget href="#">Esqueceu sua senha?</SenhaForget>
            <ContainerFazerCadastro>
            <TextoFazerCadastro>Ainda não tem conta?</TextoFazerCadastro><LinkFazerCadastro href="#">Faça seu cadastro.</LinkFazerCadastro>
            </ContainerFazerCadastro>
        </>
    )
}