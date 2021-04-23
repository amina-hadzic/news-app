import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {httpClient} from "../../axios/apiconfig";
import {addNews, searchNews, searchSort} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import { Grid, Button, ButtonGroup} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

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
        marginRight: '1rem',

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
            marginLeft: theme.spacing(3),
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
            width: '30ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
    headerLink: {
        color: 'white',
        textDecoration: 'none'
    },
    label: {
        ...theme.typography.button,
        marginTop: '2rem',
        marginLeft: '1rem',
        [theme.breakpoints.down('md')]: {
        textAlign: "center",
        },
    },
    sortButtons: {
        marginLeft: '1rem',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '0rem'
            },
  },
}));
const AppHeader = () => {
    const state = useSelector(state => state);
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    var delaySearch;
    const handleChange = (event) => {
        clearTimeout(delaySearch);
        delaySearch = setTimeout(function() {
            if (event.target.value.length > 2) {
                dispatch(searchNews(event.target.value));
                dispatch(searchSort(state.searchSort));

                search(event.target.value);
            }
        }, 1000);
    }

    useEffect(() => {
        httpClient.get('v2/top-headlines?country=us&pagesize=100').then(response => {
            const articles = [];
            response.data.articles.map((data, key) => {
                return articles.push({
                    id: key + 1,
                    ...data
                });
            });
            dispatch(addNews(articles));
        });
    }, [dispatch]);

    const search = (text) => {
        if (text.length > 2) {
            const keywordUrlEncoded = encodeURIComponent(state.searchQuery);
            httpClient.get(`v2/everything?q=${keywordUrlEncoded}&sortBy=${state.searchSorting}`).then(response => {
                const articles = [];
                response.data.articles.map((data, key) => {
                    return articles.push({
                        id: key + 1,
                        ...data
                    });
                });
                dispatch(addNews(articles));
            });
        }
    }

    const onSearchSorting = (sort) => {
        dispatch(searchSort(sort));
        search(state.searchQuery);
    }

    return (
        <>
            <AppBar position="static">
                    <Toolbar>
                    <Link to = {'/'} className={classes.headerLink}>
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
                                    autoComplete="off"
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </form>
                        </div>
                    </Toolbar>
                </AppBar>
            { (state.searchQuery.length > 0 && location.pathname==='/')
                ? <>
                <Typography color="primary" className={classes.label}>
                        Sort by
                    </Typography>
                    <Grid className={classes.sortButtons}>                    
                    <ButtonGroup variant="contained" size="small" color="primary">
                        <Button onClick={() => onSearchSorting()} className={classes.button}>Relevancy</Button>
                        <Button onClick={() => onSearchSorting('popular')} className={classes.button}>Popularity</Button>
                        <Button onClick={() => onSearchSorting('publish')} className={classes.button}>Publish Date</Button>
                    </ButtonGroup>
                    </Grid>
                </>
                : null

            }
        </>
    );
}

export default AppHeader;
