/* 
  * Arquivo com actions utilizadas no gerenciamento de despensas
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 08/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */
import {showMessage} from "../components/commun/ToastService";
import {Alert} from "react-native";

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
                            alert(retorno);
                    })

                    }else{
                        Alert.alert("Erro", "Informe um nome para sua despensa");
                        dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
                    }
                })

                .catch((err) => {
                    Alert.alert("Erro", "Informe um nome para sua despensa");
                    dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
                })

            })
        
        } else {
            Alert.alert("Erro", "Informe um nome para sua despensa");
            dispatch({type: "FINALIZAR_CADASTRO_DESPENSA"});
        }

    }

}