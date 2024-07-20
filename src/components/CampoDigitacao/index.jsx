import styled from "styled-components";

const Campo = styled.input`
    background: #F0F0F0;
    margin: 2px 0px 8px 0px;
    box-sizing: border-box;
    box-shadow: 2px 2px 6px rgba(0,0,0, 0.25);
    border-radius: 8px;
    border: none;
    width: 100%;
    padding: 8px 5px  8px 5px;
    font-family: var(--font-secundaria);
    color: var(--cor-fonte-secundaria);
    font-weight: 400;
    font-size: 14px;
`

const Rotulo = styled.label`
    width: 100%;
    display: block;
    font-family: var(--font-principal);
    color: var(--cor-fonte-principal);
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;

`

export default function CampoDigitacao({ valor, tipo, placeholder, onChange, rotulo }) {
    return (
        <div>
            <Rotulo>{rotulo}</Rotulo>
            <Campo
            type={tipo}
            value={valor}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            required
            />
        </div>
    )
}