import styled from "styled-components";
import { useState } from "react"

import CampoDigitacao from "../../components/CampoDigitacao";
import CampoPesquisa from "../../components/CampoPesquisa";

import ControlesCadastro from "../../components/ControlesCadastro";

import IEstado from "../../types/IEstado";

import PesquisarDados from "../../useGet";

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`
const Formulario = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export default function CadastroEstados() {
    const [id, setId] = useState('');
    const [nomeEstado, setNomeEstado] = useState('');
    const [uf, setUf] = useState('');
    const [paisId, setPaisId] = useState('');
    const [nomePais, setNomePais] = useState('');
    
    function onChangePais(newValue) {
        setPaisId(newValue);

        const dadosPais = PesquisarDados({url: `paises/${newValue}`});
        dadosPais.then((pais) => {
            setNomePais(pais.pais);
        })
    }

    function setData(dadosEstado) {
        setId(dadosEstado.id);
        setNomeEstado(dadosEstado.estado);
        setUf(dadosEstado.uf);
        setPaisId(dadosEstado.pais_id)

        console.log(dadosEstado.pais_id)
        const dadosPais = PesquisarDados({url: `paises/${dadosEstado.pais_id}`});
        dadosPais.then((pais) => {
            setNomePais(pais.pais);
        })
    }

    function clearData() {
        setId('');
        setNomeEstado('');
        setUf('');
        setPaisId('');
    }


    const iEstado = {
        id: id,
        estado: nomeEstado,
        uf: uf,
        pais_id: paisId
    }

    return (
        <>
         <Formulario>
            <Titulo>Cadastro de Estados</Titulo>
            <CampoPesquisa
                    endPoint="paises"
                    descField="pais" 
                    onChangeCall={onChangePais}
                    fieldValue={paisId}
                    rotulo="País"
                    placeholder="Informe o país"
                />
                <CampoDigitacao
                    tipo="text"
                    rotulo="Estado"
                    valor={nomeEstado}
                    placeholder="Insira o nome do estado"
                    onChange={setNomeEstado}
                />
                <CampoDigitacao
                    tipo="text"
                    rotulo="UF"
                    valor={uf}
                    placeholder="Insira a UF"
                    onChange={setUf}
                />

                <ControlesCadastro 
                    endPoint = "estados" 
                    descField = "estado"
                    dataInterface = {iEstado}
                    setData = {setData}
                    clearData = {clearData}
                />
            </Formulario>
        </>
    )
}