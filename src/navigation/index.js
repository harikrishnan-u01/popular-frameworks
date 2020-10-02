import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';

function Navigation() {
    return (
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
    );
}

export default Navigation;