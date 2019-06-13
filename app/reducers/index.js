
/* 
  * Combinador de reducers do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 13/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importando o combinador */
import { combineReducers } from 'redux';

/* Importando os reducers */
import usuario_reducer from "./usuario_reducer";
import despensa_reducer from "./despensa_reducer";
import fornecedor_reducer from "./fornecedor_reducer";

/* Unindo-os */
export default combineReducers({
  usuario_reducer,
  despensa_reducer,
  fornecedor_reducer,
});
