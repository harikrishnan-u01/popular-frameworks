import React from 'react';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';

function LoadingCard({message}) {
    return (
      <Grid container spacing={3} justify="center" alignItems="center" style={{minHeight: '60vh'}}>
            <Card variant="outlined">              
              <CardContent>                  
                <Typography variant="h4">
                  {message}
                </Typography>
              </CardContent>
            </Card>
      </Grid>
    );
}

export default LoadingCard;