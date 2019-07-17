import React, { Component } from 'react';
import { View, ImageBackground, ScrollView } from 'react-native'
import {
	Container, Footer, Button, Text, Icon, Header, Left, Right, Body
	, ListItem, Item, List
} from 'native-base'
import { Consumer } from '../Modelo/VarGlobales'
import Estilo from './Styles/Styles';
import { PiePagina } from './Componentes/ComponentesGenerales'
import GooglePlacesInput from './google'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			Email: ''
		}
	}



	render() {
		return (
			<Consumer>
				{value => (

					<ImageBackground
						style={Estilo.imgBackground}
						resizeMode='cover'
						source={require('../Imagen/FondoBus.jpg')}
					>
						<Container style={{ backgroundColor: 'transparent' }}>
							<Header transparent>
								<Left>
									<Button onPress={() => { value.state.openDrawer() }} transparent>
										<Icon name="menu" />
									</Button>
								</Left>
								<Right><Text style={{ color: 'white' }}> Santa cruz de la sierra </Text></Right>
							</Header>
							<View style={Estilo.ContainerColum}>
								<View style={{ height: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
									<View style={{ backgroundColor: 'white', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10, justifyContent: 'flex-end', alignItems: 'center', borderRadius: 25, paddingHorizontal: 16, width: '80%' }}>
										<Item>
											<ScrollView>
												<GooglePlacesInput
													Obtener={(e) => { this.props.navigation.navigate('Mapa', { Destino: [e] }); console.log(e, 'Datos obtenidos :v') }}
												/>
											</ScrollView>
										</Item>
									</View>
								</View>
								<View style={{ height: '50%', backgroundColor: 'white' }}>
									<List>
										<ListItem itemDivider>
											<Text>Comunidad de MiBus</Text>
										</ListItem>
										<ListItem>
											<Text>Ayuda a mejorar el transporte publico</Text>
										</ListItem>
										<ListItem itemDivider>
											<Text>Favoritos</Text>
										</ListItem>
										<ListItem icon
											onPress={() => { value.state.ObtenerUbicacionHogar().then(val => { this.props.navigation.navigate('Mapa', { Destino: [val] }) }) }}
										>
											<Left><Icon active name="home" /></Left>
											<Body><Text>Hogar</Text></Body>
											<Right>
												<Button transparent onPress={() => { this.props.navigation.navigate('GuardarUbicacion', { Tipo: 'Hogar' }) }} >
													<Text style={{ color: 'blue', fontSize: 10 }} >Modificar</Text>
												</Button>
											</Right>
										</ListItem>
										<ListItem icon
											onPress={() => { value.state.ObtenerUbicacionTrabajo().then(val => { this.props.navigation.navigate('Mapa', { Destino: [val] }) }) }}
										>
											<Left><Icon active name="ios-briefcase" /></Left>
											<Body><Text>Trabajo</Text></Body>
											<Right>
												<Button transparent onPress={() => { this.props.navigation.navigate('GuardarUbicacion', { Tipo: 'Trabajo' }) }} >
													<Text style={{ color: 'blue', fontSize: 10 }} >Modificar</Text>
												</Button>
											</Right>
										</ListItem>
									</List>
								</View>
							</View>
							<Footer style={{ backgroundColor: 'white'}}>
								<PiePagina Navegador={this.props.navigation} />
							</Footer>
						</Container>
					</ImageBackground>

				)
				}
			</Consumer>
		)
	}
}
Home.contextType = Consumer;