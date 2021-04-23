import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LandingPage from "./components/landing-page/LandingPage";
import ArticlePage from "./components/article-page/ArticlePage";
import AppHeader from "./components/app-header/AppHeader";
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));
const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <AppHeader />
                <Route exact path="/" component={LandingPage} />
                <Route path="/article/:id" component={ArticlePage} />
            </BrowserRouter>
        </div>
    );
}

export default App;
