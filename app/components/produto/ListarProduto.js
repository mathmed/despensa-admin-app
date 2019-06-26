
/* 
  * Classe de interface para listagem de produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 22/05/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, { Component } from 'react';
import { Container, Text, Label, View, Input, Item, Button, Spinner, Root, List, Icon, Picker, DatePicker } from "native-base";
import { Modal, TouchableOpacity, ScrollView } from "react-native";
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import { TextInputMask } from 'react-native-masked-text'

import _ from "lodash";

import styles from "../../styles/styles";

import Utils from "../commun/Utils";

/* Actions necessárias */
import { cadastrar_produto, listar_produtos } from "../../actions/produto_actions";

var listar;

/* Iniciando a classe de login */
class ListarProduto extends Component {

    /* Construtor da classe com estados utilizados */
    constructor(props) {
        super(props);
        this.state = {
            modal_cadastro: false,
            nome_cadastrar_produto: "",
            unidade_medida: "Kg",
            quantidade: "",
            preco_unitario: "",
            categoria: "1",
            validade: "",
            fornecedor: "Nenhum",
            produtos: "",
            input_preco_color: "grey",
            input_nome_color: "grey"
        }
    }

    /* Requisitando a lista de produtos */
    componentWillMount() {
        this.props.listar_produtos(this.props.despensa.uid);
    }

    componentWillReceiveProps(props) {
        this.setState({ produtos: props.produtos })
    }

    cadastrar_produto = () => {

        /* Guardando as variáveis do estado */
        let { nome_cadastrar_produto, unidade_medida, quantidade, preco_unitario, categoria,
            validade, fornecedor } = this.state;

        /* Chamando a Actions responsável por contactar o servidor */
        this.props.cadastrar_produto(
            nome_cadastrar_produto, unidade_medida, quantidade, preco_unitario, categoria,
            validade, fornecedor, this.props.despensa.uid
        );


    }

    render_dados = () => {

        if (this.props.carregando_produtos)
            return (
                <View style={styles.bigMarginTop}>
                    <Spinner color="green" />
                    <Text style={[styles.textCenter, styles.bold, styles.greenColor]}>Carregando produtos da despensa ...</Text>
                </View>
            )


        if (this.state.produtos.length < 1)
            return (
                <View style={styles.bigMarginTop}>
                    <Text style={[styles.textCenter, styles.bold, styles.secundaryColor]}>Nenhum produto encontrado, cadastre um agora mesmo</Text>
                </View>
            )

        if (this.state.produtos)
            return <View>{listar}</View>

    }

