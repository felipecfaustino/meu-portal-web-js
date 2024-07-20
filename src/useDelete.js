import { useState } from "react";

export default function useDelete() {
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState(false)
    //const [resposta, setResposta] = useState('')

    async function excluirDados(url) {
            try {
            await fetch(`http://localhost:8080/${url}`, {
                method: 'DELETE'
            })
            setSucesso(true);
        } catch (erro) {
            setErro('Não foi possível apagar os dados');
        }
    }

    return {excluirDados, sucesso, erro};

}