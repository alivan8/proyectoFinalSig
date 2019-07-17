import * as firebase from 'firebase'


const ConLinea = {
    ObtenerLineas(e) {
        firebase.database().ref('gntDirectorioLineas').once('value').then(snapshot => {
            let array = []
            if (snapshot.val() !== null) {
                array = Object.values(snapshot.val())
            }
            e.setState({ ListaLineas: array })
        })
    },
    ObtenerRutaLinea(Linea) {
        return firebase.database().ref('gntRuta/' + Linea + '/Ruta').once('value').then(snapshot => {
            if (snapshot.val() !== null) {
                return snapshot.val()
            } else {
                return []
            }
        })
    },
    ObtenerRutasCercanas() {
        return firebase.database().ref('gntRuta').once('value').then(snapshot => {
            if (snapshot.val() !== null) {
                let result = [Object.values(snapshot.val()), Object.keys(snapshot.val())]
                return result
            } else {
                return []
            }
        })
    },
    LoguearChofer(Linea, CI) {
        return firebase.database().ref('gntDirectorioChofer/' + Linea).orderByChild('CI').equalTo(CI).once('value').then(
            snapshot => {
                if (snapshot.val() !== null) {
                    return Object.keys(snapshot.val())[0]
                } else {
                    return 0
                }

            }
        )
    },
    ModificarPosicion(Llave, Linea, pos) {
        firebase.database().ref('gntDirectorioChofer/' + Linea + '/' + Llave).update({
            Posicion: pos
        })
    },
    ObtenerDatosChofer(IdChofer, Linea) {
        return firebase.database().ref('gntDirectorioChofer/' + Linea + '/' + IdChofer).once('value').then(snapshot => {
            if (snapshot.val() !== null) {
                return snapshot.val();
            } else {
                return null;
            }
        })
    }
}

export default ConLinea;