import styled from "styled-components";
import { useState } from "react"
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import CampoDigitacaoCPF from "../../components/CampoDigitacaoCPF";
import PesquisaRegistro from "../../components/PesquisaRegistro";

import IPessoa from "../../types/IPessoa";

import usePost from "../../usePost";
import usePut from "../../usePut";
import useDelete from "../../useDelete";

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`
const Formulario = styled.form`
  width: 80%;
  --display: flex;
  flex-direction: column;
  align-items: center;
`
const DivBotoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const BotaoCustomizado = styled(Botao)`
    width: 30%;
`

export default function CadastroPessoas() {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');

    function setPessoa(DadosPessoa) {
        setId(DadosPessoa.id);
        setNome(DadosPessoa.nome);
        setEmail(DadosPessoa.email);
        setCpf(DadosPessoa.cpf);
    }
    function clearPessoa() {
        setId('');
        setNome('');
        setEmail('');
        setCpf('');
    }

    const {cadastrarDados} = usePost();
    const {alterarDados} = usePut();
    const {excluirDados} = useDelete();


    function handleDelete() { 
        if (id) {
            excluirDados({url: `pessoas/${id}`});
            clearPessoa();
            alert('Registro apagado');
        }
    }

    function handleNew() { 
        clearPessoa();
    }
    
    const handleSubmit = (event) => {
        event.preventDefault(); // previne o envio padrão do formulário

        const pessoa = {
            id: id,
            nome: nome,
            email: email,
            cpf: cpf
        }

        try {
            if (!pessoa.id) {
                cadastrarDados({url: 'pessoas', dados: pessoa});
                alert('Registro cadastrado');
            } else {
                alterarDados({url: `pessoas/${pessoa.id}`, dados: pessoa});
                alert('Registro alterado'); 
            }

            clearPessoa();

        } catch (erro) {
            erro && alert('Erro ao cadastrar os dados');
        }
    }


    return (
        <>
            <Titulo>Cadastro de Alunos</Titulo>
            <Formulario onSubmit={handleSubmit}>
                <CampoDigitacao
                    tipo="text"
                    rotulo="Nome"
                    valor={nome}
                    placeholder="Insira seu Nome"
                    onChange={setNome}
                />
                <CampoDigitacao
                    tipo="email"
                    rotulo="Email"
                    valor={email}
                    placeholder="Insira o endereço de e-mail"
                    onChange={setEmail}
                />
                <CampoDigitacaoCPF
                    tipo="text"
                    rotulo="CPF"
                    valor={cpf}
                    placeholder="Insira o CPF"
                    onChange={setCpf}
                />
                <DivBotoes>
                    <BotaoCustomizado type="submit">Gravar</BotaoCustomizado>
                    <BotaoCustomizado type="button" onClick={handleNew}>Novo</BotaoCustomizado>
                    <BotaoCustomizado type="button" onClick={handleDelete}>Excluir</BotaoCustomizado>
                </DivBotoes>
                <PesquisaRegistro 
                    endPoint="pessoas"
                    descField="nome"
                    onChangeCall={setPessoa}
                />
            </Formulario>

        </>
    )
}