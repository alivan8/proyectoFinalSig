import React, { Component } from 'react'
import { Consumer } from '../../Modelo/VarGlobales'
import { View } from 'react-native'
import {
    Container, Footer, Button, Text, Icon, Header, Left, Right, Body
    , ListItem, Item, Input, List, FooterTab
} from 'native-base'
import Estilo from '../Styles/Styles'
import MapView, { Marker } from 'react-native-maps';

export default class GuardarUbicacion extends Component {
    constructor() {
        super()
        this.state = {
            coordenadas: []
        }
    }

    componentWillMount(){
        
    }

    MostrarMarker() {
        return this.state.coordenadas.map(val => {
            return (
                <Marker
                    coordinate={val.coordinate}
                />
            )
        })
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <Container style={{ paddingTop: 20 }}>
                        <Header style={{ backgroundColor: 'white' }}>
                            <Left>
                                <Button transparent>
                                    <Icon style={{ color: 'black' }} name="menu" />
                                </Button>
                            </Left>
                            <Right><Text> Santa cruz de la sierra </Text></Right>
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
                                    onPress={(e) => { this.setState({ coordenadas: [{ coordinate: e.nativeEvent.coordinate }] }) }}
                                >
                                    {this.MostrarMarker()}
                                </MapView>
                            </View>
                        </View>
                        <Footer>
                            <FooterTab>
                                <Button vertical 
                                    onPress={()=>{ 
                                        if(this.props.navigation.state.params.Tipo==='Hogar'){
                                            value.state.GuardarUbicacionUserHogar(this.state.coordenadas[0].coordinate, this.props.navigation) 
                                        }else{
                                            value.state.GuardarUbicacionUserTrabajo(this.state.coordenadas[0].coordinate, this.props.navigation) 
                                        }
                                    }} 
                                >
                                    <Icon name="md-compass" />
                                    <Text> Guardar </Text>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </Container>
                )}
            </Consumer>
        )
    }
}

GuardarUbicacion.contextType = Consumer;