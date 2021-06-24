export const fontSize = (designWidth, rootFontSize) => {
    const clientWidth = document.documentElement.clientWidth;
    var newFontSize = rootFontSize * (clientWidth / designWidth);
    const html = document.getElementsByTagName('html')[0];
    html.style.fontSize = newFontSize + 'px';
};
