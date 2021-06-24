export const combineReducers = (reducers) => {
    return (state, action) => {
        return Object.keys(reducers).reduce((acc, prop) => {
            return {
                ...acc,
                ...reducers[prop](state, action),
                // ...reducers[prop]({ [prop]: acc[prop] }, action),
            };
        }, state);
    };
};
export const fontSize = (designWidth, rootFontSize) => {
    const clientWidth = document.documentElement.clientWidth;
    var newFontSize = rootFontSize * (clientWidth / designWidth);
    const html = document.getElementsByTagName('html')[0];
    html.style.fontSize = newFontSize + 'px';
};
