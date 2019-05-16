
/* 
  * Classe de interface para listagem de produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 16/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Text, Label, View, Input, Item, Button, Spinner, Root, List, ListItem, Right, Icon, Picker, DatePicker} from "native-base";
import {Modal, TouchableOpacity} from "react-native"; 
import { connect } from 'react-redux';
import _ from "lodash";

import styles from "../../styles/styles";

import Utils from "../commun/Utils";

/* Actions necessárias */

var listar;

/* Iniciando a classe de login */
class ListarProduto extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {
            modal_cadastro: false,
            nome_cadastrar_despensa: "",
            despensas: ""
        }
    }


    render_dados = () => {
        
        if(this.props.carregando_despensas)
            return (
                <View>
                    <Spinner color= "green" />
                    <Text style = {[styles.textCenter, styles.bold, styles.greenColor]}>Carregando suas despensas ...</Text>
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

	render(){

        listar = _.map(this.state.despensas, (val, uid) => {            
            return(
                <TouchableOpacity style = {{}}  onPress = {() => alert("dadads")}>
                    <View style = {{padding: 20, borderBottomColor: "gray", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style = {styles.bold}>{val.descricao}</Text>
                            <Text style = {styles.smallFont}>Criada em {Utils.formata_data(val.criada_em)}</Text>
                        </View>
                        <View>
                            <Icon type = "FontAwesome5" name = "hand-point-right" style = {styles.primaryColor}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });

		return(
            <Container style = {[styles.container, styles.spaceBetween]}>
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
                            <Text style = {[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Cadastrar produto</Text>
                        </View>

                        <View style = {styles.bigMarginTop}>
                            <Item floatingLabel>
                                <Label>Nome do produto</Label>
                                <Input value = {this.state.nome_cadastrar_despensa} onChangeText = {(texto) => this.setState({nome_cadastrar_despensa: texto})} onFocus = {() => this.setState({input_color:"#19197f"})} onBlur = {() => this.setState({input_color: "transparent"})} underlineColorAndroid = {this.state.input_color}/>
                            </Item>

                            <View style = {styles.bigMarginTop}>
                                <Label>Categoria do produto</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    >
                                    <Picker.Item label="Alimento" value="key0" />
                                    <Picker.Item label="Limpeza" value="key1" />
                                </Picker>
                            </View>    

                            <View style = {styles.marginTop}>
                                <Label>Data de validade</Label>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"pt"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Selecione a data"
                                    textStyle={[styles.primaryColor, styles.bold]}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </View>
                        </View>

                        <View style = {[styles.bigMarginTop, styles.center]}>
                            {!this.props.loading ?
                            <Button onPress = {() => {}} iconRight rounded success full style = {styles.rounded}>
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

                <List>
                  <Text>eae</Text>
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
});

export default connect(mapStateToProps, {})(ListarProduto);