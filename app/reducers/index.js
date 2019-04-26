
/* 
  * Combinador de reducers do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 26/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importando o combinador */
import { combineReducers } from 'redux';

/* Importando os reducers */
import login_reducer from "./login_reducer";

/* Unindo-os */
export default combineReducers({
  login_reducer  
});
