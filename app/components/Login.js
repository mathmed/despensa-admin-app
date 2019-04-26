
/* 
  * Classe de controle do Login do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 26/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Footer, Content, Text, Label} from "native-base"; 
import {StatusBar} from "react-native";
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import styles from "../styles/styles";


/* Iniciando a classe de login */
class Login extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
    }

	render(){
		return(
            <Container>

			    <StatusBar backgroundColor = '#007A88' />
                <Content style = {styles.container}>
                    <Text>eae</Text>
                </Content>
                <Footer style = {[styles.primaryColorBack, styles.header]}>
                    <Label style = {[styles.whiteColor, styles.center, styles.bold]}>© Matechs 2019</Label>
                </Footer>

            </Container>

		)
	}
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Login);