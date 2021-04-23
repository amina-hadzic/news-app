export const initState = () => {
    return {
        news: [],
        articleNr: 20,
        selectedArticle: null,
        searchQuery: '',
        searchSorting: 'relevancy'
    }
}

export const news = (state = [initState], action) => {
    switch (action.type) {
        case 'ADD_NEWS':
            return state = {
                ...state,
                news: action.payload
            }
        case 'LOAD_ALL':
            return state = {
                ...state,
                articleNr: action.payload
            }
        case 'SELECT_ARTICLE':
            return state = {
                ...state,
                selectedArticle: action.payload
            }
        case 'SEARCH_QUERY':
            return state = {
                ...state,
                searchQuery: action.payload
            }
        case 'SEARCH_SORT_RELEVANCY':
            return state = {
                ...state,
                searchSorting: action.payload
            }
        case 'SEARCH_SORT_POPULAR':
            return state = {
                ...state,
                searchSorting: action.payload
            }
        case 'SEARCH_SORT_PUBLISHED':
            return state = {
                ...state,
                searchSorting: action.payload
            }
        default:
            return state;
    }
};