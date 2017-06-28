jsonWay = ~function () {
    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }
    return {
        jsonParse:jsonParse
    }
}();