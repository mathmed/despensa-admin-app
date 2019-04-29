
/* 
  * Classe de controle do Cadastro do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 29/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Content, Text, Label, View, Input, Item, Icon, Button} from "native-base";
import {StatusBar} from "react-native";
import { connect } from 'react-redux';

import styles from "../styles/styles";


/* Iniciando a classe de login */
class Cadastro extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {nome_color: "transparent", usuario_color: "transparent", email_color: "transparent", senha_color: "transparent", repita_color: "transparent" }
    }

	render(){
		return(
            <Container style = {styles.whiteColorBack}>
			    <StatusBar backgroundColor = "#0f0f4c" />
                <Content style = {[styles.container, styles.whiteColorBack]}>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Nome e sobrenome</Label>
                            <Input onFocus = {() => this.setState({nome_color:"#19197f"})} onBlur = {() => this.setState({nome_color: "transparent"})} underlineColorAndroid = {this.state.nome_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Usuário</Label>
                            <Input onFocus = {() => this.setState({usuario_color:"#19197f"})} onBlur = {() => this.setState({usuario_color: "transparent"})} underlineColorAndroid = {this.state.usuario_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>E-mail</Label>
                            <Input onFocus = {() => this.setState({email_color:"#19197f"})} onBlur = {() => this.setState({email_color: "transparent"})} underlineColorAndroid = {this.state.email_color}/>
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Senha</Label>
                            <Input secureTextEntry onFocus = {() => this.setState({senha_color:"#19197f"})} onBlur = {() => this.setState({senha_color: "transparent"})} underlineColorAndroid = {this.state.senha_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Repita a senha</Label>
                            <Input secureTextEntry onFocus = {() => this.setState({repita_color:"#19197f"})} onBlur = {() => this.setState({repita_color: "transparent"})} underlineColorAndroid = {this.state.repita_color}/>
                        </Item>
                    </View>

                    <View style = {[styles.bigMarginTop]}>
                        <Button iconRight rounded success full style = {styles.rounded}>
                            <Text>Criar conta</Text>
                            <Icon type = "FontAwesome5" name = "hand-point-right"></Icon>
                        </Button>
                    </View>
                </Content>
            </Container>

		)
	}
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Cadastro);