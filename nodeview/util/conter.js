var i = 0;

function count() {
    return ++i;
}

// exports.count = count;
// module.exports = {
//     //批量导出
//     count: count
// }
module.exports.count = count;