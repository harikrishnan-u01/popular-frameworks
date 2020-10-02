import React from 'react';
import {Grid} from '@material-ui/core';

function Filters({onFilter}) {
    return (
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("All")}>All</button>
          </Grid>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("JavaScript")}>JavaScript </button>
          </Grid>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("Ruby")}>Ruby </button>
          </Grid>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("Java")}>Java </button>
          </Grid>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("CSS")}>CSS </button>
          </Grid>
          <Grid item xs={2}>
            <button onClick={()=> onFilter("Python")}>Python </button>
          </Grid>
        </Grid>
    );
}

export default Filters;