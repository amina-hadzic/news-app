import React, {Component} from 'react';
import {useSelector} from "react-redux";
import {MediaCard} from "../media-card/MediaCard";
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Button } from '@material-ui/core';
import {loadAll} from "../../actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    container: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row'
    },

    paper: {
    marginBottom: '1rem'
    }

});


const LandingPage = () => {
    const classes = useStyles();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    console.log(state);

    const loadMore = () => {
        dispatch(loadAll(-1));
    }

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container justify="flex-start" className={classes.container} spacing={1}>
                {state.news.slice(0, state.articleNr).map((news, key) => (
                    <Grid key={key} item xs={12} sm={6} md={4} lg={4}>
                            <MediaCard className={classes.paper} news={news}></MediaCard>                   
                    </Grid>
                ))}
               <Grid item xs={12} style={{ textAlign:'center' }}>
            {state.articleNr === 20 ?
                    <Button variant="contained" color="primary" size="large" onClick={ loadMore }>Load More</Button>
                    : null
                }
            </Grid> 
            </Grid>
            
        </Container>);

}

export default LandingPage;