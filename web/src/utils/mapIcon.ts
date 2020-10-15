import Leaflet from 'leaflet';
import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [48, 56],
    iconAnchor: [24, 56],
    popupAnchor: [170, 10],
})

export default mapIcon;