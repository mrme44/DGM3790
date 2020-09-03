import React from 'react';
import './species.css';
import {species} from './species_json.js'
import Specie from './specie.js'

function Species(props) {
    let ret = [];
    for (let i=0; i<props.count; i++){
        ret.push( <Specie key={species[i]['name']} {...species[i]}></Specie> );
    }
    return <div className='species'>{ret}</div>
}

export default Species;
