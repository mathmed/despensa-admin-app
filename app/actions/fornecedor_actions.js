/* 
  * Arquivo com actions utilizadas no gerenciamento de fornecedores
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 09/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */
import {showMessage} from "../components/commun/ToastService";

export const cadastrar_fornecedor = (uid_usuario, descricao) => {

    return dispatch => {

        dispatch({type:"CADASTRANDO_FORNECEDOR"});

        /* Verificando se foi informada uma descrição */
        if(descricao.length >= 3){

            /* Iniciando uma promessa e o fetch com o servidor */
            new Promise((resolve, reject) => {

                fetch("http://bsiufrn.tk:8000/fornecedor/cadastrar_fornecedor", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({descricao, uid_usuario})
                })

                /* Verificando o resultado da requisição */
                .then(response => {
                    
                    /* verificando se a requisição foi realizada com sucesso */
                    if(response.status == 200){
                        response.json().then((retorno) => {
                            
                            /* Verificando se o fornecedor foi criada */
                            if(retorno == "sucesso"){

                                //fetch_lista(uid_usuario, dispatch);

                                showMessage("Fornecedor cadastrado com sucesso", "success");
            
                                /* Chamando a função para listar os fornecedores */
                                dispatch({type: "FINALIZAR_CADASTRO_FORNECEDOR"});

                            }
                            else{
                                showMessage("Erro ao cadastrar fornecedor, já existe uma com o mesmo nome", "danger");                            
                                dispatch({type: "FINALIZAR_CADASTRO_FORNECEDOR"});
                            
                            }
                    })

                    }else{
                        showMessage("Verifique sua conexão com a internet", "danger");                            
                        dispatch({type: "FINALIZAR_CADASTRO_FORNECEDOR"});
                    }
                })

                .catch((err) => {
                    showMessage("Verifique sua conexão com a internet", "danger");                            
                    dispatch({type: "FINALIZAR_CADASTRO_FORNECEDOR"});
                })

            })
        
        } else {
            showMessage("O nome do fornecedor deve ter ao menos 3 caracteres", "danger");                            
            dispatch({type: "FINALIZAR_CADASTRO_FORNECEDOR"});
        }

    }

}


export const listar_fornecedores = (uid_usuario) => {


    return dispatch => {

        fetch_lista(uid_usuario, dispatch);
      
    }

}

const fetch_lista = (id_usuario, dispatch) => {

    dispatch({type: "LISTANDO_FORNECEDORES"});

    /* Iniciando uma promessa e o fetch com o servidor */
    new Promise((resolve, reject) => {

        fetch("http://bsiufrn.tk:8000/fornecedor/listar_fornecedor", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_usuario})
        })

        /* Verificando o resultado da requisição */
        .then(response => {
            
            /* verificando se a requisição foi realizada com sucesso */
            if(response.status == 200){
                response.json().then((retorno) => {
                                                
                    dispatch({type: "FINALIZAR_LISTAGEM_FORNECEDOR", payload: retorno});

            })

            }else{
                showMessage("Verifique sua conexão com a internet", "danger");                            
                dispatch({type: "FINALIZAR_LISTAGEM_FORNECEDOR"});
            }
        })

        .catch((err) => {
            showMessage("Verifique sua conexão com a internet", "danger");                            
            dispatch({type: "FINALIZAR_LISTAGEM_FORNECEDOR"});
        })

    })
}