import React from 'react';
import { useSelector } from "react-redux";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row'
    },
    root: {
        flexGrow: 1,
    },
    title: {
        marginBottom: '2rem'
    },
    // cover: {
    //     width: '100vw'
    // },
    details: {
        margin: '1rem'
    },
    responsiveImage: {
        flex: 1,
        resizeMode: 'contain'
    },

});


const ArticlePage = () => {
    const classes = useStyles();
    const article = useSelector(state => state.selectedArticle);

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container justify="center" className={classes.root} spacing={2}>
                <img src={article.urlToImage} className={classes.responsiveImage} />
                <Typography variant="h2" className={classes.title}>
                    {article.title}
                </Typography>
                <Typography variant="subtitle" className={classes.details}>
                    {article.author} ~ {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                    }).format(new Date(article.publishedAt))}
                </Typography>
                <Typography>
                    {article.content}
                </Typography>

            </Grid>
        </Container>);

}

export default ArticlePage;