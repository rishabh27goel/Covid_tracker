import React from 'react';
import './Map.css';
import{Map as LeafletMap, TileLayer} from 'react-leaflet';
import {showDataOnMap} from './util'

function Map({countries, casesType, center, zoom}) {
    
    return (
        <div className="map">
            <LeafletMap center={center} zoom= {zoom}>
                <TileLayer
                    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    distribution='&copy; <a href="http://osm.org/copyright">
                    OpenStreeMap</a> contributors'
                />

                {/* Loop throungh all the countries and add circles to the map */}
            
                {showDataOnMap(countries, casesType)}
                
            </LeafletMap>
        </div>
    )
}

export default Map;
