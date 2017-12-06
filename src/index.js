import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './redux/store';
import Main from './view/main';

const store = createStore(allReducers);

render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById("main"));