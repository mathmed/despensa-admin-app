/* 
  * Reducer para gerenciar informações das despensas
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 08/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Estado inicial das variáveis */
const INITIAL_STATE = {
    loading_cadastro_despensa: false,
};
  
/* Verificando a ação para alterar o valor da variável */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "CADASTRANDO_DESPENSA":
            return{...state, loading_cadastro_despensa: true}

        case "FINALIZAR_CADASTRO_DESPENSA":
            return{...state, loading_cadastro_despensa: false}


        default:
            return state;
    }
};
  