import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../../images/map-marker.svg';

import './style.css';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}

export default function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data);
        });
    }, []);

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
                center={[-29.4543083, -51.9714186]}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/*<TileLayer url={
                    `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/  @2x?acess_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                } />*/}
                {
                    orphanages.map(orphanage => (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    ))
                }
            </Map>
            <Link to="/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

