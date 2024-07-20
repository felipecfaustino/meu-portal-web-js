import { useState } from "react";

export default function usePost() {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState(false)
    const [resposta, setResposta] = useState('')

    async function cadastrarDados(url, dados) {

            const dadosJson = JSON.stringify(dados);
            
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const dadosResposta = await fetch(`http://localhost:8080/${url}`, {
                method: 'POST',
                headers, 
                body: dadosJson
            })

            setSucesso(true);
            return dadosResposta.json();
        } catch (erro) {
            setErro('Não foi possível enviar os dados');
        }
    }

    return {cadastrarDados, sucesso, erro, resposta};

}