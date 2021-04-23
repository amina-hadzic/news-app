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