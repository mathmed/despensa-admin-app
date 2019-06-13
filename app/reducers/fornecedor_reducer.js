/* 
  * Reducer para gerenciar informações dos fornecedores
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 13/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Estado inicial das variáveis */
const INITIAL_STATE = {
    loading_cadastro_fornecedor: false,
    carregando_fornecedores: false,
    fornecedores: ""
};
  
/* Verificando a ação para alterar o valor da variável */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case "CADASTRANDO_FORNECEDOR":
            return{...state, loading_cadastro_fornecedor: true}

        case "FINALIZAR_CADASTRO_FORNECEDOR":
            return{...state, loading_cadastro_fornecedor: false}
        
        case "LISTANDO_FORNECEDORES":
            return{...state, carregando_fornecedores: true}

        case "FINALIZAR_LISTAGEM_FORNECEDOR":
            return {...state, fornecedores:action.payload, carregando_fornecedores: false}


        default:
            return state;
    }
};
  