/* 
  * Reducer para gerenciar informações do usuário
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 02/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Estado inicial das variáveis */
const INITIAL_STATE = {
    loading_cadastro_usuario: false,
    loading_login: false,
    dados_usuario: ""
};
  
/* Verificando a ação para alterar o valor da variável */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "LOGIN_SUCESSO":
            return{...state, dados_usuario: action.payload}

        case "LOGIN_ANDAMENTO":
            return{...state, loading_login: true}

        case "FINALIZAR_LOGIN":
            return{...state, loading_login: false}

        case "CADASTRANDO_USUARIO":
            return{...state, loading_cadastro_usuario: true}

        case "FINALIZAR_CADASTRO_USUARIO":
            return{...state, loading_cadastro_usuario: false}

        default:
            return state;
    }
};
  