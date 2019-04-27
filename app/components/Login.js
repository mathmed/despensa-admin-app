
/* 
  * Classe de controle do Login do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 27/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Footer, Content, Text, Label, View, Input, Item, Icon, Button} from "native-base";
import {Image} from "react-native"; 
import {StatusBar, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";

import styles from "../styles/styles";


/* Iniciando a classe de login */
class Login extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
    }

	render(){
		return(
            <Container style = {styles.primaryColorBack}>

			    <StatusBar backgroundColor = "#0f0f4c" />
                <Content style = {[styles.container, styles.primaryColorBack]}>
                    <View style = {styles.center}>
                        <Image style = {styles.logo} source = {require("../assets/images/logo.png")} />                
                    </View>

                    <View style = {styles.bigMarginTop}>
                        <Item>
                            <Icon style = {styles.whiteColor} type = "FontAwesome5" name='user' />
                            <Input style = {styles.whiteColor} placeholderTextColor = "white" placeholder='Usuário'/>
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item>
                            <Icon style = {styles.whiteColor} type = "FontAwesome5" name='lock' />
                            <Input style = {styles.whiteColor} placeholderTextColor = "white" secureTextEntry placeholder='Senha'/>
                        </Item>
                    </View>

                    <View style = {[styles.bigMarginTop, styles.center]}>
                        <Button iconRight style = {[styles.secundaryColorBack, {width: 250}]}>
                            <Text style = {styles.bold}>ENTRAR</Text>
                            <Icon type = "FontAwesome5" name='sign-in-alt' />
                        </Button>
                    </View>

                    <View style = {[styles.marginTop, styles.center]}>
                        <Button bordered iconRight style = {[styles.whiteColorBack, {width: 250}]}>
                            <Text style = {[styles.secundaryColor, styles.bold]}>ENTRAR COM GOOGLE</Text>
                            <Icon style = {styles.secundaryColor} type = "FontAwesome5" name='google' />
                        </Button>
                    </View>

                    <View style = {[styles.bigMarginTop]}>
                        <TouchableOpacity onPress = {() => Actions.criar_conta()}>
                            <Text style = {[styles.whiteColor, styles.bold, styles.textCenter, styles.mediumFont]}>Não possui conta? crie agora!</Text>
                        </TouchableOpacity>
                    </View>

                </Content>
                <Footer style = {styles.primaryColorBack}>
                    <Label style = {[styles.whiteColor, styles.center, styles.bold]}>© Minha Despensa 2019</Label>
                </Footer>

            </Container>

		)
	}
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Login);