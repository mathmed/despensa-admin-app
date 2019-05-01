
/* 
  * Classe de controle do Cadastro do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 01/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Content, Text, Label, View, Input, Item, Icon, Button, Spinner} from "native-base";
import {StatusBar} from "react-native";
import { connect } from 'react-redux';

import styles from "../styles/styles";

/* Importando Actions */
import {cadastrar_usuario} from "../actions/usuario_actions.js";

/* Iniciando a classe de login */
class Cadastro extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {
            nome_color: "transparent", usuario_color: "transparent", email_color: "transparent", senha_color: "transparent", repita_color: "transparent",
            nome_sobrenome: "", usuario: "", email: "", senha: "", confirmacao: "" 
        
        }
    }

    /* Função para iniciar o cadastro do usuário */
    cadastrar = () => {

        /* Guardando os valores em constantes */
        const {nome_sobrenome, usuario, email, senha, confirmacao} = this.state;

        /* Chamando a Action de registro */
        this.props.cadastrar_usuario(nome_sobrenome, usuario, email, senha, confirmacao);

    }

	render(){
		return(
            <Container style = {styles.whiteColorBack}>
			    <StatusBar backgroundColor = "#0f0f4c" />
                <Content style = {[styles.container, styles.whiteColorBack]}>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Nome e sobrenome</Label>
                            <Input value = {this.state.nome_sobrenome} onChangeText = {(texto) => this.setState({nome_sobrenome: texto})} onFocus = {() => this.setState({nome_color:"#19197f"})} onBlur = {() => this.setState({nome_color: "transparent"})} underlineColorAndroid = {this.state.nome_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Usuário</Label>
                            <Input value = {this.state.usuario} onChangeText = {(texto) => this.setState({usuario: texto})} onFocus = {() => this.setState({usuario_color:"#19197f"})} onBlur = {() => this.setState({usuario_color: "transparent"})} underlineColorAndroid = {this.state.usuario_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>E-mail</Label>
                            <Input value = {this.state.email} onChangeText = {(texto) => this.setState({email: texto})} onFocus = {() => this.setState({email_color:"#19197f"})} onBlur = {() => this.setState({email_color: "transparent"})} underlineColorAndroid = {this.state.email_color}/>
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Senha</Label>
                            <Input value = {this.state.senha} onChangeText = {(texto) => this.setState({senha: texto})} secureTextEntry onFocus = {() => this.setState({senha_color:"#19197f"})} onBlur = {() => this.setState({senha_color: "transparent"})} underlineColorAndroid = {this.state.senha_color} />
                        </Item>
                    </View>
                    <View style = {styles.bigMarginTop}>
                        <Item floatingLabel>
                            <Label>Repita a senha</Label>
                            <Input value = {this.state.confirmacao} onChangeText = {(texto) => this.setState({confirmacao: texto})} secureTextEntry onFocus = {() => this.setState({repita_color:"#19197f"})} onBlur = {() => this.setState({repita_color: "transparent"})} underlineColorAndroid = {this.state.repita_color}/>
                        </Item>
                    </View>

                    <View style = {[styles.bigMarginTop]}>
                    
                        { !this.props.loading_cadastro_usuario ? 
                        <Button onPress = {() => this.cadastrar()} iconRight rounded success full style = {styles.rounded}>
                            <Text>Criar conta</Text>
                            <Icon type = "FontAwesome5" name = "hand-point-right"></Icon>
                        </Button>
                        :
                        <View>
                            <Spinner color='green' />
                            <Text style = {[styles.textCenter, styles.bold, styles.greenColor]}>Cadastro em andamento...</Text>
                        </View>
                        }
                    
                    </View>
                </Content>
            </Container>

		)
	}
}


const mapStateToProps = state => ({

    loading_cadastro_usuario: state.usuario_reducer.loading_cadastro_usuario

});

export default connect(mapStateToProps, {cadastrar_usuario})(Cadastro);