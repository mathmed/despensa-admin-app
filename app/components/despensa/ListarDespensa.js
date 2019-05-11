
/* 
  * Classe de interface para listagem de despensas
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 09/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Text, Label, View, Input, Item, Button, Spinner, Root, List, ListItem, Right, Icon, Left} from "native-base";
import {Modal, TouchableHighlight} from "react-native"; 
import { connect } from 'react-redux';
import _ from "lodash";

import styles from "../../styles/styles";

/* Actions necessárias */
import {criar_despensa, listar_despensas} from "../../actions/despensa_actions";

var listar;

/* Iniciando a classe de login */
class ListarDespensa extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {
            modal_cadastro: false,
            nome_cadastrar_despensa: "",
            repita_color: "transparent",
            despensas: ""
        }
    }

    /* Requisitando a lista de despensas */
    componentWillMount(){
        this.props.listar_despensas(this.props.usuario.uid);
    }

    componentWillReceiveProps(props){
        this.setState({despensas: props.despensas})
    }

    render_dados = () => {
        
        if(this.props.carregando_despensas)
            return (
                <View>
                    <Spinner color='#e52d2d' />
                    <Text style = {[styles.textCenter, styles.bold, styles.secundaryColor]}>Carregando suas despensas ...</Text>
                </View>
            )
        

        if(this.state.despensas.length < 1)
            return (
                <View>
                    <Text style = {[styles.textCenter, styles.bold, styles.secundaryColor]}>Nenhuma despensa encontrada, crie uma agora mesmo</Text>
                </View>
            )

        if(this.state.despensas)
            return <View>{listar}</View>
    
    }

    criar_despensa = () => {
        this.setState({nome_cadastrar_despensa: ""})
        this.props.criar_despensa(this.props.usuario.uid, this.state.nome_cadastrar_despensa); 
    }


	render(){

        listar = _.map(this.state.despensas, (val, uid) => {            
            return(
                <TouchableHighlight style = {styles.secundaryColorBack}  onPress = {() => alert("dadads")}>
                    <View>
                            <Text>{val.descricao}</Text>
                    </View>
                </TouchableHighlight>
            )
        });

        console.log(this.state.despensas)

		return(
            <Container style = {[styles.spaceBetween, styles.container]}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modal_cadastro}
                onRequestClose={() => {
                    this.setState({modal_cadastro: !this.state.modal_cadastro})
                }}>
                    <Root>
                    <View style={[styles.container, styles.bigMarginTop]}>
                        <View style = {[styles.marginTop, styles.spaceAround, styles.row, styles.centerVertical]}>
                            <Button onPress = {() => this.setState({modal_cadastro: !this.state.modal_cadastro})} success style = {styles.buttonBack}>
                                <Icon style = {styles.mediumFont} type = "FontAwesome5" name = "angle-left"></Icon>
                            </Button>
                            <Text style = {[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Cadastrar nova despensa</Text>
                        </View>

                        <View style = {styles.bigMarginTop}>
                            <Item floatingLabel>
                                <Label>Nome para a despensa</Label>
                                <Input value = {this.state.nome_cadastrar_despensa} onChangeText = {(texto) => this.setState({nome_cadastrar_despensa: texto})} onFocus = {() => this.setState({input_color:"#19197f"})} onBlur = {() => this.setState({input_color: "transparent"})} underlineColorAndroid = {this.state.input_color}/>
                            </Item>
                        </View>

                        <View style = {[styles.bigMarginTop, styles.center]}>
                            {!this.props.loading ?
                            <Button onPress = {() => {this.criar_despensa()}} iconRight rounded success full style = {styles.rounded}>
                                <Text>Cadastrar</Text>
                                <Icon type = "FontAwesome5" name = "plus"></Icon>
                            </Button>

                            :

                            <View>
                                <Spinner color='green' />
                                <Text style = {[styles.textCenter, styles.bold, styles.greenColor]}>Criando despensa, aguarde...</Text>
                            </View>
                            }
                        </View>

                    </View>
                    </Root>
                </Modal>

                <List style = {styles.marginTop}>
                  
                  {this.render_dados()}

                </List>

                <View style = {[styles.marginBottom, styles.viewCircleButton]}>
                    <Button onPress = {() => this.setState({modal_cadastro: !this.state.modal_cadastro})} success style = {styles.circleButton}>
                        <Icon type = "FontAwesome5" name = "plus"></Icon>
                    </Button>
                </View>
            </Container>

		)
	}
}


const mapStateToProps = state => ({
    loading: state.despensa_reducer.loading_cadastro_despensa,
    usuario: state.usuario_reducer.dados_usuario,
    despensas: state.despensa_reducer.despensas,
    carregando_despensas: state.despensa_reducer.carregando_despensas
});

export default connect(mapStateToProps, {criar_despensa, listar_despensas})(ListarDespensa);