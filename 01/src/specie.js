import React, { Component } from 'react';
import './specie.css';

class Specie extends Component {
    render (props) {
        return <div className='specie'>
            <h3>{this.props.name}</h3>
            <h4>A {this.props.designation} {this.props.classification}</h4>
            <div className='details'>
                <span className='row'><b>Height: </b>{this.props.average_height}</span>
                <span className='row'><b>Color: </b>{this.props.skin_colors}</span>
                <span className='row'><b>Language: </b>{this.props.hair_colors}</span>
                <span className='row'><b>Lifespan: </b>{this.props.average_lifespan}</span>
            </div>
        </div>
    }
}

export default Specie;
