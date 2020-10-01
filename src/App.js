import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Grid,Card,CardContent,Typography, Paper , Tab, Tabs, Button} from '@material-ui/core';

function App() {

  useEffect(()=> {
    axios.get("https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars")
    .then((success)=>{
      console.log("success", success);
      // const sortedItems = success.data.items.sort((a, b)=> {
      //   return b.stargazers_count - a.stargazers_count;
      // });
      setFrameworks(success.data.items);
    });
  }, []);

  const [frameworks, setFrameworks] = useState([]);
  const [filter, setFilter] = useState("All");

  return (
    <div className="App">

      <Paper square>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value="2"
        >
          <Tab label="Home" value="0" />
          <Tab label="Battle" value="1" />
          <Tab label="Popular" value="2" />
        </Tabs>
      </Paper>

      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("All")}>All</button>
        </Grid>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("JavaScript")}>JavaScript </button>
        </Grid>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("Ruby")}>Ruby </button>
        </Grid>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("Java")}>Java </button>
        </Grid>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("CSS")}>CSS </button>
        </Grid>
        <Grid item xs={2}>
          <button onClick={()=> setFilter("Python")}>Python </button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {
          frameworks.filter((item)=> {
            console.log("Filter ", filter);
            return filter==='All' || item.language === filter ;
          }).map((item, index)=> {
            return <Grid item xs={6} md={3} lg={2} key={index}>
              <Card variant="outlined">              
                <CardContent>                  
                  <Typography variant="h6">
                    #{index}
                  </Typography>
                  <img src={item.owner.avatar_url} width="100" height="100" style={{borderRadius: '3em'}} alt="This is avatar"></img>
                  <Typography variant="h6">
                    <span style={{color: 'red'}}>{item.name}</span>
                  </Typography>  
                  <Typography variant="h6">
                    @{item.owner.login}
                    <br />
                    {item.stargazers_count} stars 
                  </Typography> 
                </CardContent>
              </Card>
            </Grid>
          })
        }        
      </Grid>
    </div>
  );
}

export default App;
