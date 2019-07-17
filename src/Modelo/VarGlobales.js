import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, View, Text } from 'react-native';
import { Drawer } from 'native-base';
import * as firebase from 'firebase';
import firebaseConfig from './firebase';
import { SideBar } from '../Vista/Componentes/ComponentesGenerales';
import Estilo from '../Vista/Styles/Styles';

firebase.initializeApp(firebaseConfig);


//Importacion de controladores
import ConLinea from '../Controlador/ConLinea';
import ConUsuario from '../Controlador/ConUsuario';
import ConAux from '../Controlador/ConAux';

//Extras
import LoginChofer from '../Vista/Chofer/LoginChofer';
import MapaChofer from '../Vista/Chofer/MapaChofer';

console.disableYellowBox = true;

export class Provider extends Component {
  state = {
    UserId: null,
    esTemporal: 'S',
    ClickLogin: 'N',           //Parametro para cambiar ventana para el login
    IdChofer: null,
    Linea: null,
    Datos: null,                //Almacena los datos del chofer Nota: Observacion G
    //Funciones de la Lineas de micros
    ObtenerLineas: (e) => { ConLinea.ObtenerLineas(e) },
    ObtenerRutaLinea: (Linea) => { return ConLinea.ObtenerRutaLinea(Linea) },
    ObtenerRutasCercanas: () => { return ConLinea.ObtenerRutasCercanas() },
    LoguearChofer: (Linea, CI) => { return ConLinea.LoguearChofer(Linea, CI) },
    ModificarPosicion: (Llave, Linea, Pos) => { ConLinea.ModificarPosicion(Llave, Linea, Pos) },
    ChangeChofer: (e, L, T) => { this.setState({ IdChofer: e, Linea: L, esTemporal: T }) },
    ObtenerDatosChofer: (Id, Nlinea)=>{ return ConLinea.ObtenerDatosChofer(Id,Nlinea ) },
    GuardarDatosChofer: (e)=>{ this.setState({ Datos: e }) },
    //Funciones para usuarios
    GuardarUbicacionUserHogar: (coordenadas, nav) => { ConUsuario.GuardarUbicacionUserHogar(this, coordenadas, nav) },
    GuardarUbicacionUserTrabajo: (coordenadas, nav) => { ConUsuario.GuardarUbicacionUserTrabajo(this, coordenadas, nav) },
    ObtenerUbicacionHogar: () => { return ConUsuario.ObtenerUbicacionHogar(this) },
    ObtenerUbicacionTrabajo: () => { return ConUsuario.ObtenerUbicacionTrabajo(this) },
    GuardarFavoritos: (LlaveFav) => { ConUsuario.GuardarFavoritos(this, LlaveFav) },
    ListaFavoritos: (e) => { ConUsuario.ListaFavoritos(this, e) },
    QuitarEscuchaListaFav: () => { ConUsuario.QuitarEscuchaListaFav() },
    QuitarListaFavoritos: (e) => { ConUsuario.QuitarListaFavoritos(this, e) },
    //Funciones auxiliares
    calculateDistance: (l1, lo1, l2, lo2) => { return ConAux.calculateDistance(l1, lo1, l2, lo2) },
    openDrawer: () => { this.openDrawer() },
    ChangeLogin: (e) => { this.setState({ ClickLogin: e }) }
  }

  componentWillMount() {
    this.ObtenerDatoLoca()
  }

  async ObtenerDatoLoca() {
    try {
      await AsyncStorage.getItem('idMiBus').then(value => {
        if (value !== null) {
          this.setState({ UserId: value })
        } else {
          //Generar llave temporal
          let LlaveTemporal = ConUsuario.ObtenerLlaveTemporal()
          this.GuardarDatoLoca(LlaveTemporal)
        }
      })
    } catch (error) {
      console.log("error")
    }
  }

  async GuardarDatoLoca(llave) {
    try {
      await AsyncStorage.setItem('idMiBus', llave).then(() => { this.setState({ UserId: llave }) })
    } catch (error) {
      console.log("Sucedio un error guillermo ")
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  render() {
    if (this.state.UserId !== null) {
      if (this.state.ClickLogin === 'N') {
        //En aqui entra Usuario sin registrarse
        return (
          <VarGlobales.Provider
            value={{
              state: this.state
            }}
          >
            <Drawer
              ref={(ref) => { this._drawer = ref; }}
              content={<SideBar navigator={this._navigator} />}
              onClose={() => this.closeDrawer()}
            >
              {this.props.children}
            </Drawer>
          </VarGlobales.Provider>
        )
      } else {
        //En aqui entra si dio click en login del sidebar. Se visualizara el Login para entrar
        if (this.state.IdChofer === null) {
          //En aqui entra si no se ha logueado. En su Header de aqui, tiene para volver a Usuario Sin registrar
          return (
            <VarGlobales.Provider
              value={{
                state: this.state
              }}
            >
              < LoginChofer />
            </VarGlobales.Provider>
          )
        } else {
          //EN aqui entra si esta logueado. Para salir hay que poner null IdChofer,Linea y Datos. esTempora cambio a N
          return (                    //El cambio de EsTemporal se hace con changeChofer
            <VarGlobales.Provider
              value={{
                state: this.state
              }}
            >
              <Drawer
                ref={(ref) => { this._drawer = ref; }}
                content={<SideBar navigator={this._navigator} />}
                onClose={() => this.closeDrawer()}
              >
                <MapaChofer State={ this.state } />
              </Drawer>
            </VarGlobales.Provider>
          )
        }

      }
    } else {
      return (
        <View style={Estilo.container} >
          <ActivityIndicator size="large" color="#808080" />
          <Text> Cargando... </Text>
        </View>)
    }

  }

}

export const VarGlobales = React.createContext();
export const Consumer = VarGlobales.Consumer