/* 
  * Reducer para gerenciar informações das despensas
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 09/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Estado inicial das variáveis */
const INITIAL_STATE = {
    loading_cadastro_despensa: false,
    carregando_despensas: false,
    despensas: ""
};
  
/* Verificando a ação para alterar o valor da variável */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "CADASTRANDO_DESPENSA":
            return{...state, loading_cadastro_despensa: true}

        case "FINALIZAR_CADASTRO_DESPENSA":
            return{...state, loading_cadastro_despensa: false}
        
        case "LISTANDO_DESPENSAS":
            return{...state, carregando_despensas: true}

        case "FINALIZAR_LISTAGEM_DESPENSA":
            return {...state, despensas:action.payload, carregando_despensas: false}


        default:
            return state;
    }
};
  