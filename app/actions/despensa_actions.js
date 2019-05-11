/* 
  * Arquivo com actions utilizadas no gerenciamento de despensas
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 09/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */
import {showMessage} from "../components/commun/ToastService";

export const criar_despensa = (uid_usuario, descricao) => {

    return dispatch => {

        dispatch({type:"CADASTRANDO_DESPENSA"});

        /* Verificando se foi informada uma descrição */
        if(descricao.length >= 3){

            /* Iniciando uma promessa e o fetch com o servidor */
            new Promise((resolve, reject) => {

                fetch("http://bsiufrn.tk:8000/despensa/cadastrar_despensa", {
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
                            
                            /* Verificando se a despensa foi criada */
                            if(retorno == "sucesso"){

                                fetch_lista(uid_usuario, dispatch);

                                showMessage("Despensa criada com sucesso", "success");
            
                                /* Chamando a função para listar as despensas */
                                dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});

                            }
                            else{
                                showMessage("Erro ao criar despensa, já existe uma com o mesmo nome", "danger");                            
                                dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
                            
                            }

                    })

                    }else{
                        showMessage("Verifique sua conexão com a internet", "danger");                            
                        dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
                    }
                })

                .catch((err) => {
                    showMessage("Verifique sua conexão com a internet", "danger");                            
                    dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
                })

            })
        
        } else {
            showMessage("O nome da despensa deve ter ao menos 3 caracteres", "danger");                            
            dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
        }

    }

}


export const listar_despensas = (uid_usuario) => {


    return dispatch => {

        fetch_lista(uid_usuario, dispatch);
      
    }

}

const fetch_lista = (uid_usuario, dispatch) => {

    dispatch({type: "LISTANDO_DESPENSAS"});

    /* Iniciando uma promessa e o fetch com o servidor */
    new Promise((resolve, reject) => {

        fetch("http://bsiufrn.tk:8000/despensa/listar_despensa", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uid_usuario})
        })

        /* Verificando o resultado da requisição */
        .then(response => {
            
            /* verificando se a requisição foi realizada com sucesso */
            if(response.status == 200){
                response.json().then((retorno) => {
                                                
                    dispatch({type: "FINALIZAR_LISTAGEM_DESPENSA", payload: retorno});

            })

            }else{
                showMessage("Verifique sua conexão com a internet", "danger");                            
                dispatch({type: "FINALIZAR_LISTAGEM_DESPENSA"});
            }
        })

        .catch((err) => {
            showMessage("Verifique sua conexão com a internet", "danger");                            
            dispatch({type: "FINALIZAR_LISTAGEM_DESPENSA"});
        })

    })
}