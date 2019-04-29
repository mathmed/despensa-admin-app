
/* 
  * Classe da interface do início do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 29/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Content, Text, Icon, Button, Drawer, Header, Left, Body, Title, Footer, FooterTab} from "native-base";
import {StatusBar} from "react-native";
import { connect } from 'react-redux';
import Menu from './Menu.js';
import styles from "../styles/styles";


/* Iniciando a classe de login */
class Inicio extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
    }



	render(){
        
		return(
            <Drawer ref={(ref) => { this.drawer = ref; }} content={<Menu navigator={this.navigator}/>}>
                <Container style = {styles.whiteColorBack}>
                    <StatusBar backgroundColor = "#0f0f4c" />                
                    <Header style = {styles.primaryColorBack}>
                        <Left>
                            <Button transparent>
                                <Icon type = "FontAwesome5" onPress = {() => { this.drawer._root.open()}} name='bars' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>MINHA DESPENSA</Title>
                        </Body>
                    </Header>
                    <Content style = {[styles.container, styles.whiteColorBack]}>

                    </Content>

                    <Footer style = {styles.primaryColorBack}>
                        <FooterTab style = {styles.primaryColorBack}>
                            <Button vertical>
                                <Icon type = "FontAwesome5" name="users" />
                                <Text>Grupos</Text>
                            </Button>
                            <Button vertical>
                                <Icon active type = "FontAwesome5" name="shopping-cart" />
                                <Text>Listas</Text>
                            </Button>
                            <Button vertical active>
                                <Icon active type = "FontAwesome5" name="home" />
                                <Text>Despensa</Text>
                            </Button>
                            <Button vertical>
                                <Icon type = "FontAwesome5" name="chart-line" />
                                <Text>Gastos</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>
		)
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Inicio);