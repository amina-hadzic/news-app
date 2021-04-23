import React from 'react';
import { useSelector } from "react-redux";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            padding: '4rem'
        },
    },
    root: {
        flexGrow: 1,
    },
    title: {
        margin: '0.5rem',
       ...theme.typography.h4,
        [theme.breakpoints.up('sm')]: {
            ...theme.typography.h1,
            margin: '2rem',
        },
    },
    details: {
        margin: '1rem'
    },
    responsiveImage: {
        flex: 1,
        resizeMode: 'contain',
        [theme.breakpoints.down('md')]: {
            maxWidth: '90vw'
        },
    },
    descriptionBackground: {
        backgroundColor: '#d8e2f2',
        marginTop: '2rem',
        marginBottom: '4rem',
        borderRadius: '0.8rem'
    },
    description: {
        padding: '2rem',
        fontStyle: 'italic',
        fontSize: '1.2rem',
    }

}));


const ArticlePage = () => {
    const classes = useStyles();
    const article = useSelector(state => state.selectedArticle);

    const parseName = (name) => {
        return name ? name.replace(/<a\b[^>]*>/g,"").replace(/<\/a>/g, "") : null;
    }

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container justify="center" className={classes.root} spacing={2}>
                <Typography className={classes.title}>
                    {article.title}
                </Typography>
                <Typography variant="subtitle1" className={classes.details}>
                    Written by {parseName(article.author)} ~ {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric"
                }).format(new Date(article.publishedAt))}
                </Typography>
                <img src={article.urlToImage} className={classes.responsiveImage} alt="Article" />
                <Container className={classes.descriptionBackground}>
                    <Typography className={classes.description} variant="subtitle1">
                        {article.description}
                    </Typography>
                </Container>
                <Typography>
                    {article.content}
                </Typography>
            </Grid>
        </Container>);

}

export default ArticlePage;