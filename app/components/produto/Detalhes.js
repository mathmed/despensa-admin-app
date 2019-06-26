
/* 
  * Classe de interface para detalhes de  um produtos
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 26/06/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, { Component } from 'react';
import { Container, Switch, Text, Label, View, Item, Button, Spinner, Root, List, Icon, Picker, DatePicker } from "native-base";
import { Modal, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text'

import _ from "lodash";

import styles from "../../styles/styles";

import Utils from "../commun/Utils";


/* Iniciando a classe de login */
class Detalhes extends Component {

    /* Construtor da classe com estados utilizados */
    constructor(props) {
        super(props);

        this.state = {
            status: "",
            quantidade: "",
            unidade: "",
            validade: "",
            input_preco_color: "grey",

        }
    }

    componentWillMount() {
        this.setState({ status: this.props.produto.status_, quantidade: this.props.produto.quantidade, unidade: this.props.produto.unidade, validade: this.props.produto.validade })
    }

    render() {


        return (

            <Container style={[styles.container]}>
                <View style={[styles.bigMarginTop, styles.elevation, styles.bigMarginTop, styles.center]}>
                    <Label style={[styles.bold, styles.primaryColor]}>Válido até {Utils.formata_data(this.state.validade)}</Label>
                </View>

                <View style={[styles.center, styles.bigMarginTop]}>
                    <Switch value={this.state.status == "aberto" ? true : false} onValueChange={() => this.setState({ status: this.state.status == "aberto" ? "fechado" : "aberto" })} />
                    <Label style={[styles.marginTop, styles.bold, styles.primaryColor]}>Produto {this.state.status == "aberto" ? "Aberto" : "Fechado"}</Label>
                </View>
                <View style={styles.bigMarginTop}>
                    <Label style={[styles.marginTop, styles.bold, styles.primaryColor]}>Quantidade em estoque ({this.state.unidade})</Label>
                    <TextInput
                        placeholder='Ex: 5'
                        keyboardType="numeric"
                        onFocus={() => this.setState({ input_preco_color: "#19197f" })}
                        onBlur={() => this.setState({ input_preco_color: "grey" })}
                        underlineColorAndroid={this.state.input_preco_color}
                        value={this.state.quantidade}
                        onChangeText={(texto) => this.setState({ quantidade: texto })}

                    />

                </View>

                <View style={[styles.marginTop, styles.center, styles.bigMarginTop]}>
                    <Button onPress={() => { this.atualizar() }} iconRight rounded success style={styles.rounded}>
                        <Text>ATUALIZAR</Text>
                        <Icon type="FontAwesome5" name="check-circle"></Icon>
                    </Button>
                </View>

            </Container>
        )
    }
}


const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(Detalhes);