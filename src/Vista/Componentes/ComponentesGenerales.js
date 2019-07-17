import React, { Component } from 'react'
import { View, ScrollView, ImageBackground } from 'react-native'
import { FooterTab, Button, Text, Icon, Container, Content, List, ListItem, Thumbnail, Left, Body, Right } from 'native-base';
import { Consumer } from '../../Modelo/VarGlobales';
import MapView from 'react-native-maps';
import Estilo from '../Styles/Styles';
import { NavigationActions, StackActions } from 'react-navigation';

export class PiePagina extends Component {

  render() {
    return (
      <FooterTab style={{ backgroundColor: '#3C3C3C' }}>
        <Button vertical
          onPress={() => {
            //this.props.Navegador.navigate('Home')
            this.props.Navegador.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
              })
              //NavigationActions.navigate({ routeName: "Home" })
            );
          }}
        >
          <Icon style={{ color: '#808080' }} name="ios-more" />
          <Text style={{ color: '#808080' }}>Direcciones</Text>
        </Button>
        <Button vertical
          onPress={() => {
            //this.props.Navegador.navigate('Mapa', { Destino: [] })
            this.props.Navegador.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Mapa", params: { Destino: [] } })],
              })
              //NavigationActions.navigate({ routeName: "Mapa", params: { Destino: [] } })
            );
          }}
        >
          <Icon style={{ color: '#808080' }} active name="md-map" />
          <Text style={{ color: '#808080' }}>Mapa</Text>
        </Button>
        <Button vertical
          onPress={() => {
            //this.props.Navegador.navigate('Lineas')
            this.props.Navegador.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Lineas' })],
              })
              //NavigationActions.navigate({ routeName: "Lineas" })
            );
          }}
        >
          <Icon style={{ color: '#808080' }} name="md-git-merge" />
          <Text style={{ color: '#808080' }}>Lineas</Text>
        </Button>
      </FooterTab>
    )
  }
}


export class SideBar extends Component {


  CabeceraSideBar(val) {
    if (val.esTemporal === 'S') {
      return (
        <Container style={{ backgroundColor: 'transparent', height: 170, marginLeft: 20 }}>
          <View style={{ marginTop: 30 }}>
            <Thumbnail source={require('../../Imagen/SinAvatar.jpg')} />
            <ListItem itemHeader
              onPress={() => {
                val.ChangeLogin("S")
              }}
            >
              <Text style={{ fontSize: 18 }}> Iniciar Sesion </Text>
            </ListItem>
          </View>
        </Container>
      )
    } else {
      return (
        <Container style={{ backgroundColor: 'transparent', height: 170, marginLeft: 20 }}>
          <View style={{ marginTop: 30 }}>
            <Thumbnail source={{ uri: val.Datos.Imagen }} />
            <ListItem itemHeader onPress={() => { console.log("Mensaje") }}>
              <Text style={{ fontSize: 18 }}> {val.Datos.Nombre} {val.Datos.Apellido} </Text>
            </ListItem>
          </View>
        </Container>
      )
    }
  }

  Cuerpo(val) {
    if (val.esTemporal === 'S') {
      return (
        <ScrollView>
          <ListItem icon onPress={() => { console.log("Mensaje") }} >
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-git-branch" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Difunde</Text></Body>
          </ListItem>
          <ListItem icon onPress={() => { console.log("Mensaje") }}>
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-settings" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Configuracion</Text></Body>
          </ListItem>
          <ListItem icon onPress={() => { console.log("Mensaje") }}>
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-chatbubbles" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Comentarios</Text></Body>
          </ListItem>
          <ListItem icon onPress={() => { console.log("Mensaje") }}>
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-construct" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>SOPORTE</Text></Body>
          </ListItem>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView>
          <ListItem icon onPress={() => { console.log(value) }} >
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-git-branch" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Difunde</Text></Body>
          </ListItem>
          <ListItem icon onPress={() => { console.log("Mensaje") }}>
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-settings" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Configuracion</Text></Body>
          </ListItem>
          <ListItem icon onPress={() => { console.log("Mensaje") }}>
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-chatbubbles" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Comentarios</Text></Body>
          </ListItem>
          <ListItem icon 
            onPress={() => { 
              val.GuardarDatosChofer(null);
              val.ChangeChofer(null,null,'S')
            }}
          >
            <Left><Icon style={{ color: '#E3E3E3' }} active name="md-power" /></Left>
            <Body><Text style={{ fontSize: 14, color: '#E3E3E3' }}>Cerrar session</Text></Body>
          </ListItem>
        </ScrollView>
      )
    }

  }

  render() {
    return (
      <Consumer>
        {value => (
          <Container>
            <Content style={{ backgroundColor: '#3C3C3C' }}>
              <View>
                <ImageBackground
                  style={{ flex: 1 }}
                  resizeMode='cover'
                  source={require('../../Imagen/SideBar.jpg')}
                >
                  {this.CabeceraSideBar(value.state)}
                </ImageBackground>
                <Container style={{ backgroundColor: 'transparent' }}>
                  <Content>
                    <List>
                      { this.Cuerpo(value.state) }
                    </List>
                  </Content>
                </Container>
              </View>
            </Content>
          </Container>
        )}
      </Consumer>
    )
  }
}


SideBar.contextType = Consumer;
