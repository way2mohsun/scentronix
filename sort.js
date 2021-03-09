var key;
module.exports = function (obj, k) {
    key = k;
    return obj.sort(compare);
};

function compare(a, b) {
    if (a[key] < b[key]) {
        return -1;
    }
    if (a[key] > b[key]) {
        return 1;
    }
    return 0;
}