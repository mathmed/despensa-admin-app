
/* 
  * Classe de interface para listagem de fornecedores
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 13/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, { Component } from 'react';
import { Container, Text, Label, View, Input, Item, Button, Spinner, Root, List, ListItem, Right, Icon, Left } from "native-base";
import { Modal, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import _ from "lodash";

import styles from "../../styles/styles";

/* Actions necessárias */
import { listar_fornecedores, cadastrar_fornecedor, remover_fornecedor } from "../../actions/fornecedor_actions";

var listar;

/* Iniciando a classe de login */
class ListarFornecedor extends Component {

    /* Construtor da classe com estados utilizados */
    constructor(props) {
        super(props);
        this.state = {
            modal_cadastro: false,
            modal_editar: false,
            nome_cadastrar_fornecedor: "",
            fornecedores: "",

            id_editar: "",
            nome_editar: ""

        }
    }


    /* Requisitando a lista de fornecedores */
    componentWillMount() {
        this.props.listar_fornecedores(this.props.usuario.uid);
    }

    componentWillReceiveProps(props) {
        this.setState({ fornecedores: props.fornecedores })
    }

    render_dados = () => {

        if (this.props.carregando_fornecedores)
            return (
                <View>
                    <Spinner color="green" />
                    <Text style={[styles.textCenter, styles.bold, styles.greenColor]}>Carregando seus fornecedores ...</Text>
                </View>
            )


        if (this.state.fornecedores.length < 1)
            return (
                <View>
                    <Text style={[styles.textCenter, styles.bold, styles.secundaryColor]}>Nenhum fornecedor encontrado, crie uma agora mesmo</Text>
                </View>
            )

        if (this.state.fornecedores)
            return <View>{listar}</View>

    }

    /* Função para iniciar o cadastro do fornecedor */
    cadastrar = () => {
        this.props.cadastrar_fornecedor(this.props.usuario.uid, this.state.nome_cadastrar_fornecedor);
        this.setState({ nome_cadastrar_fornecedor: "" })

    }

    /* Função para abrir o modal e iniciar a edição de um fornecedor */
    iniciar_edicao = (uid, descricao) => {

        /* Alterando o estado da classe */
        this.setState({ nome_editar: descricao, id_editar: uid, modal_editar: true });

    }

