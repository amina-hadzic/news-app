import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LandingPage from "./components/landing-page/LandingPage";
import ArticlePage from "./components/article-page/ArticlePage";
import {httpClient} from "./axios/apiconfig";
import {addNews} from "./actions";
import {useDispatch} from "react-redux";
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing(2),
        height: '20px'
    },
    title: {
        flexGrow: 1,
        display: 'none',

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const App = () => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const state = {
        search: ''
    }

    const handleChange = (event) => {
        state.search = event.target.value;
    }

    useEffect(() => {
        httpClient.get('v2/top-headlines?country=us&pagesize=100').then(response => {
            const articles = [];
            response.data.articles.map((data, key) => {
                articles.push({
                    id: key + 1,
                    ...data
                })
            });
            dispatch(addNews(articles));
        });
    });

    const search = (event) => {
        event.preventDefault();
        const keywordUrlEncoded = encodeURIComponent(state.search);
        httpClient.get(`v2/everything?q=${keywordUrlEncoded}`).then(response => {
            console.log(response);
        });
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Link to = {'/'}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        News Portal
                    </Typography>
                </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <form onSubmit={search}>
                            <InputBase
                                id="search-input"
                                placeholder="Search…"
                                onChange={handleChange}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </form>
                    </div>
                </Toolbar>
            </AppBar>
             <BrowserRouter>
                <Route exact path="/" component={LandingPage} />
                <Route path="/article/:id" component={ArticlePage} />
            </BrowserRouter>
        </div>
    );
}

export default App;
