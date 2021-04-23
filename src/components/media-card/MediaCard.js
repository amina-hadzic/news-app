import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {selectArticle} from "../../actions";
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        display: 'inline-block'
    },
    media: {
        height: 180,
    }
});

export const MediaCard = ({news}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    function onArticleSelect(article) {
        dispatch(selectArticle(article));
    }

    return (
        <Card className={classes.root}>
                <CardMedia
                    src={news.title}
                    className={classes.media}
                    image={news.urlToImage}
                    title={news.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {news.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {news.description}
                    </Typography>
                </CardContent>
            <CardActions>
                <Link to={`/article/${news.id}`} style={{textDecoration: 'none'}}>
                    <Button size="small" color="primary" onClick={() => onArticleSelect(news)}>
                        Read Full Page
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
        ;
}