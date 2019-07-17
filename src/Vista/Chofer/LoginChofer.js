import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
	Container, Button, Text, Icon, Header, Left, Right, Body
	, Item, Input, Form, Label, Title, Content
} from 'native-base';
import { Consumer } from '../../Modelo/VarGlobales';


export default class LoginChofer extends Component {
	constructor() {
		super()
		this.state = {
			Linea: '',
			CI: '',
			IDuser: ''
		}
	}

	render() {
		return (
			<Consumer>
				{value => (
					<Container>
						<Header style={{ backgroundColor: '#2F2F2F' }}>
							<Left>
								<Button transparent onPress={() => { value.state.ChangeLogin("N") }}>
									<Icon name='arrow-back' />
								</Button>
							</Left>
							<Body>
								<Title style={{ fontSize: 15 }}>Conectar y sincronizar</Title>
							</Body>
							<Right></Right>
						</Header>
						<Content>
							<Image
								style={{ width: '100%', height: '20%' }}
								source={require('../../Imagen/LoginF.png')}
							/>
							<Container style={{ paddingLeft: 20, paddingRight: 15, paddingTop: 30 }}>
								<Text style={{ fontSize: 20, color: '#8DB5FF', fontWeight: 'bold' }}>Inicia tu cuenta para poder iniciar con la sincronizacion</Text>
								<Text style={{ fontSize: 12, paddingTop: 10 }}>
									Al conectarte, tu posicion actual se enviara a la base de datos de la empresa
									donde se registrara y visualizara tanto para la administracion, como para los
									usuarios que usen la aplicacion MiBus.
								</Text>
								<View>
									<Form>
										<Item floatingLabel>
											<Label>Linea</Label>
											<Input onChangeText={(e) => { this.setState({ Linea: e }) }} />
										</Item>
										<Item floatingLabel>
											<Label>Identificador</Label>
											<Input onChangeText={(e) => { this.setState({ CI: e }) }} />
										</Item>
									</Form>
								</View>
								<View style={{ paddingTop: 10 }}>
									<Button block style={{ backgroundColor: '#8DB5FF' }}
										onPress={() => {
											console.log(this.state.Linea, this.state.CI)
											value.state.LoguearChofer(this.state.Linea, this.state.CI).then(val => {
												if (val !== 0) {
													value.state.ObtenerDatosChofer(val,this.state.Linea).then(
														result=>{
															value.state.GuardarDatosChofer(result);
															value.state.ChangeChofer(val, this.state.Linea, 'N');
														}
													)
													
												} else {
													Alert.alert("Datos ingresados incorrectos");
												}
											})
										}}
									>
										<Body><Text>Iniciar sincronizacion</Text></Body>
									</Button>
								</View>
							</Container>
						</Content>
					</Container>
				)}
			</Consumer>
		)
	}
}

LoginChofer.contextType = Consumer;