    render() {

        listar = _.map(this.state.fornecedores, (val, uid) => {

            return (
                <TouchableOpacity style={{}} onPress={() => this.iniciar_edicao(val.id, val.descricao)}>
                    <View style={{ padding: 20, borderBottomColor: "gray", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.bold}>{val.descricao}</Text>
                        </View>
                        <View>
                            <Icon type="FontAwesome5" name="edit" style={styles.primaryColor}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });

        return (
            <Container style={[styles.spaceBetween, styles.container]}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modal_cadastro}
                    onRequestClose={() => {
                        this.setState({ modal_cadastro: !this.state.modal_cadastro })
                    }}>
                    <Root>
                        <View style={[styles.container, styles.bigMarginTop]}>
                            <View style={[styles.marginTop, styles.spaceAround, styles.row, styles.centerVertical]}>
                                <Button onPress={() => this.setState({ modal_cadastro: !this.state.modal_cadastro })} success style={styles.buttonBack}>
                                    <Icon style={styles.mediumFont} type="FontAwesome5" name="angle-left"></Icon>
                                </Button>
                                <Text style={[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Cadastrar novo fornecedor</Text>
                            </View>

                            <View style={styles.bigMarginTop}>
                                <Item floatingLabel>
                                    <Label>Nome para o fornecedor</Label>
                                    <Input value={this.state.nome_cadastrar_fornecedor} onChangeText={(texto) => this.setState({ nome_cadastrar_fornecedor: texto })} onFocus={() => this.setState({ input_color: "#19197f" })} onBlur={() => this.setState({ input_color: "transparent" })} underlineColorAndroid={this.state.input_color} />
                                </Item>
                            </View>

                            <View style={[styles.bigMarginTop, styles.center]}>
                                {!this.props.loading ?
                                    <Button onPress={() => { this.cadastrar() }} iconRight rounded success full style={styles.rounded}>
                                        <Text>Cadastrar</Text>
                                        <Icon type="FontAwesome5" name="plus"></Icon>
                                    </Button>

                                    :

                                    <View>
                                        <Spinner color='green' />
                                        <Text style={[styles.textCenter, styles.bold, styles.greenColor]}>Cadastrando fornecedor, aguarde...</Text>
                                    </View>
                                }
                            </View>

                        </View>
                    </Root>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modal_editar}
                    onRequestClose={() => {
                        this.setState({ modal_editar: !this.state.modal_editar })
                    }}>
                    <Root>
                        <View style={[styles.container]}>
                            <View style={[styles.bigMarginTop, { flex: 0.2 }]}>
                                <View style={[styles.spaceAround, styles.row, styles.centerVertical]}>
                                    <Button onPress={() => this.setState({ modal_editar: !this.state.modal_editar })} success style={styles.buttonBack}>
                                        <Icon style={styles.mediumFont} type="FontAwesome5" name="angle-left"></Icon>
                                    </Button>
                                    <Text style={[styles.textCenter, styles.bold, styles.primaryColor, styles.mediumFont]}>Editar fornecedor</Text>
                                </View>
                            </View>

                            <View style={[styles.bigMarginTop, { flex: 0.2 }]}>
                                <Item floatingLabel>
                                    <Label>Nome do fornecedor</Label>
                                    <Input value={this.state.nome_editar} onChangeText={(texto) => this.setState({ nome_editar: texto })} onFocus={() => this.setState({ input_color: "#19197f" })} onBlur={() => this.setState({ input_color: "transparent" })} underlineColorAndroid={this.state.input_color} />
                                </Item>
                            </View>

                            <View style={[styles.bigMarginTop, styles.center, { flex: 0.1 }]}>
                                {!this.props.loading ?
                                    <View style={styles.bigMarginTop}>
                                        <View>
                                            <Button onPress={() => { this.atualizar() }} iconRight rounded success style={styles.rounded}>
                                                <Text>ATUALIZAR</Text>
                                                <Icon type="FontAwesome5" name="check-circle"></Icon>
                                            </Button>
                                        </View>
                                        <View style={styles.bigMarginTop}>
                                            <Button onPress={() => { this.props.remover_fornecedor(this.state.id_editar, this.props.usuario.uid); this.setState({modal_editar: false}) }} iconRight rounded danger style={styles.rounded}>
                                                <Text>REMOVER</Text>
                                                <Icon type="FontAwesome5" name="trash-alt"></Icon>
                                            </Button>
                                        </View>

                                    </View>


                                    :

                                    <View>
                                        <Spinner color='green' />
                                        <Text style={[styles.textCenter, styles.bold, styles.greenColor]}>Cadastrando fornecedor, aguarde...</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </Root>
                </Modal >

                <List style={styles.marginTop}>

                    {this.render_dados()}

                </List>

                <View style={[styles.marginBottom, styles.viewCircleButton]}>
                    <Button onPress={() => this.setState({ modal_cadastro: !this.state.modal_cadastro })} success style={styles.circleButton}>
                        <Icon type="FontAwesome5" name="plus"></Icon>
                    </Button>
                </View>
            </Container >

        )
    }
}


const mapStateToProps = state => ({
    loading: state.fornecedor_reducer.loading_cadastro_fornecedor,
    usuario: state.usuario_reducer.dados_usuario,
    fornecedores: state.fornecedor_reducer.fornecedores,
    carregando_fornecedores: state.fornecedor_reducer.carregando_fornecedores
});

export default connect(mapStateToProps, { listar_fornecedores, cadastrar_fornecedor, remover_fornecedor })(ListarFornecedor);