
/* 
  * Classe de controle do Login do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 02/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Footer, Text, View, Input, Item, Icon, Button, Spinner} from "native-base";
import {Image, ScrollView} from "react-native"; 
import {StatusBar, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";


import styles from "../styles/styles";

import {logar} from "../actions/usuario_actions";

/* Iniciando a classe de login */
class Login extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {usuario: "", senha: ""}
    }

	render(){
		return(
            <Container style = {{}}>

			    <StatusBar backgroundColor = "#0f0f4c" />
                <ScrollView style = {[styles.container]} ref={this.scrollView}> 
                    <View style = {[styles.center, styles.spaceAround,styles.bigMarginTop]}>
                        <Image style = {styles.logo} source = {require("../assets/images/logo.png")} />                
                        <Text style = {[styles.bold, styles.mediumFont, styles.secundaryColor]}>MINHA DESPENSA</Text>                   
                    </View>

                    <View style = {styles.bigMarginTop}>
                        <Item>
                            <Icon style = {styles.primaryColor} type = "FontAwesome5" name='user' />
                            <Input value = {this.state.usuario} onChangeText = {(texto) => this.setState({usuario: texto})} placeholder='Usuário'/>
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item>
                            <Icon style = {styles.primaryColor} type = "FontAwesome5" name='lock' />
                            <Input value = {this.state.senha} onChangeText = {(texto) => this.setState({senha: texto})} secureTextEntry placeholder='Senha'/>
                        </Item>
                    </View>

                    <View style = {[styles.bigMarginTop, styles.paddingHorizontal]}>

                        {!this.props.loading_login ?

                        <Button onPress = {() => {this.props.logar(this.state.usuario, this.state.senha); this.setState({senha: ""})}} full iconRight style = {[styles.whiteColorBack, styles.bordered]}>
                            <Text style = {[styles.bold, styles.primaryColor]}>ENTRAR</Text>
                            <Icon style = {styles.primaryColor} type = "FontAwesome5" name='sign-in-alt' />
                        </Button>
                        :
                        <View>
                            <Spinner color = "#0f0f4c" />
                            <Text style = {[styles.textCenter, styles.bold, styles.primaryColor]}>Entrando, aguarde...</Text>
                        </View>
                        }
                    </View>

                    <View style = {[styles.marginTop, styles.paddingHorizontal]}>
                        <Button onPress = {() => Actions.inicio()}  full iconRight style = {[styles.whiteColorBack, styles.bordered]}>
                            <Text style = {[styles.primaryColor, styles.bold]}>ENTRAR COM GOOGLE</Text>
                            <Icon style = {styles.primaryColor} type = "FontAwesome5" name='google' />
                        </Button>
                    </View>

                </ScrollView>
                <Footer style = {[styles.secundaryColorBack, styles.bigMarginTop]}>
                    <TouchableOpacity onPress = {() => Actions.cadastro()} style = {styles.center}>
                        <Text style = {[styles.whiteColor, styles.bold, styles.textCenter]}>Não possui conta? crie agora!</Text>
                    </TouchableOpacity>                
                </Footer>
            </Container>

		)
	}
}


const mapStateToProps = state => ({
    loading_login: state.usuario_reducer.loading_login
});

export default connect(mapStateToProps, {logar})(Login);