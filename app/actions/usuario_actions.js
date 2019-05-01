
/* 
  * Arquivo com actions utilizadas no gerenciamento de usuários
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 01/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */
import {showMessage} from "../components/commun/ToastService";

export const cadastrar_usuario = (nome, usuario, email, senha, confirmacao) => {

    /* Iniciando o dispatch */
    return dispatch => {

        dispatch({type: "CADASTRANDO_USUARIO"});

        /* Fazendo verificações */
        if(validar_cadastro_usuario(nome, usuario, email, senha, confirmacao)){

            /* Iniciando uma promessa e o fetch com o servidor */
            new Promise((resolve, reject) => {

                fetch("http://bsiufrn.tk:8000/usuario/cadastrar_usuario", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome, usuario, email, senha, confirmacao })
                })

                /* Verificando o resultado da requisição */
                .then(response => {
                    
                    /* verificando se a requisição foi realizada com sucesso */
                    if(response.status == 200){
                        response.json().then((retorno) => {
                            
                            /* Verificando se foi cadastrado */
                            if(retorno == "Sucesso")
                                showMessage("Usuário cadastrado com sucesso!", "success")

                            else
                                showMessage(retorno, "danger");
            
                            dispatch({type: "FINALIZAR_CADASTRO_USUARIO"});
                    })

                    }else{
                        showMessage("Verifique sua conexão com a internet.", "danger");
                        dispatch({type: "FINALIZAR_CADASTRO_USUARIO"});
                    }
                })

                .catch((err) => {
                    showMessage("Verifique sua conexão com a internet.", "danger");
                    dispatch({type: "FINALIZAR_CADASTRO_USUARIO"});
                })

            })

        } else dispatch({type: "FINALIZAR_CADASTRO_USUARIO"});
    }
}

export const validar_cadastro_usuario = (nome, usuario, email, senha, confirmacao) => {

    if(nome.length >= 3){

        if(senha.length >= 6){

            if(senha == confirmacao){

                if(usuario.length >= 4){

                    if(email.length >= 10){
                        
                        return true;

                    } else showMessage("Informe um e-mail válido.", "danger");

                } else showMessage("Informe um usuário válido.", "danger");

            } else showMessage("As senhas informadas não conferem.", "danger");

        } else showMessage("A senha deve conter ao menos 6 caracteres.", "danger");

    } else showMessage("Informe um nome válido.", "danger");

    return false;
}

