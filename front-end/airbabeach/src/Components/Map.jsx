import './Map.scss'
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';


export function Map({ location, downtown, address }) {
    const mapRef = useRef();

    useEffect(() => {
        const current = { current: {} = mapRef };
        const { leafletElement: map } = current;
    }, []);

    const MyMarker = (props) => {
        const leafletRef = useRef();
        useEffect(() => {
            leafletRef.current.openPopup();
        }, [])
        return <Marker ref={leafletRef} {...props} />
    }


    return (
        <MapContainer className='mapStyle' ref={mapRef} fullscreenControl={true} center={location} zoom={13} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MyMarker position={location} >
                <Popup>
                    <b>{address}</b>
                </Popup>
            </MyMarker>
            <Circle center={downtown} radius={2000} fillColor='#ee375c' color='red' />
        </MapContainer>
    )
}
