import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {initState, news} from "./reducers";

const store = createStore(
    news,
    initState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
