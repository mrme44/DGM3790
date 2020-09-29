import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './species.css';
import Specie from './specie.js'
import axios from "axios";
import { GridList, GridListTile } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: '284px!important',
  },
}));

function Species(props) {
    const classes = useStyles();

    const [data, setData] = useState({'loaded':false});

    let ignore = false;

    useEffect( () => {

        async function fetchSpecies() {
          let response;

          try {
            response = await axios.get('https://swapi.dev/api/species?count=12');
            console.log('👉 Returned data:', response);
          } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
          }

          const newstate = {
              'loaded': true,
              'species': response.data.results
          }
          setData(newstate)
        }
        fetchSpecies()

    }, []);


    if (data.loaded){
        let ret = [];
        for (let i=0; i<props.count; i++){
            ret.push( <GridListTile className={classes.gridList} key={data.species[i]['name']}><Specie {...data.species[i]}></Specie></GridListTile> );
        }
        return <div className='species'><GridList cols={3} spacing={1}>{ret}</GridList></div>
    } else{
        return <div className='species'>Loading...</div>
    }
}

export default Species;
