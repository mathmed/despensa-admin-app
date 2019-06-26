/* 
  * Reducer para gerenciar informações dos produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 25/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Estado inicial das variáveis */
const INITIAL_STATE = {
    loading_cadastro_produto: false,
    carregando_produtos: false,
    produtos: ""
};
  
/* Verificando a ação para alterar o valor da variável */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "CADASTRANDO_PRODUTO":
            return{...state, loading_cadastro_produto: true}

        case "FINALIZAR_CADASTRO_PRODUTO":
            return{...state, loading_cadastro_produto: false}
        
        case "LISTANDO_PRODUTOS":
            return{...state, carregando_produtos: true}

        case "FINALIZAR_LISTAGEM_PRODUTOS":
            return {...state, produtos:action.payload, carregando_produtos: false}


        default:
            return state;
    }
};
  