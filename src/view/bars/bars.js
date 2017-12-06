import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getFilteredFavorites} from '../../redux/actions/dispatchers';
import Radium, {StyleRoot} from 'radium';

class Bars extends React.Component {
    getListGroupedByFruitAndSortedByLength(arr = [], desc = false) {
        let groupedList = [], indexMap = {}, callBack;
        
        for (let item of arr) {
            if (typeof indexMap[item.favoriteFruit] === 'undefined') {
                groupedList.push({ fruiteName: item.favoriteFruit, list: [] });
                indexMap[item.favoriteFruit] = groupedList.length - 1;
            }
            
            groupedList[indexMap[item.favoriteFruit]].list.push(item);   
        }

        if(desc) {
            callBack = (a, b) => b.list.length - a.list.length;
        }
        else {
            callBack = (a, b) => a.list.length - b.list.length;
        }
        groupedList.sort(callBack);

        return groupedList;
    }

    selectFavorites(item = {}) {
        console.log(`Fruit selected: ${item.fruiteName}, ${item.list.length}`);
        this.props.getFilteredFavorites(item.list);
    }

    getBarStyle(max = 100, actual = 0) {
        const percentage = Math.round(actual / max * 100) + '%';

        const getRandomHexCode = () => {
            const char = 'ABCDEF0123456789';
            let result = '#';
            for (let i = 0; i < 6; i++) {
              result += char[Math.floor(Math.random() * 16)];
            }
            return result;
        }

        const color = getRandomHexCode();

        const barGrowingFrames = Radium.keyframes({ 
            '0%': { width: 0 },
            '100%': { width: percentage }
        });

        return {
            height: '100%',
            width: percentage,
            background: color,
            animation: 'x 3s ease',
            animationName: barGrowingFrames
        }
    } 

    getBars(arr = []) {
        return arr.map((item, index) => {
            return (
                <tr key={index.toString()} onClick={ () => this.selectFavorites(item) }>
                    <td>{item.fruiteName}</td>
                    <td><div style={this.getBarStyle(arr[0].list.length, item.list.length)}></div></td>
                    <td>{item.list.length}</td>
                </tr>
            )}
        );
    }

    render() {
        let display = "Thinking...";

        if (this.props.favoriteList) {
            let groupedList = this.getListGroupedByFruitAndSortedByLength(this.props.favoriteList, true);
            display = (
                <StyleRoot>
                    <table>
                        <tbody>
                            {this.getBars(groupedList)}
                         </tbody>
                    </table>
                </StyleRoot>
            );
        }

        return <div className="bars">{display}</div>
    }
}

function mapStateToProps(state) {
    return {
        favoriteList: state.favoriteList
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getFilteredFavorites: getFilteredFavorites }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Bars);
