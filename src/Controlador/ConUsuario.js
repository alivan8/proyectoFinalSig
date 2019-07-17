import * as firebase from 'firebase'
import { Alert } from 'react-native';

const ConUsuario = {
    ObtenerLlaveTemporal() {
        let Consulta = firebase.database().ref('gntUsuario/Temporal').push()
        return Consulta.key
    },
    GuardarUbicacionUserHogar(e, coordenadas, nav) {
        Alert.alert(
            'Mensaje',
            '¿Desea guardar los cambios de la ubicacion de su hogar?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId).update({
                            Hogar: coordenadas
                        }).then(()=>{ nav.navigate('Home') })
                    }
                },
            ],
            { cancelable: false },
        )
    },
    GuardarUbicacionUserTrabajo(e, coordenadas, nav) {
        Alert.alert(
            'Mensaje',
            '¿Desea guardar los cambios de la ubicacion de su Trabajo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId).update({
                            Trabajo: coordenadas
                        }).then(()=>{ nav.navigate('Home') })
                    }
                },
            ],
            { cancelable: false },
        )
    },
    ObtenerUbicacionHogar(e){
        return firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId+'/Hogar').once('value').then( snapshot=>{
            //console.log(snapshot.val())
            return snapshot.val()
        } )
    },
    ObtenerUbicacionTrabajo(e){
        return firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId+'/Trabajo').once('value').then( snapshot=>{
            return snapshot.val()
        } )
    },
    GuardarFavoritos(e, LineaFav){
        firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId+'/Favoritos/'+LineaFav).update({
            Linea: LineaFav
        }).then(()=>{ Alert.alert("Se guardo a favoritos") })
    },
    ListaFavoritos(e, e2){
        firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId+'/Favoritos').on( 'value', snapshot=>{
            if(snapshot.val()!==null){
                console.log(Object.keys(snapshot.val()))
                e2.setState({ ListFav: Object.keys(snapshot.val()) })
            }else{
                e2.setState({ ListFav: [] })
            }
        } )
    },
    QuitarEscuchaListaFav(){
        firebase.database().ref('gntUsuario/Temporal/').off()
    },
    QuitarListaFavoritos(e,LineaFav){
        firebase.database().ref('gntUsuario/Temporal/' + e.state.UserId+'/Favoritos/'+LineaFav).update({
            Linea: null
        }).then(()=>{ Alert.alert("Se eleminados de favoritos a favoritos") })
    }

}

export default ConUsuario;