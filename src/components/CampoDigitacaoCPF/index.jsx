import styled from "styled-components";
import CampoDigitacao from "../CampoDigitacao";

function formatCpf(cpf) {
    return cpf.replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formata como XXX.XXX.XXX-XX
  }

export default function CampoDigitacaoCPF({ valor, tipo, placeholder, onChange, rotulo }) {

    const handleCpfChange = (value) => {
        const formattedCpf = formatCpf(value);
        onChange(formattedCpf);
    };

    return (
        <CampoDigitacao
            tipo={tipo}
            valor={valor}
            placeholder={placeholder}
            onChange={handleCpfChange}
            rotulo={rotulo}
        />
    )
}