import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'
import { Consumer } from '../Modelo/VarGlobales'
import {
    Container, Footer, Button, Text, Icon, Header, Left, Right, Body, Tab, Tabs, Content, Separator
    , ListItem, Item, Input, List
} from 'native-base'
import Estilo from './Styles/Styles'
import { PiePagina } from './Componentes/ComponentesGenerales'


export default class Lineas extends Component {
    constructor() {
        super()
        this.state = {
            ListaLineas: [],
            ListFav: []
        }
    }

    componentWillMount() {
        this.context.state.ObtenerLineas(this);
        this.context.state.ListaFavoritos(this)
    }

    ListaLineas() {
        return this.state.ListaLineas.map(val => {
            return (
                <ListItem icon onPress={() => { this.props.navigation.navigate('MostrarRuta', { Linea: val.Linea }) }} >
                    <Left><Icon style={{ color: '#DAACAC' }} active name="ios-bus" /></Left>
                    <Body><Text> {val.Linea} </Text></Body>
                    <Right>
                        <Button transparent onPress={() => { this.context.state.GuardarFavoritos(val.Linea) }} >
                            <Icon style={{ color: 'black' }} active name="md-more" />
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }

    ListaFav() {
        return this.state.ListFav.map(val => {
            return (
                <ListItem icon onPress={() => { this.props.navigation.navigate('MostrarRuta', { Linea: val }) }} >
                    <Left><Icon style={{ color: '#DAACAC' }} active name="ios-bus" /></Left>
                    <Body><Text> {val} </Text></Body>
                    <Right>
                        <Button transparent onPress={() => { this.context.state.QuitarListaFavoritos(val) }} >
                            <Icon style={{ color: 'black' }} active name="md-close-circle" />
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }

    componentWillUnmount(){
        this.context.state.QuitarEscuchaListaFav()
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
                        <Container style={{backgroundColor: 'transparent' }}>
                            <Header searchBar rounded style={{ backgroundColor: 'white' }}>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="Search" />
                                    <Icon name="ios-people" />
                                </Item>
                                <Button transparent>
                                    <Text>Search</Text>
                                </Button>
                            </Header>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'stretch'
                            }}>
                                <Tabs>
                                    <Tab heading="Todos" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <Content>
                                            <Separator bordered>
                                                <Text>Recientes</Text>
                                            </Separator>
                                            <ListItem icon onPress={() => { console.log("Dio") }} >
                                                <Left><Icon style={{ color: '#DAACAC' }} active name="md-subway" /></Left>
                                                <Body><Text>Linea x</Text></Body>
                                            </ListItem>
                                            <Separator bordered>
                                                <Text>Santa cruz de la sierra - rutas</Text>
                                            </Separator>
                                            {this.ListaLineas()}
                                        </Content>
                                    </Tab>
                                    <Tab heading="Favoritos" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <Content>
                                            <Separator bordered>
                                                <Text>Favoritos</Text>
                                            </Separator>
                                            {this.ListaFav()}
                                        </Content>
                                    </Tab>
                                </Tabs>
                            </View>
                            <Footer>
                                <PiePagina Navegador={this.props.navigation} />
                            </Footer>
                        </Container>
                    </ImageBackground>
                )}
            </Consumer>
        )
    }
}

Lineas.contextType = Consumer;