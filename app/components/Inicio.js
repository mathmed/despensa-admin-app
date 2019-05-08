
/* 
  * Classe da interface do início do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 08/05/2019
  * Projeto utilizando o framework Re8act Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Content, Text, Icon, Button, Drawer, Header, Left, Body, Title, Footer, FooterTab} from "native-base";
import {StatusBar} from "react-native";
import { connect } from 'react-redux';
import Menu from './Menu.js';
import styles from "../styles/styles";
import ListarDespensa from './despensa/ListarDespensa.js';


/* Iniciando a classe de login */
class Inicio extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);

        /* Estado para controlar a tela atual da aplicação */
        this.state = {tela_atual: "DESPENSA"}

    }

    /* Função para renderizar a tela selecionada */
    renderizar_tela = () => {

        if(this.state.tela_atual == "DESPENSA")
            return <ListarDespensa />

        else if (this.state.tela_atual == "LISTAS")
            return <Text>listas</Text>
    
        else if (this.state.tela_atual == "GRUPOS")
            return <Text>grupos</Text>

        else if (this.state.tela_atual == "GASTOS")
            return <Text>gastos</Text>
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
     

                    {this.renderizar_tela()}


                    <Footer style = {styles.primaryColorBack}>
                        <FooterTab style = {styles.primaryColorBack}>
                            <Button active = {this.state.tela_atual == "GRUPOS" ? true : false} onPress = {() => this.setState({tela_atual: "GRUPOS"})} vertical>
                                <Icon type = "FontAwesome5" name="users" />
                                <Text>Grupos</Text>
                            </Button>
                            <Button active = {this.state.tela_atual == "LISTAS" ? true : false} onPress = {() => this.setState({tela_atual: "LISTAS"})} vertical>
                                <Icon type = "FontAwesome5" name="shopping-cart" />
                                <Text>Listas</Text>
                            </Button>
                            <Button active = {this.state.tela_atual == "DESPENSA" ? true : false} onPress = {() => this.setState({tela_atual: "DESPENSA"})} vertical>
                                <Icon type = "FontAwesome5" name="home" />
                                <Text>Despensa</Text>
                            </Button>
                            <Button active = {this.state.tela_atual == "GASTOS" ? true : false}  onPress = {() => this.setState({tela_atual: "GASTOS"})} vertical>
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