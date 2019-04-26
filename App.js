
/* 
  * Classe inicial do Frontend da aplicação DespensaAdmin
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 26/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/


/* importações necessárias */
import React, { Component } from 'react';
import Rotas from './app/Rotas.js';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './app/reducers';
import firebase from 'firebase';
import {Root} from "native-base";
import {config} from "./config.js"; 


export default class App extends Component{

  /* Configurando o firebase */
  componentWillMount(){
    try{

      if(!firebase.apps.lenght) firebase.initializeApp(config);
      else firebase.app()
      
    }catch(err){}
  }

  render(){
    return(
      <Root>
        <Provider store = {createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Rotas></Rotas>
        </Provider>
      </Root>
    );
  }
}

