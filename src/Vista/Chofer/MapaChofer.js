import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, Icon, Header, Left, Right, Body } from 'native-base';
import MapView, { Polyline } from 'react-native-maps';
import { Consumer } from '../../Modelo/VarGlobales';
import Estilo from '../Styles/Styles';

export default class MapaChofer extends Component {
	constructor() {
		super()
		this.state = {
			Ruta: [],
			Pos: []
		}
	}


	componentWillMount() {
		this.props.State.ObtenerRutaLinea(this.props.State.Linea).then(val => {
			this.setState({ Ruta: val })
			//console.log(val.map( value=>{  return { latitude: value.latitude*1, longitude: value.latitude*1 }  } ))
		})
		this.watchID = navigator.geolocation.watchPosition(
			(val) => {
				this.props.State.ModificarPosicion(this.props.State.IdChofer, this.props.State.Linea, { latitude: val.coords.latitude, longitude: val.coords.longitude });
			}, err => { }, {
				enableHighAccuracy: true,
				timeout: 2000,
				maximumAge: 1000,
				distanceFilter: 0
			}
		)
	}

	componentWillUnmount(){
		navigator.geolocation.watchPosition(this.watchID);
	}


	MostrarRuta() {
		let elementos = this.state.Ruta.length
		if (elementos !== 0) {
			console.log("this.state.Ruta[0]")
			console.log(this.state.Ruta[elementos - 1])
			return (
				<Polyline
					coordinates={this.state.Ruta}
					strokeColor="#000"
					strokeWidth={6}
				/>
			)
		} else {
			return null
		}
	}


	render() {
		return (
			<Consumer>
				{value => (
					<Container>
						<Header style={{ backgroundColor: '#2F2F2F' }}>
							<Left>
								<Button transparent
									onPress={() => { value.state.openDrawer() }}
								>
									<Icon style={{ color: 'white' }} name="menu" />
								</Button>
							</Left>
							<Body><Text style={{ color: 'white' }}> {value.state.Linea} </Text></Body>
							<Right><Text style={{ color: 'white' }}> Santa cruz de la sierra </Text></Right>
						</Header>
						<View style={Estilo.ContainerColum}>
							<View style={Estilo.ContainerMap}>
								<MapView style={Estilo.EstiloMap}
									initialRegion={{
										latitude: -17.79104884,
										longitude: -63.17754828,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421,
									}}
									showsUserLocation={true}
									followsUserLocation={true}
								>
									{this.MostrarRuta()}

								</MapView>
							</View>
						</View>
					</Container>
				)}
			</Consumer>
		)
	}
}

MapaChofer.contextType = Consumer;