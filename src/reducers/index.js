export const initState = () => {
    return {
        news: [],
        articleNr: 20,
        selectedArticle: null,
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
        default:
            return state;
    }
};