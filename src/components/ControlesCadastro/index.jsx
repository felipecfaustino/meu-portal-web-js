import styled from "styled-components";
import Botao from "../Botao";
import PesquisaRegistro from "../PesquisaRegistro";

import usePost from "../../usePost";
import usePut from "../../usePut";
import useDelete from "../../useDelete";

const DivBotoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const BotaoControle = styled(Botao)`
    width: 30%;
    height: 34px;
`

export default function ControlesCadastro({ endPoint, descField, dataInterface, setData, clearData }) {

    const {cadastrarDados} = usePost();
    const {alterarDados} = usePut();
    const {excluirDados} = useDelete();

    function handleDelete() { 
        if (dataInterface.id) {
            excluirDados({url: `${endPoint}/${dataInterface.id}`});
            clearData();
            alert('Registro apagado');
        }
    }

    function handleNew() { 
        clearData();
    }
    
    const handleSave = () => {
        try {

            if (!dataInterface.id) {
                cadastrarDados({url: endPoint, dados: dataInterface});
                alert('Registro cadastrado');
            } else {
                alterarDados({url: `${endPoint}/${dataInterface.id}`, dados: dataInterface});
                alert('Registro alterado'); 
            }

            clearData();

        } catch (erro) {
            erro && alert('Erro ao cadastrar os dados');
        }
    }

    return (
            <>
                <DivBotoes>
                        <BotaoControle type="button" onClick={handleSave}>Gravar</BotaoControle>
                        <BotaoControle type="button" onClick={handleNew}>Novo</BotaoControle>
                        <BotaoControle type="button" onClick={handleDelete}>Excluir</BotaoControle>
                </DivBotoes>
                <PesquisaRegistro 
                    endPoint = {endPoint}
                    descField = {descField}
                    onChangeCall={setData}
                />
            </>
    )
}