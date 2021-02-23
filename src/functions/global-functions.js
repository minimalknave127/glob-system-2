export const getUrl = (urlInput) => {
    const url = new URL(urlInput);
    const params = url.searchParams;
    return params;
}
export const checkObjectForNull = (obj) => {
    //const obj = {};
    for (let key in obj) {
        //console.log(obj[key]);
        if (obj[key] === null || obj[key] === "") return true;
    }
    return false;
}
export const filterByValue = (array, string) => {
    return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); });
}