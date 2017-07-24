function fn(n) {
    var ary = [];
    var obj = {};
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * (32 - 2) + 2);
        if (obj[num] == num) {
            i--;
            continue;
        }
        obj[num] = num;
        ary.push(num);
    }
    obj = null;
    return ary;
}
console.log(fn(5));