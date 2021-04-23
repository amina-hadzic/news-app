export const addNews = (news) => {
    return {
        type: 'ADD_NEWS',
        payload: news
    };
}

export const loadAll = (all) => {
    return {
        type: 'LOAD_ALL',
        payload: all
    };
}

export const selectArticle = (article) => {
    return {
        type: 'SELECT_ARTICLE',
        payload: article
    };
}

export const searchNews = (search) => {
    return {
        type: 'SEARCH_QUERY',
        payload: search
    };
}

export const searchSort = (sorting) => {
    if (sorting === 'popular') {
        return {
            type: 'SEARCH_SORT_POPULAR',
            payload: 'popularity'
        }
    } else if (sorting === 'publish') {
        return {
            type: 'SEARCH_SORT_PUBLISHED',
            payload: 'publishedAt'
        }
    } else {
        return {
            type: 'SEARCH_SORT_RELEVANCY',
            payload: 'relevancy'
        }
    }
}