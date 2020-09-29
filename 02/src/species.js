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
  gridItem: {
    width: 'auto',
    height: '284px!important',
  },
  gridList: {
    margin: '0!important'
  },
}));

function Species(props) {
    const classes = useStyles();

    const [data, setData] = useState({'status':'loading'});

    useEffect( () => {

        async function fetchSpecies() {
          let response;

          try {
            response = await axios.get('https://swapi.dev/api/species/', {'https': true});
            console.log('👉 Returned data:', response);
          } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            setData({'status': 'error'})
            return
          }

          setData({
              'status': 'loaded',
              'species': response.data.results
          })
        }
        fetchSpecies()

    }, []);


    if (data.status === 'loaded'){
        let ret = [];
        for (let i=0; i<props.count; i++){
            ret.push( <GridListTile className={classes.gridItem} key={data.species[i]['name']}><Specie {...data.species[i]}></Specie></GridListTile> );
        }
        return <div className='species'><GridList className={classes.gridList} cols={3} spacing={1}>{ret}</GridList></div>
    } else if (data.status === 'error') {
        return <div className='species'>There was an error fetching the data</div>
    } else{
        return <div className='species'>Loading...</div>
    }
}

export default Species;
