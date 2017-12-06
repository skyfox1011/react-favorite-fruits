import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadFavorites} from '../../redux/actions/dispatchers';
import {sortByAsc, sortByDesc} from '../../library/lib';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMore: false,
            sortNamesByDesc: false,
            search: ""
        }

        this.toggleSort = this.toggleSort.bind(this);
        this.toggleShowMore = this.toggleShowMore.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    toggleSort() {
        this.setState(prevState => ({
            sortNamesByDesc: !prevState.sortNamesByDesc
        }));
    }

    toggleShowMore() {
        this.setState(prevState => ({
            showMore: !prevState.showMore
        }));
    }

    updateSearch(e) {
        this.setState({ search: e.target.value });
    } 

    componentDidMount() {
        FruitasticApi.get(arr => this.props.loadFavorites(arr) );
    }

    render() {
        let list = this.props.filteredList ? this.props.filteredList : this.props.favoriteList;
        let display = "";
        let showOption;
        let showButtonTag;
        
        if (list) {
            let sortFunc;
            sortFunc = this.state.sortNamesByDesc ? sortByDesc : sortByAsc;
            list.sort(sortFunc);

            if(this.state.search !== '') {
                list = list.filter((item) => item.name.toLowerCase().includes(this.state.search.toLowerCase()));
                showOption = list.map((item, index) => <option key={index.toString()}>{item.name}</option>);
            }

            if (list.length > 5) {
                showButtonTag = <button onClick={this.toggleShowMore}>{this.state.showMore ? 'Show Less' : 'Show More'}</button>;            
                list = this.state.showMore ? list : list.slice(0, 5);
            }

            
            display = list.map((item, index) => <div key={index.toString()}>{item.name}  <span>{item.favoriteFruit}</span></div>)
        }

        return (
            <div className="list">
                <div>
                    <button onClick={this.toggleSort}>Toggle Sort</button><br/><br/>
                    Search by Name: 
                    <input list="names" type="search" onChange={this.updateSearch} />
                    <datalist id="names">
                        { showOption }
                    </datalist>
                </div>
                <div>{display}</div>
                <div>
                    { showButtonTag }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favoriteList: state.favoriteList,
        filteredList: state.filteredList
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loadFavorites: loadFavorites }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);
