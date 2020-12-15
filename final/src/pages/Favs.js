import React from 'react';
import { Card } from '@material-ui/core';

function Favs(props) {
    return <div className='specie'>
            <h3>{props.name}</h3>
            <h4>A {props.designation} {props.classification}</h4>
            <Card className='details'>
                <span className='row'><b>Height: </b>{props.average_height}{parseInt(props.average_height) ? '"' : null}</span>
                <span className='row'><b>Color: </b>{props.skin_colors}</span>
                <span className='row'><b>Language: </b>{props.language}</span>
                <span className='row'><b>Lifespan: </b>{props.average_lifespan} {parseInt(props.average_lifespan) ? 'years' : null}</span>
            </Card>
        </div>
}

export default Favs;
