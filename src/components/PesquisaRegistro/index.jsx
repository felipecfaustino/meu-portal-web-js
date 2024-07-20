import styled from "styled-components";
import { useState } from "react"
import PesquisarDados from "../../useGet";

import AsyncComboSelect from "react-select/async";

const DivPesquisa = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 14px 0px;
    align-items: center;
    font-family: var(--font-secundaria);
    color: var(--cor-fonte-secundaria);
    font-weight: 400;
    font-size: 16px;
`

export default function PesquisaRegistro({ endPoint, descField, onChangeCall }) {

    
    const iniValorPesquisa = {
        value: '',
        label: 'Pesquisar...'
    }


    const promiseObj = async (inputValue) => {
        if (inputValue) {
            setTimeout(async () => {
                const dados = await PesquisarDados(`${endPoint}/${inputValue}/nome`)
                console.log(dados);
                return dados.map(({id, [descField]:nome}) => {
                    return {value: id, label: nome}
                })
            }, 1000);
        } else {
            return {value: 0, label: ''}
        }    
    }


    // const promiseObj = (inputValue) => 
    // new Promise((resolve) => {
    //     if (inputValue) {
    //         setTimeout(() => {
    //             if (inputValue) {
    //                 const dadosPesquisa = PesquisarDados(`${endPoint}/${inputValue}/nome`)
    //                 dadosPesquisa.then((dados) => {
    //                     const Obj = dados.map(({id, [descField]:nome}) => {
    //                         return {value: id, label: nome}
    //                     })
    //                     resolve(Obj)    
    //                 })
    //             }        
    //         }, 1000);
    //     }
    // });
        
    const [valorPesquisa, setValorPesquisa] = useState(iniValorPesquisa);



    return (
        <DivPesquisa>
        <AsyncComboSelect 
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'blue' : 'gray',
                  background: '#F0F0F0',
                  width: '25vW',
                  padding: '0px',
                  border: 'none',
                  margin: '1px 0px',
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    background: '#F0F0F0',
                    width: '25vW',
                    padding: '0px',
                    border: 'none',
                    margin: '1px 0px',
                  }),
              }}

            cacheOptions 
            defaultOptions 
            value={valorPesquisa}
            loadOptions={promiseObj}
            onChange={async (valor) => {
                const DadosObj = await PesquisarDados(`${endPoint}/${valor?.value}`);
                
                setValorPesquisa(iniValorPesquisa)

                onChangeCall(DadosObj)
            }}/>
    </DivPesquisa>
    )
}