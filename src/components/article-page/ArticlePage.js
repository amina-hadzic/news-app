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
        margin: '1rem',
        color: 'grey',
        fontStyle: 'italic'
    },
    articleImage: {
        display: "block",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    descriptionBackground: {
        backgroundColor: '#d8e2f2',
        marginTop: '2rem',
        marginBottom: '2rem',
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
                <Typography className={classes.details}>
                    Written by {parseName(article.author) ?? 'Unknown Author'} ~ {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric"
                }).format(new Date(article.publishedAt))}
                </Typography>
                <div className={classes.articleImage} style={{ backgroundImage: `url(${article.urlToImage})` }}></div>
                <Container className={classes.descriptionBackground}>
                    <Typography className={classes.description} variant="subtitle1">
                        {article.description}
                    </Typography>
                </Container>
                <Typography>
                    {article.content}
                </Typography>
                <Typography className={classes.details}>
                   Source: {article.source.name}
                </Typography>
            </Grid>
        </Container>);

}

export default ArticlePage;