import { useState } from "react";

export default function usePut() {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState(false)
    //const [resposta, setResposta] = useState('')

    async function alterarDados(url, dados) {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                await fetch(`http://localhost:8080/${url}`, {
                method: 'PUT',
                headers, 
                body: JSON.stringify(dados)
            })
            setSucesso(true);
        } catch (erro) {
            setErro('Não foi possível enviar os dados');
        }
    }

    return {alterarDados, sucesso, erro};

}