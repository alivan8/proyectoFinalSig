import { StyleSheet } from 'react-native'

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerSinFondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSinFlex: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  containerArriba: {
    backgroundColor: 'red',
    flex: 2,
    flexDirection: 'row',
  },
  ContainerMap: {
    height: '100%',  //100%
    width: '100%',
    flex: 2,
    flexDirection: 'row'
  },
  EstiloMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',  //80%
    width: '100%'
  },
  ContainerMapAbajo: {
    height: '20%',
    width: '100%'
  },
  ContainerAbajoComponente: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start'
  },
  ComponenteImagen: {
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start'
  },
  ComponenteimgBackground: {
    width: '100%',
    height: '60%',
    flex: 1
  },
  ComponenteImagenCentro: {
    width: '45%',
    height: '85%',
    borderRadius: 30,
  },
  containerAbajo: {
    flex: 2,
    //flexDirection:'column'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  EstiloBotonTexto: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  },
  EstiloBoton: {
    width: 120,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#757575',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,           //posicionar el texto respecto a x
    paddingVertical: 5               //posicionar el texto respecto a y
  },
  InputTexto: {
    width: 300,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#757575',
    marginVertical: 8,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 5               //posicionar el texto respecto a y
  },
  ImagenCentro: {
    width: 140,
    height: 140,
    borderRadius: 15,
  },
  Titulo1: {
    fontSize: 25,
    textAlign: 'center'
  },
  Texto1: {
    fontSize: 17,
  },
  ContainerColum: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  ContainerArriba2: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start'
  },
  BuscadorBox: {
    width: '80%',
    height: 35,
    borderRadius: 25,
    backgroundColor: '#757575',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,           //posicionar el texto respecto a x
    paddingVertical: 5               //posicionar el texto respecto a y
  }

});

export default Estilo