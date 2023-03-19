import './Map.scss'
//import { useEffect, useRef } from "react";
//import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import mapIconUrl from '../assets/map-icon.png';
import mapIconShadowUrl from '../assets/map-icon-shadow.png';




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

        const LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: mapIconShadowUrl,
                iconSize: [30, 50],
                shadowSize: [50, 64],
                iconAnchor: [19, 74],
                shadowAnchor: [20, 97],
                popupAnchor: [-3, -76]
            }
        });

        const mapIcon = new LeafIcon({ iconUrl: mapIconUrl });

        L.marker(location, { icon: mapIcon }).addTo(map)
            .bindPopup(address)
            .openPopup();

        /*  var LeafIcon = L.Icon.extend({
             options: {
                 iconUrl: "https://img.icons8.com/3d-fluency/94/null/map-pin.png",
                 iconSize:     [38, 95],
                 shadowSize:   [50, 64],
                 iconAnchor:   [22, 94],
                 shadowAnchor: [4, 62],
                 popupAnchor:  [-3, -76]
             }
         });
         L.marker(location, { icon: LeafIcon }).addTo(map).bindPopup(address).openPopup(); */


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
        <>
            {/* <img src="https://img.icons8.com/3d-fluency/94/null/map-pin.png" /> */}
            <div id="map" className='mapStyle'></div>
        </>
    )
}
