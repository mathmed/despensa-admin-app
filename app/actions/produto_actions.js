
/* 
  * Arquivo com actions utilizadas no gerenciamento de produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 22/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/



export const cadastrar_produto = (
    nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria, validade, fornecedor, despensa
) => {

    return dispatch => {

        dispatch({type: "CADASTRANDO_USUARIO"})

        /* Verificando se os dados foram passados */
        if(1){

            /* Verificando se a validade foi informada para fazer a formatação */
            if(validade)
                validade = validade.toISOString().slice(0,10);
            else 
                validade = null;
            
            /* Contactando o servidor */
            new Promise((resolve, reject) => {

            fetch("http://bsiufrn.tk:8000/produto/cadastrar_produto", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome:nome_cadastrar_despensa,
                    status_: "fechado",
                    preco: preco_unitario,
                    aberto_em: null,
                    uid_compra: 1,
                    uid_categoria: categoria,
                    validade,
                    quantidade,
                    unidade: unidade_medida,
                    uid_despensa: despensa

                })
            })
            
            .then(response => {
                    
                /* verificando se a requisição foi realizada com sucesso */
                if(response.status == 200){
                    response.json().then((retorno) => {console.log(retorno)})
                }
            })

            /* Verificando o resultado da requisição */
    })

    }

}
}