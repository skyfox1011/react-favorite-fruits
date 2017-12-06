import React, {Component} from 'react';
import Bars from './bars/bars';
import List from './list/list';

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <h2>Favorite Fruits</h2>
                <Bars />
                <List />
            </div>
        );
    }
}

export default Main;