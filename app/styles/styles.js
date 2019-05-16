
/* 
  * Arquivo de controle de estilos do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 16/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* Importações necessárias */

import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({

  /* Cores */
  primaryColor: {color: "#0f0f4c"},
  primaryColorBack: {backgroundColor: "#0f0f4c"},
  secundaryColor: {color: "#e52d2d"},
  secundaryColorBack: {backgroundColor: "#e52d2d"},
  whiteColor: {color: "white"},
  whiteColorBack: {backgroundColor: "white"},
  greyColor: {color:"#333333"},
  greenColor: {color:"green"},

  /* Botões */
  circleButton: {height:60, width:60, borderRadius: 30, justifyContent: "center", alignItems: "center"},
  buttonBack: {height: 48, width: 48, borderRadius: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f4c"},

  /* Fontes */
  smallFont: {fontSize: 14},
  mediumFont: {fontSize: 20},
  bigFont: {fontSize: 26},
  titleFont: {fontSize: 30},
  textCenter: {textAlign: "center"},
  bold: {fontWeight: "bold"},
  roboto: {fontFamily: "roboto"},

  /* Views */
  container: {backgroundColor: "white", flex: 1, paddingHorizontal: 15},
  center: {justifyContent: "center", alignItems: "center", alignSelf: "center"},
  centerVertical: {alignItems: "center"},
  column: {flexDirection: "column"},
  row: {flexDirection: "row"},
  spaceAround: {justifyContent: "space-around"},
  spaceBetween: {justifyContent: "space-between"},
  marginTop: {marginTop: 10},
  bigMarginTop: {marginTop: 30},
  smallMarginTop: {marginTop: 5},
  marginBottom: {marginBottom: 10},
  bigMarginBottom: {marginBottom: 30},
  smallMarginBottom: {marginBottom: 5},
  bordered:{borderWidth: 2, borderColor: "#19197f"},
  rounded: {borderRadius: 20},
  paddingHorizontal: {paddingHorizontal:40},

  /* Específicos */
  viewTitleLogin: {backgroundColor:"#3333ff" },
  logo: {width: 100, height: 100},
  viewCircleButton: {alignItems: "flex-end", justifyContent: "flex-end", alignSelf: "flex-end"}





});
