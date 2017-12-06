import {combineReducers} from 'redux';
import FavoriteReducer from './reducer/favorite-list';
import FilteredReducer from './reducer/filtered-list';

const allReducers = combineReducers({
    favoriteList: FavoriteReducer,
    filteredList: FilteredReducer
});

export default allReducers;