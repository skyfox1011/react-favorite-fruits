export const loadFavorites = favoriteList => {
    return {
        type: 'LIST_LOADED',
        payload: favoriteList
    }
}

export const getFilteredFavorites = favoriteList => {
    return {
        type: 'FAVORITES_FILTERED',
        payload: favoriteList
    }
}