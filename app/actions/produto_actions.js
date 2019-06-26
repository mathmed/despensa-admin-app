
/* 
  * Arquivo com actions utilizadas no gerenciamento de produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 25/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

import { showMessage } from "../components/commun/ToastService";

export const cadastrar_produto = (
    nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria, validade, fornecedor, despensa
) => {

    return dispatch => {

        dispatch({ type: "CADASTRANDO_PRODUTO" })


        /* Formatando algumas entradas */
        preco_unitario = preco_unitario.replace("R$", "");
        preco_unitario = preco_unitario.replace(".", "");
        preco_unitario = preco_unitario.replace(",", ".");

        quantidade = quantidade.replace(".", "");
        quantidade = quantidade.replace(",", ".");

        /* Verificando se os dados foram passados */
        if (validacao_cadastro_produto(nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria, validade, fornecedor, despensa)) {

            /* Verificando se a validade foi informada para fazer a formatação */
            if (validade)
                validade = validade.toISOString().slice(0, 10);
            else
                validade = null;

            /* Contactando o servidor */

            fetch("http://bsiufrn.tk:8000/produto/cadastrar_produto", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome_cadastrar_despensa,
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
                    if (response.status == 200) {

                        dispatch({ type: "FINALIZAR_CADASTRO_PRODUTO" });

                        showMessage("Produto cadastrado com sucesso", "success");

                        fetch_lista(despensa, dispatch);

                    }
                })

                .catch((err) => {
                    alert(err);
                    dispatch({ type: "FINALIZAR_CADASTRO_PRODUTO" })

                })


        } else  dispatch({ type: "FINALIZAR_CADASTRO_PRODUTO" });


    }
}



export const listar_produtos = (id_despensa) => {

    return dispatch => {

        fetch_lista(id_despensa, dispatch);

    }

}


const fetch_lista = (id_despensa, dispatch) => {

    dispatch({ type: "LISTANDO_PRODUTOS" });
    fetch("http://bsiufrn.tk:8000/produto/listar_produto", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_despensa
        })
    })

        .then(response => {

            response.json().then(responseJson => {

                dispatch({ type: "FINALIZAR_LISTAGEM_PRODUTOS", payload: responseJson });

            })

        }).catch(err => alert(JSON.stringify(err)))


}


const validacao_cadastro_produto = (nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria, validade, fornecedor, despensa) => {

    if (nome_cadastrar_despensa.length < 3) {
        showMessage("Informe o nome do produto", "danger");
        return false;
    }

    if(quantidade <= 0){
        showMessage("Informe uma quantidade válida", "danger");
        return false;
    }

    if(preco_unitario <= 0){
        showMessage("Informe um preço unitário válido", "danger");
        return false;
    }

    return true;

}