
const ConAux = {
    calculateDistance(lat1, lon1, lat2, lon2) {

        // http://www.movable-type.co.uk/scripts/latlong.html
        //let lat1 = -17.823652;
        //let lon1 = -63.131200;

        //let lat2 = -17.822988;
        //let lon2 = -63.129902;

        let R = 6371e3; // Radio de la tierra
        let φ1 = lat1 * (Math.PI / 180);
        let φ2 = lat2 * (Math.PI / 180);
        let Δφ = (lat2 - lat1) * (Math.PI / 180);
        let Δλ = (lon2 - lon1) * (Math.PI / 180);

        let a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
            ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let distance = R * c;
        return distance; // en metros
        //console.log(distance)
    }

}

export default ConAux