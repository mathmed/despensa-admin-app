
/* 
  * Arquivo de controle de estilos do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 27/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */

import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({

  /* Cores */
  primaryColor: {color: "#19197f"},
  primaryColorBack: {backgroundColor: "#19197f"},
  secundaryColor: {color: "#e52d2d"},
  secundaryColorBack: {backgroundColor: "#e52d2d"},
  whiteColor: {color: "white"},
  whiteColorBack: {backgroundColor: "white"},
  greyColor: {color:"#333333"},

  /* Fontes */
  smallFont: {fontSize: 14},
  mediumFont: {fontSize: 20},
  bigFont: {fontSize: 26},
  titleFont: {fontSize: 30},
  textCenter: {textAlign: "center"},
  bold: {fontWeight: "bold"},
  roboto: {fontFamily: "roboto"},

  /* Views */
  container: {backgroundColor: "white", flex: 1, paddingHorizontal: 15, marginTop: 10},
  center: {justifyContent: "center", alignItems: "center", alignSelf: "center"},
  column: {flexDirection: "column"},
  row: {flexDirection: "row"},
  spaceAround: {justifyContent: "space-around"},
  spaceBetween: {justifyContent: "space-between"},
  marginTop: {marginTop: 10},
  bigMarginTop: {marginTop: 30},
  smallMarginTop: {marginTop: 5},
  bordered:{borderWidth: 2, borderColor: "#19197f"},
  rounded: {borderRadius: 20},
  paddingHorizontal: {paddingHorizontal:40},

  /* Específicos */
  viewTitleLogin: {backgroundColor:"#3333ff" },
  logo: {width: 100, height: 100},






});
