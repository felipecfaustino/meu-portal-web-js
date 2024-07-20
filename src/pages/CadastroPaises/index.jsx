import styled from "styled-components";
import { useState } from "react"

import CampoDigitacao from "../../components/CampoDigitacao";
import ControlesCadastro from "../../components/ControlesCadastro";
import DataGrid from "../../components/DataGrid";

import PesquisarDados from "../../useGet";

import IPais from "../../types/IPais";
import IEstado from "../../types/IEstado";
import IGridColumns from "../../types/IGridColumns";

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

const gridColumns = []; 
gridColumns.push(new IGridColumns('estado', 'Estado', 250))
gridColumns.push(new IGridColumns('uf', 'UF', 50))
gridColumns.push(new IGridColumns('pais_id', 'Pais', 50))

export default function CadastroPaises() {
    const [id, setId] = useState('');
    const [nomePais, setNomePais] = useState('');
    const [codigo, setCodigo] = useState('');
    const [dadosEstados, setEstados] = useState([]);
    
    function setData(dadosPais) {
        setId(dadosPais.id);
        setNomePais(dadosPais.pais);
        setCodigo(dadosPais.codigo);

        BuscaEstados(dadosPais.id);
    }

    function clearData() {
        setId('');
        setNomePais('');
        setCodigo('');
        
        setEstados([])
    }

    function BuscaEstados(paisId) {
        const dadosPesquisa  = PesquisarDados({url: `estados/${paisId}/pais`})
        dadosPesquisa.then((dados) => {
            setEstados(dados);
        })
    }

    const iPais = {
        id: id,
        pais: nomePais,
        codigo: codigo
    }

    return (
        <>
         <Formulario>
            <Titulo>Cadastro de Paises</Titulo>
                <CampoDigitacao
                    tipo="text"
                    rotulo="País"
                    valor={nomePais}
                    placeholder="Insira seu nome do país"
                    onChange={setNomePais}
                />
                <CampoDigitacao
                    tipo="text"
                    rotulo="Código"
                    valor={codigo}
                    placeholder="Insira o código do país"
                    onChange={setCodigo}
                />

                <DataGrid
                    endPoint = "estados" 
                    dadosDataGrid = {dadosEstados} 
                    gridColumns = {gridColumns}
                    parentFieldName = "pais_id"
                    parentId = {id}
                    editavel = {true}/>

                <ControlesCadastro 
                    endPoint = "paises" 
                    descField = "pais"
                    dataInterface = {iPais}
                    setData = {setData}
                    clearData = {clearData}
                />
            </Formulario>
        </>
    )
}