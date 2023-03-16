import './Map.scss'
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';




export function Map2({ location, downtown, address }) {
    //const mapRef = useRef();

    /* useEffect(() => {
        const current = { current: {} = mapRef };
        const { leafletElement: map } = current;
    }, []); */
    /* atributo do MapContainer
    ref={mapRef} */

    /* const MyMarker = (props) => {
        const leafletRef = useRef();
        useEffect(() => {
            leafletRef.current.openPopup();
        }, [])
        return <Marker ref={leafletRef} {...props} />
    } */

    setTimeout(() => {
        var map = new L.map('map', {
            //fullscreenControl: true,

        }).setView(location, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker(location).addTo(map)
            .bindPopup(address)
            .openPopup();

        var circle = L.circle(downtown, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 2000
        }).addTo(map);
        circle.bindPopup("Centro")

        map.addControl(new L.Control.Fullscreen());
    }, 10);




    return (
        <div id="map" className='mapStyle'></div>
    )
}
