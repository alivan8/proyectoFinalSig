import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Consumer } from '../Modelo/VarGlobales'
import {
    Container, Footer, Button, Text, Icon, Header, Left, Right, Body, Tab, Tabs
    , ListItem, Item, Input, List
} from 'native-base'
import MapView, { Marker, Polyline } from 'react-native-maps';
import Estilo from './Styles/Styles'
import { PiePagina } from './Componentes/ComponentesGenerales'


export default class Mapa extends Component {
    constructor() {
        super()
        this.state = {
            Salida: [],
            Destino: [],
            Pos: [],
            //Variables para obtener los nombres de las rutas
            NombAux: [],
            PosNomb: [],
            Ruta: []

        }
    }


    componentWillMount() {
        if (this.props.navigation.state.params.Destino.length === 0) {
            navigator.geolocation.getCurrentPosition(val => {
                console.log("Observador aqui")
                this.setState({ Pos: [{ latitude: val.coords.latitude, longitude: val.coords.longitude }] })
                this.ObtenerNombresRutasCercanas()
            }, err => { console.log("Sucedio un error en mapa.js") }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 })

        } else {
            console.log(this.props.navigation.state.params.Destino)
            this.setState({ Pos: [{ latitude: this.props.navigation.state.params.Destino[0].latitude, longitude: this.props.navigation.state.params.Destino[0].longitude }] })
            this.ObtenerNombresRutasCercanas()
        }
        //this.setState({ Destino: this.props.navigation.state.params.Destino })
    }


    ObtenerNombresRutasCercanas() {
        this.context.state.ObtenerRutasCercanas().then(val => {
            //console.log(val[0])  Posee las coordenadas, val[1] posee los nombres
            console.log(this.state.Pos[0].latitude, 'GUILLE MIRA ESTOOOOO')
            let RutasCercanas = []
            val[0].map((val, index) => {
                //console.log(index)
                //console.log(val.Ruta)
                //console.log(this.state.Pos[0].longitude)
                val.Ruta.forEach(e => {
                    let distancia = this.context.state.calculateDistance(this.state.Pos[0].latitude, this.state.Pos[0].longitude, e.latitude, e.longitude)
                    if (distancia <= 400) { RutasCercanas.push(index) }
                })
            })

            setTimeout(() => {
                let RutasCercanasAux = RutasCercanas.filter(function (item, index, array) {
                    return array.indexOf(item) === index;
                })
                this.setState({
                    NombAux: val[1],
                    PosNomb: RutasCercanasAux
                })
                console.log(val[1])
                console.log(RutasCercanasAux)
            }, 1500);
        })
    }

    LineasCercanasLista() {
        return this.state.PosNomb.map(val => {
            return (
                <ListItem icon
                    onPress={() => {
                        this.context.state.ObtenerRutaLinea(this.state.NombAux[val]).then(val2 => {
                            this.setState({ Ruta: val2 })
                        })

                    }}
                >
                    <Left><Icon style={{ color: '#DAACAC' }} active name="ios-bus" /></Left>
                    <Body><Text> {this.state.NombAux[val]} </Text></Body>
                </ListItem>
            )
        })
    }

    MostrarRuta() {
        let elementos = this.state.Ruta.length
        if (elementos !== 0) {
            console.log(this.state.Ruta[0])
            console.log(this.state.Ruta[elementos - 1])
            return (
                <Polyline
                    coordinates={this.state.Ruta}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={6}
                />
            )
        } else {
            return null
        }
    }


    MarkerPos() {
        if (this.state.Pos.length !== 0) {
            return this.state.Pos.map(val => {
                return (
                    <Marker
                        onDragEnd={(e) => { this.setState({ Pos: [{ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude }] }) }}
                        draggable
                        coordinate={val}
                    >
                        <Image source={require('../Imagen/MarkerUser.png')} style={{ height: 45, width: 45, }} />
                    </Marker>
                )
            })
        }

    }

    MarkerDestino() {
        return this.state.Destino.map(val => {
            return (
                <Marker
                    draggable
                    coordinate={val}
                />
            )
        })
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <Container>
                        <Header style={{ backgroundColor: '#2F2F2F' }}>
                            <Left>
                                <Button transparent onPress={() => { value.state.openDrawer() }} >
                                    <Icon style={{ color: 'white' }} name="menu" />
                                </Button>
                            </Left>
                            <Right><Text style={{color: 'white'}}> Santa cruz de la sierra </Text></Right>
                        </Header>
                        <View style={Estilo.ContainerColum}>
                            <View style={{ height: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <View style={Estilo.ContainerMap}>
                                    <MapView style={Estilo.EstiloMap}
                                        initialRegion={{
                                            latitude: -17.79104884,
                                            longitude: -63.17754828,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        showsUserLocation={true}
                                        onPress={() => { console.log("Pruebsa") }}
                                    >
                                        {this.MarkerDestino()}
                                        {this.MarkerPos()}
                                        {this.MostrarRuta()}
                                    </MapView>
                                </View>
                            </View>
                            <View style={{ height: '50%', backgroundColor: 'white' }}>
                                <Tabs>
                                    <Tab heading="Lineas cercanas" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>Lineas</Text>
                                            </ListItem>
                                            {this.LineasCercanasLista()}
                                        </List>
                                    </Tab>
                                    <Tab heading="Paradas cercanas" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>Paradas</Text>
                                            </ListItem>
                                        </List>
                                    </Tab>
                                </Tabs>
                            </View>
                        </View>

                        <Footer>
                            <PiePagina Navegador={this.props.navigation} />
                        </Footer>
                    </Container>
                )}
            </Consumer>
        )
    }

}
Mapa.contextType = Consumer;