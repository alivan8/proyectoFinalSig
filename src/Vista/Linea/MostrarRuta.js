import React, { Component } from 'react'
import { Consumer } from '../../Modelo/VarGlobales'
import { View } from 'react-native'
import {
  Container, Footer, Button, Text, Icon, Header, Left, Right, Body
  , ListItem, Item, Input, List, FooterTab
} from 'native-base'
import { PiePagina } from '../Componentes/ComponentesGenerales'
import Estilo from '../Styles/Styles'
import MapView, { Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


export default class MostrarRuta extends Component {
  constructor() {
    super()
    this.state = {
      Ruta: []
    }
  }


  componentWillMount() {
    //console.log(this.props.navigation.state.params.Linea)
    this.context.state.ObtenerRutaLinea(this.props.navigation.state.params.Linea).then(val => {
      this.setState({ Ruta: val })
      //console.log(val.map( value=>{  return { latitude: value.latitude*1, longitude: value.latitude*1 }  } ))
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
                <Button transparent onPress={() => { value.state.openDrawer() }} >
                  <Icon style={{ color: 'white' }} name="menu" />
                </Button>
              </Left>
              <Right><Text style={{color: 'white'}} > Santa cruz de la sierra </Text></Right>
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
                >

                  {this.MostrarRuta()}

                </MapView>
              </View>
            </View>
            <Footer style={{ backgroundColor: 'white', elevation: 5 }}>
              <PiePagina Navegador={this.props.navigation} />
            </Footer>
          </Container>
        )}
      </Consumer>
    )
  }
}

MostrarRuta.contextType = Consumer;