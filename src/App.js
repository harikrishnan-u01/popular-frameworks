import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Grid,Card,CardContent,Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Filters from './filters';
import Navigation from './navigation';
import LoadingCard from './loadingCard'; 

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
      setFilteredFrameworks(success.data.items);
    });
  }, []);

  const [frameworks, setFrameworks] = useState([]);
  const [filteredFrameworks, setFilteredFrameworks] = useState(frameworks);
 // const [filter, setFilter] = useState("All");
  const [paginationParams, setPaginationParams] = useState(initPageParams);
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
   // setFilter(language);

   setFilteredFrameworks(frameworks.filter((item)=> {
      return language==='All' || item.language === language ;
    }));
  }

  return (
    <div className="App">
      <Navigation />
      <Filters onFilter={onFilter}></Filters>
      {
        frameworks.length === 0 ? <LoadingCard message="Loading....."/> : null
      }
      
      <Grid container spacing={3} style={{minHeight: '60vh'}}>
        {
          filteredFrameworks
          .map((item, index)=> {
            return paginationParams && index >= paginationParams.startIndex && index <= paginationParams.endIndex ? 
            <Grid item xs={6} md={3} lg={2} key={index}>
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
        filteredFrameworks.length > 0 ? <Grid container spacing={3} justify="center">
            <Pagination count={10} color="primary" 
              onChange={onPaginationChange} count={filteredFrameworks.length > 0 ? Math.ceil(filteredFrameworks.length/numberOfItems)  : 0} 
              page={paginationParams.pageNumber} 
            />
          </Grid> : null
      }
      
    </div>
  );
}

export default App;