    render() {


        let fornecedores = _.map(this.props.fornecedores, (val, uid) => (
            <Picker.Item label={val.descricao} value={val.id} />

        ))

        listar = _.map(this.state.produtos, (val, uid) => {
            return (
                <TouchableOpacity style={{}} onPress={() => Actions.detalhes({produto: val, title: val.nome})}>
                    <View style={{ padding: 20, borderBottomColor: "gray", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.bold}>{val.nome}</Text>
                            <Text style={styles.smallFont}>{val.quantidade + val.unidade} em estoque</Text>
                        </View>
                        <View>
                            <Icon type="FontAwesome5" name="angle-right" style={styles.primaryColor}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });

        return (
            <Container style={[styles.container, styles.spaceBetween]}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modal_cadastro}
                    onRequestClose={() => {
                        this.setState({ modal_cadastro: !this.state.modal_cadastro })
                    }}>
                    <Root>
                        <ScrollView style={[styles.container, styles.bigMarginTop]}>
                            <View style={[styles.marginTop, styles.spaceAround, styles.row, styles.centerVertical]}>
                                <Button onPress={() => this.setState({ modal_cadastro: !this.state.modal_cadastro })} success style={styles.buttonBack}>
                                    <Icon style={styles.mediumFont} type="FontAwesome5" name="angle-left"></Icon>
                                </Button>
                                <Text style={[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Cadastrar produto</Text>
                            </View>

                            <View style={styles.bigMarginTop}>
                                <View>
                                    <Label>Nome do produto</Label>
                                    <Input
                                        placeholder="Ex: Arroz branco"
                                        value={this.state.nome_cadastrar_produto}
                                        onChangeText={(texto) => this.setState({ nome_cadastrar_produto: texto })}
                                        onFocus={() => this.setState({ input_nome_color: "#19197f" })}
                                        onBlur={() => this.setState({ input_nome_color: "grey" })}
                                        underlineColorAndroid={this.state.input_nome_color}
                                    />
                                </View>
                                <View style={styles.marginTop}>
                                    <Label>Unidade de medida</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select your SIM"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.unidade_medida}
                                        onValueChange={(value) => this.setState({ unidade_medida: value })}
                                    >
                                        <Picker.Item label="Kg" value="Kg" />
                                        <Picker.Item label="g" value="g" />
                                        <Picker.Item label="L" value="L" />
                                        <Picker.Item label="ml" value="ml" />
                                        <Picker.Item label="unidade" value="unidade" />
                                    </Picker>
                                </View>
                                <View style={styles.marginTop}>
                                    <Label>Quantidade</Label>
                                    <Input
                                        placeholder='Ex: 5'
                                        keyboardType="numeric"
                                        onFocus={() => this.setState({ input_preco_color: "#19197f" })}
                                        onBlur={() => this.setState({ input_preco_color: "grey" })}
                                        underlineColorAndroid={this.state.input_preco_color}
                                        value={this.state.quantidade}
                                        onChangeText={(texto) => this.setState({ quantidade: texto })}

                                    />
                                </View>

                                <View style={styles.bigMarginTop}>
                                    <Label>Preço unitário</Label>
                                    <TextInputMask
                                        placeholder='Ex: R$ 3,50'
                                        type={'money'}
                                        onFocus={() => this.setState({ input_preco_color: "#19197f" })}
                                        onBlur={() => this.setState({ input_preco_color: "grey" })}
                                        underlineColorAndroid={this.state.input_preco_color}
                                        value={this.state.preco_unitario}
                                        onChangeText={(texto) => this.setState({ preco_unitario: texto })}

                                    />
                                </View>

                                <View style={styles.bigMarginTop}>
                                    <Label>Categoria do produto</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select your SIM"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.categoria}
                                        onValueChange={value => this.setState({ categoria: value })}
                                    >
                                        <Picker.Item label="Alimento" value="1" />
                                        <Picker.Item label="Limpeza" value="2" />
                                    </Picker>
                                </View>

                                <View style={styles.marginTop}>
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
                                        onDateChange={value => this.setState({ validade: value })}
                                        disabled={false}
                                        selectedValue={this.state.validade}
                                    />
                                </View>

                                <View style={styles.marginTop}>
                                    <Label>Fornecedor</Label>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select your SIM"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        selectedValue={this.state.fornecedor}
                                        onValueChange={value => this.setState({ fornecedor: value })}
                                    >
                                        <Picker.Item label="Nenhum" value="" />
                                        {fornecedores}
                                    </Picker>
                                </View>
                            </View>

                            <View style={[styles.bigMarginTop, styles.bigMarginBottom, styles.center]}>
                                {!this.props.loading_cadastro_produto ?
                                    <Button onPress={() => this.cadastrar_produto()} iconRight rounded success full style={styles.rounded}>
                                        <Text>Cadastrar</Text>
                                        <Icon type="FontAwesome5" name="plus"></Icon>
                                    </Button>

                                    :

                                    <View>
                                        <Spinner color='green' />
                                        <Text style={[styles.textCenter, styles.bold, styles.greenColor]}>Criando despensa, aguarde...</Text>
                                    </View>
                                }
                            </View>

                        </ScrollView>
                    </Root>
                </Modal>

                <List>
                    {this.render_dados()}
                </List>

                <View style={[styles.marginBottom, styles.viewCircleButton]}>
                    <Button onPress={() => this.setState({ modal_cadastro: !this.state.modal_cadastro })} success style={styles.circleButton}>
                        <Icon type="FontAwesome5" name="plus"></Icon>
                    </Button>
                </View>
            </Container>

        )
    }
}


const mapStateToProps = state => ({

    fornecedores: state.fornecedor_reducer.fornecedores,
    produtos: state.produto_reducer.produtos,
    carregando_produtos: state.produto_reducer.carregando_produtos,
    loading_cadastro_produto: state.produto_reducer.loading_cadastro_produto
});

export default connect(mapStateToProps, { cadastrar_produto, listar_produtos })(ListarProduto);