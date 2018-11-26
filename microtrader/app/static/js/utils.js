function convertDateToString(date) {
    // January is 0
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}