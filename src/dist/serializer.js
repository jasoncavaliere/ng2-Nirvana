/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.5
 * @link https://github.com/nirvana-framework/ng2-nirvana
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Info"] = 1] = "Info";
    MessageType[MessageType["Warning"] = 2] = "Warning";
    MessageType[MessageType["Error"] = 3] = "Error";
    MessageType[MessageType["Exception"] = 4] = "Exception";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ValidationMessage = (function () {
    function ValidationMessage(MessageType, Key, Message) {
        this.MessageType = MessageType;
        this.Key = Key;
        this.Message = Message;
    }
    return ValidationMessage;
}());
exports.ValidationMessage = ValidationMessage;
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
var ServerException = (function () {
    function ServerException() {
    }
    return ServerException;
}());
exports.ServerException = ServerException;
var PagedResult = (function () {
    function PagedResult() {
    }
    return PagedResult;
}());
exports.PagedResult = PagedResult;
var Command = (function () {
    function Command(endpointName) {
        this.endpointName = endpointName;
    }
    return Command;
}());
exports.Command = Command;
var Query = (function () {
    function Query(endpointName) {
        this.endpointName = endpointName;
    }
    return Query;
}());
exports.Query = Query;
var AppConstants = (function () {
    function AppConstants() {
        this.EmptyGuid = "00000000-0000-0000-0000-000000000000";
    }
    return AppConstants;
}());
exports.AppConstants = AppConstants;
var Response = (function () {
    function Response() {
    }
    Response.prototype.Success = function () {
        return this.IsValid && this.Exception == null;
    };
    return Response;
}());
exports.Response = Response;
var CommandResponse = (function (_super) {
    __extends(CommandResponse, _super);
    function CommandResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandResponse.prototype.Throw = function () {
        if (this.Exception) {
            throw this.Exception.Message;
        }
    };
    return CommandResponse;
}(Response));
exports.CommandResponse = CommandResponse;
var QueryResponse = (function (_super) {
    __extends(QueryResponse, _super);
    function QueryResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryResponse.prototype.Throw = function () {
        if (this.Exception) {
            throw this.Exception.Message;
        }
    };
    return QueryResponse;
}(Response));
exports.QueryResponse = QueryResponse;
var SignalrWindow = (function (_super) {
    __extends(SignalrWindow, _super);
    function SignalrWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignalrWindow;
}(Window));
exports.SignalrWindow = SignalrWindow;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    ConnectionState[ConnectionState["Reconnecting"] = 3] = "Reconnecting";
    ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var ChannelConfig = (function () {
    function ChannelConfig() {
    }
    return ChannelConfig;
}());
exports.ChannelConfig = ChannelConfig;
var ChannelEvent = (function () {
    function ChannelEvent() {
        this.Timestamp = new Date();
    }
    return ChannelEvent;
}());
exports.ChannelEvent = ChannelEvent;
var ChannelSubject = (function () {
    function ChannelSubject() {
    }
    return ChannelSubject;
}());
exports.ChannelSubject = ChannelSubject;

//# sourceMappingURL=serializer.js.map
