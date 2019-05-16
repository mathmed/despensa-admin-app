/* 
  * Arquivo com funções auxiliares do sistema
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 16/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


class Utils {

    formata_data(data){
        let arr = data.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0];
    }
}

export default new Utils();