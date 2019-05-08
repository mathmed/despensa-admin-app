
/* 
  * Arquivo com actions utilizadas no gerenciamento de usuários
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 03/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */
import {showMessage} from "../components/commun/ToastService";
import {Actions} from "react-native-router-flux";


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

export const logar = (usuario, senha) => {

    /* Iniciando o dispatch */
    return dispatch => {

        dispatch({type: "LOGIN_ANDAMENTO"});

        /* Fazendo verificações */
        if(usuario.length >= 3 && senha.length >= 6){

            /* Iniciando uma promessa e o fetch com o servidor */
            new Promise((resolve, reject) => {

                fetch("http://bsiufrn.tk:8000/usuario/login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({usuario, senha})
                })

                /* Verificando o resultado da requisição */
                .then(response => {
                    
                    /* verificando se a requisição foi realizada com sucesso */
                    if(response.status == 200){
                        response.json().then((retorno) => {
                            
                            /* Verificando se foi cadastrado */
                            if(retorno != "error"){

                                /* Guardando os dados do usuário */
                                dispatch({type: "LOGIN_SUCESSO", payload: retorno})

                                /* Indo para tela inicial */
                                Actions.inicio();
                            }

                            else
                                showMessage("Usuário e/ou senha inválidos.", "danger");
            
                            dispatch({type: "FINALIZAR_LOGIN"});
                    })

                    }else{
                        showMessage("Verifique sua conexão com a internet.", "danger");
                        dispatch({type: "FINALIZAR_LOGIN"});
                    }
                })

                .catch((err) => {
                    showMessage("Verifique sua conexão com a internet.", "danger");
                    dispatch({type: "FINALIZAR_LOGIN"});
                })

            })

        } else {
            showMessage("Informe usuário/senha válidos.", "danger");
            dispatch({type: "FINALIZAR_LOGIN"});
        }

    }
}

export const deslogar = (token) => {

    alert(token);

    return dispatch => {

        dispatch({type: "DESLOGAR_ANDAMENTO"});

        /* Iniciando uma promessa e o fetch com o servidor */
        new Promise((resolve, reject) => {

            fetch("http://bsiufrn.tk:8000/usuario/logout", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token})
            })

            /* Verificando o resultado da requisição */
            .then(response => {
                
                /* verificando se a requisição foi realizada com sucesso */
                if(response.status == 200){
                    response.json().then((retorno) => {
                        
                        /* Verificando se foi cadastrado */
                        if(retorno != "error"){

                            /* Guardando os dados do usuário */
                            dispatch({type: "LOGIN_SUCESSO", payload: retorno})

                            /* Indo para tela inicial */
                            Actions.inicio();
                        }

                        else
                            showMessage("Usuário e/ou senha inválidos.", "danger");

                        dispatch({type: "FINALIZAR_LOGIN"});
                })

                }else{
                    showMessage("Verifique sua conexão com a internet.", "danger");
                    dispatch({type: "FINALIZAR_LOGIN"});
                }
            })

            .catch((err) => {
                showMessage("Verifique sua conexão com a internet.", "danger");
                dispatch({type: "FINALIZAR_LOGIN"});
            })

        })


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

