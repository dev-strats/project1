function convertDateToString(date) {
    // January is 0
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function escapeSlash(s) {
    return s.replace(/\//g, "~");
}

function isDict(v) {
    return v !== null && typeof(v) === 'object' && !(v instanceof Array) && !(v instanceof Date);
}