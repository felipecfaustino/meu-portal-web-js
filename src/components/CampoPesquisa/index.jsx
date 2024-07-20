import styled from "styled-components";
import { useState } from "react"
import PesquisarDados from "../../useGet";

import AsyncComboSelect from "react-select/async";

const DivPesquisa = styled.div`
    --display: flex;
    flex-direction: row;
    margin: 2px 0px 8px 0px;
    width: 100%;
    align-items: start;
`
const Rotulo = styled.label`
    width: 100%;
    display: block;
    font-family: var(--font-principal);
    color: var(--cor-fonte-principal);
    font-weight: 700;
    font-size: 14px;
    line-height: 19px 
`
const DivCampo = styled.div`
    --display: flex;
    flex-direction: row;
    align-items: start;
    background: #F0F0F0;
    padding: 0px 0px;
    margin: 0px 0px;
    box-sizing: border-box;
    box-shadow: 2px 2px 6px rgba(0,0,0, 0.25);
    border-radius: 8px;
    border: none;
    width: 100%;
    font-family: var(--font-secundaria);
    color: var(--cor-fonte-secundaria);
    font-weight: 400;
    font-size: 14px;
`

var lastFieldValue = '';

export default function CampoPesquisa({ endPoint, descField, onChangeCall, fieldValue, rotulo, placeholder = ''}) {

    const pesquisaId = async (fieldValue) => {
        const dataRetorno = await PesquisarDados(`${endPoint}/${fieldValue}`)
        return {
            value: fieldValue,
            label: dataRetorno[descField]
        };
    };


    const promiseObj = (inputValue) =>
    new Promise((resolve) => {
        if (inputValue) {
            setTimeout(() => {
                if (inputValue) {
                    const dadosPesquisa = PesquisarDados({url: `${endPoint}/${inputValue}/nome`})
                    dadosPesquisa.then((dados) => {
                        const Obj = dados.map(({id, [descField]:nome}) => {
                            return {value: id, label: nome}
                        })
                        resolve(Obj)    
                    })
                }        
            }, 1000);
        } else {
            if (fieldValue) {
                const dadosPesquisa = PesquisarDados({url: `${endPoint}`})
                dadosPesquisa.then((dados) => {
                    const Obj = dados.map(({id, [descField]:nome}) => {
                        return {value: id, label: nome}
                    })
                    resolve(Obj)    
                })
            }
        }
    });
        
    const [valorPesquisa, setValorPesquisa] = useState({value: '', label: placeholder});

    if (fieldValue && lastFieldValue !== fieldValue) {
        lastFieldValue = fieldValue;
        const dataRetorno = PesquisarDados({url: `${endPoint}/${fieldValue}`})
        dataRetorno.then((dataObj) => {
            setValorPesquisa({
                value: dataObj.id,
                label: dataObj[descField]
            })
        })
    }

    return (
        <DivPesquisa>
        <Rotulo>{rotulo}</Rotulo>
        <DivCampo>
            <AsyncComboSelect 
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                    control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'blue' : 'gray',
                    background: '#F0F0F0',
                    width: '100%',
                    padding: '0px',
                    border: 'none',
                    margin: '1px 0px',
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        background: '#F0F0F0',
                        width: '100%',
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
                    const dadosObj = await PesquisarDados({url: `${endPoint}/${valor?.value}`});
                    onChangeCall(dadosObj.id)
                    setValorPesquisa({
                        value: dadosObj.id,
                        label: dadosObj[descField]
                    })
                }}/>
        </DivCampo>
    </DivPesquisa>
    )
}