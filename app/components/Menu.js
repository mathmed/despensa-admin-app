
/* 
  * Classe da interface do menu lateral do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 29/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Content, Text, View, Icon, Button, ListItem, Left, Switch, Body, Right} from "native-base";
import {StatusBar} from "react-native";
import { connect } from 'react-redux';
import styles from "../styles/styles";

import {deslogar} from "../actions/usuario_actions";

/* Iniciando a classe de login */
class Menu extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
    }

	render(){
		return(
            <Content style = {[styles.whiteColorBack]}>
                <StatusBar backgroundColor = "#0f0f4c" />                
            

                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "blue" }}>
                            <Icon type = "FontAwesome5" active name="user" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Meu perfil</Text>
                    </Body>
                </ListItem>
                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF4444" }}>
                            <Icon type = "FontAwesome5" active name="utensils" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Produtos</Text>
                    </Body>
                </ListItem>
                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon type = "FontAwesome5" active name="edit" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Categorias</Text>
                    </Body>
                </ListItem>
                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "#00ced1" }}>
                            <Icon type = "FontAwesome5" active name="warehouse" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Fornecedores</Text>
                    </Body>
                </ListItem>
                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "#00b258" }}>
                            <Icon type = "FontAwesome5" active name="bell" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Notificações</Text>
                    </Body>
                    <Right>
                        <Switch value={true} />
                    </Right>
                </ListItem>
                <ListItem icon style = {styles.marginTop}>
                    <Left>
                        <Button style={{ backgroundColor: "#133337" }}>
                            <Icon type = "FontAwesome5" active name="pencil-alt" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Personalizar APP</Text>
                    </Body>
                </ListItem>
                <View style = {[styles.bigMarginTop, styles.center]}>
                    <Button onPress = {() => this.props.deslogar(this.props.usuario.token)} iconRight rounded style = {styles.secundaryColorBack}>
                        <Text>Sair</Text>
                        <Icon type = "FontAwesome5" name='door-open' />
                    </Button>
                </View>
            </Content>

		)
	}
}


const mapStateToProps = state => ({

    usuario: state.usuario_reducer.dados_usuario

});

export default connect(mapStateToProps, {deslogar})(Menu);