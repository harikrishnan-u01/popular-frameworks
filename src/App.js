import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Grid,Card,CardContent,Typography, Paper , Tab, Tabs} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function App() {

  const initPageParams = {
    pageNumber : 1,
    startIndex : 0,
    endIndex : 9
  };

  useEffect(()=> {
    axios.get("https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars")
    .then((success)=>{
      console.log("success", success);
      setFrameworks(success.data.items);
    });
  }, []);

  const [frameworks, setFrameworks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [paginationParams, setPaginationParams] = useState(initPageParams);
  const [pageCount, setPageCount] = useState(1);
  const numberOfItems = 10;

  const onPaginationChange = (event, pageNumber) => {
    console.log("Selected Page Number ===> ", pageNumber);
    let addNumber = (pageNumber - paginationParams.pageNumber) * numberOfItems ;
    setPaginationParams({
      pageNumber,
      startIndex : paginationParams.startIndex + addNumber,
      endIndex : paginationParams.endIndex + addNumber
    });
  };

  const onFilter = (language) => {
    setPaginationParams(initPageParams);
    setFilter(language);
  }

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

      {
        frameworks.length === 0 ? <Grid container spacing={3} justify="center">
                <Card variant="outlined">              
                  <CardContent>                  
                    <Typography variant="h6">
                    Loading....
                    </Typography>
                  </CardContent>
                </Card>
          </Grid> : null
      }
      
      <Grid container spacing={3}>
        {
          frameworks.filter((item)=> {
            console.log("Filter ", filter);
            return filter==='All' || item.language === filter ;
          }).map((item, index)=> {
            return paginationParams && index >= paginationParams.startIndex && index <= paginationParams.endIndex ? <Grid item xs={6} md={3} lg={2} key={index}>
              <Card variant="outlined">              
                <CardContent>                  
                  <Typography variant="h6">
                    #{index + 1}
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
            </Grid> : null
          })
        }        
      </Grid>
      {
        frameworks.length > 0 ? <Grid container spacing={3} justify="center">
            <Pagination count={10} color="primary" 
              onChange={onPaginationChange} count={frameworks.length > 0 ? Math.round(frameworks.length/numberOfItems)  : 0} 
              page={paginationParams.pageNumber} 
            />
          </Grid> : null
      }
      
    </div>
  );
}

export default App;
