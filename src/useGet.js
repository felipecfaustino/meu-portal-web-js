
export default async function pesquisarDados(url)  {
        try {
            const response = await fetch(`http://localhost:8080/${url}`)
            return response.json();
        } catch (erro) {
            console.log('Não foi possível receber os dados');
        }

    }
