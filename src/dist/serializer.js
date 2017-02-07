/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.4
 * @link https://github.com/jasoncavaliere/ng2-Nirvana
 * @license MIT
 */
"use strict";
var Serializer = (function () {
    function Serializer() {
    }
    Serializer.prototype.serialize = function (arg) {
        return JSON.stringify(arg);
    };
    Serializer.prototype.deserialize = function (obj, json) {
        var jsonObj = JSON.parse(json);
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName];
            }
        }
        return obj;
    };
    return Serializer;
}());
exports.Serializer = Serializer;

//# sourceMappingURL=serializer.js.map
