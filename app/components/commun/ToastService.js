
/* 
  * Arquivo com funções de TOAST auxiliares
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 01/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importando a biblioteca */
import { Toast } from 'native-base';

/* Função para exibir o toast */
function showMessage(message, type) {
  return (
    Toast.show({
      text: message,
      buttonText: 'Entendi',
      duration: 3000,
      type: type
    })
  );
}


export { showMessage };