import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarkerImg from '../../images/map-marker.svg';

import './style.css';
import 'leaflet/dist/leaflet.css'

export function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato on mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Lajeado</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            <Map
                center={[-29.4533237, -52.0092311]}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/*<TileLayer url={
                    `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/  @2x?acess_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                } />*/}
            </Map>

            <Link to="/" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

