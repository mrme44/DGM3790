import React, { Component } from 'react';
import './specie.css';
import { Card } from '@material-ui/core';

class Specie extends Component {
    render (props) {
        return <div className='specie'>
            <h3>{this.props.name}</h3>
            <h4>A {this.props.designation} {this.props.classification}</h4>
            <Card className='details'>
                <span className='row'><b>Height: </b>{this.props.average_height}{parseInt(this.props.average_height) ? '"' : null}</span>
                <span className='row'><b>Color: </b>{this.props.skin_colors}</span>
                <span className='row'><b>Language: </b>{this.props.language}</span>
                <span className='row'><b>Lifespan: </b>{this.props.average_lifespan} {parseInt(this.props.average_lifespan) ? 'years' : null}</span>
            </Card>
        </div>
    }
}

export default Specie;
