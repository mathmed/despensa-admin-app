
/* 
  * Classe de interface para listagem de produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 22/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, {Component} from 'react';
import {Container, Text, Label, View, Input, Item, Button, Spinner, Root, List, Icon, Picker, DatePicker} from "native-base";
import {Modal, TouchableOpacity, ScrollView} from "react-native"; 
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text'

import _ from "lodash";

import styles from "../../styles/styles";

import Utils from "../commun/Utils";

/* Actions necessárias */
import {cadastrar_produto} from "../../actions/produto_actions";

var listar;

/* Iniciando a classe de login */
class ListarProduto extends Component{

    /* Construtor da classe com estados utilizados */
    constructor(props){
        super(props);
        this.state = {
            modal_cadastro: false,
            nome_cadastrar_despensa: "",
            unidade_medida: "Kg",
            quantidade: "",
            preco_unitario: "",
            categoria: "1",
            validade: "",
            fornecedor: "Nenhum",
            despensas: "",
            input_preco_color: "grey",
            input_nome_color: "grey" 
        }
    }
    cadastrar_produto = () => {
        
        /* Guardando as variáveis do estado */
        let {nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria,
        validade, fornecedor} = this.state;

        /* Chamando a Actions responsável por contactar o servidor */
        this.props.cadastrar_produto(
            nome_cadastrar_despensa, unidade_medida, quantidade, preco_unitario, categoria,
            validade, fornecedor, this.props.despensa.uid
        );


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
                    <ScrollView style={[styles.container, styles.bigMarginTop]}>
                        <View style = {[styles.marginTop, styles.spaceAround, styles.row, styles.centerVertical]}>
                            <Button onPress = {() => this.setState({modal_cadastro: !this.state.modal_cadastro})} success style = {styles.buttonBack}>
                                <Icon style = {styles.mediumFont} type = "FontAwesome5" name = "angle-left"></Icon>
                            </Button>
                            <Text style = {[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Cadastrar produto</Text>
                        </View>

                        <View style = {styles.bigMarginTop}>
                            <View>
                                <Label>Nome do produto</Label>
                                <Input
                                    placeholder = "Ex: Arroz branco"
                                    value = {this.state.nome_cadastrar_despensa} 
                                    onChangeText = {(texto) => this.setState({nome_cadastrar_despensa: texto})} 
                                    onFocus = {() => this.setState({input_nome_color:"#19197f"})} 
                                    onBlur = {() => this.setState({input_nome_color: "grey"})} 
                                    underlineColorAndroid = {this.state.input_nome_color}
                                />
                            </View>
                            <View style = {styles.marginTop}>
                                <Label>Unidade de medida</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    selectedValue = {this.state.unidade_medida}
                                    onValueChange = {(value) => this.setState({unidade_medida: value})}
                                    >
                                    <Picker.Item label="Kg" value="Kg" />
                                    <Picker.Item label="g" value="g" />
                                    <Picker.Item label="L" value="L" />
                                    <Picker.Item label="ml" value="ml" />
                                    <Picker.Item label="unidade" value="unidade" />
                                </Picker>
                            </View>
                            <View style = {styles.marginTop}>
                                <Label>Quantidade</Label>
                                <Input
                                    placeholder = 'Ex: 5'
                                    keyboardType = "numeric"
                                    onFocus = {() => this.setState({input_preco_color:"#19197f"})} 
                                    onBlur = {() => this.setState({input_preco_color: "grey"})} 
                                    underlineColorAndroid = {this.state.input_preco_color}
                                    value = {this.state.quantidade}
                                    onChangeText = {(texto) => this.setState({quantidade: texto})}
                                    
                                />
                            </View>

                           <View style = {styles.bigMarginTop}>
                                <Label>Preço unitário</Label>
                                <TextInputMask
                                    placeholder = 'Ex: R$ 3,50'
                                    type = {'money'}
                                    onFocus = {() => this.setState({input_preco_color:"#19197f"})} 
                                    onBlur = {() => this.setState({input_preco_color: "grey"})} 
                                    underlineColorAndroid = {this.state.input_preco_color}
                                    value = {this.state.preco_unitario}
                                    onChangeText = {(texto) => this.setState({preco_unitario: texto})}
                                    
                                />
                            </View>

                            <View style = {styles.bigMarginTop}>
                                <Label>Categoria do produto</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    selectedValue = {this.state.categoria}
                                    onValueChange = {value => this.setState({categoria: value})}
                                    >
                                    <Picker.Item label="Alimento" value="1" />
                                    <Picker.Item label="Limpeza" value="2" />
                                </Picker>
                            </View>    

                            <View style = {styles.marginTop}>
                                <Label>Data de validade</Label>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2030, 12, 31)}
                                    format
                                    locale={"pt"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Selecione a data"
                                    textStyle={[styles.primaryColor, styles.bold]}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={value => this.setState({validade: value})}
                                    disabled={false}
                                    selectedValue = {this.state.validade}
                                />
                            </View>

                            <View style = {styles.marginTop}>
                                <Label>Fornecedor</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your SIM"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    selectedValue = {this.state.fornecedor}
                                    onValueChange = {value => this.setState({fornecedor: value})}
                                    >
                                    <Picker.Item label="Nenhum" value="" />
                                    <Picker.Item label="ZigZag" value="1" />
                                </Picker>
                            </View>
                        </View>

                        <View style = {[styles.bigMarginTop, styles.bigMarginBottom, styles.center]}>
                            {!this.props.loading ?
                            <Button onPress = {() => this.cadastrar_produto()} iconRight rounded success full style = {styles.rounded}>
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

                    </ScrollView>
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

export default connect(mapStateToProps, {cadastrar_produto})(ListarProduto);