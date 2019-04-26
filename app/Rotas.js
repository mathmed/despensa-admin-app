
/* 
  * Classe de controle das rotas do aplicativo
  * Desenvolvido por Mateus Medeiros
  * https://github.com/mathmed
  * Última atualização no arquivo: 26/04/2019
  * Projeto utilizando o framework React Native
  * Software desenvolvido para disciplina de Engenharia de Software II / UFRN
*/

/* importações necessárias */
import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login.js';


export default class Rotas extends Component{

	render(){
		return(
			/* definindo as cenas da aplicação */
			<Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ color: '#ff5400' }}>
				<Scene key = 'root'>
					<Scene key = 'login' component = {Login} hideNavBar />
				</Scene>
			</Router>
		)
	}
}
