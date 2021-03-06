"use strict";
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events = require("events");
var ServiceSocket = (function (_super) {
    __extends(ServiceSocket, _super);
    function ServiceSocket(socket) {
        var _this = _super.call(this) || this;
        _this.socket = socket;
        socket.setEncoding("utf-8");
        socket.on("data", function (msg) { return _this.onData(msg.toString()); });
        socket.on("end", function () { return _this.emit("end"); });
        socket.on("close", function () { return _this.emit("close"); });
        return _this;
    }
    ServiceSocket.prototype.send = function (object) {
        var msg = MessageBody.stringify(object);
        try {
            this.socket.write(msg);
        }
        catch (e) {
            console.error("ServiceSocket.send:", e);
        }
    };
    ServiceSocket.prototype.end = function (object) {
        if (object)
            this.send(object);
        this.socket.end();
    };
    ServiceSocket.prototype.onData = function (text) {
        var data = MessageBody.parse(text);
        this.onGotMessage(data);
    };
    ServiceSocket.prototype.onGotMessage = function (data) {
        this.emit("message", data);
    };
    return ServiceSocket;
}(events.EventEmitter));
__reflect(ServiceSocket.prototype, "ServiceSocket");
var MessageBody;
(function (MessageBody) {
    var HEADER = "LARK-MSG";
    function stringify(data) {
        var json = JSON.stringify(data);
        var length = json.length;
        var header = HEADER + ":" + length + "\n";
        var msg = header + json;
        return msg;
    }
    MessageBody.stringify = stringify;
    function parse(text) {
        var data = null;
        if (text.indexOf(HEADER) == 0) {
            var lines = text.split('\n');
            var header = lines[0];
            var lengthStr = /\d+/.exec(header)[0];
            var telength = parseInt(lengthStr);
            text = lines[1];
            var length = text.length;
            if (length == telength) {
                data = JSON.parse(text);
            }
        }
        return data;
    }
    MessageBody.parse = parse;
})(MessageBody || (MessageBody = {}));
module.exports = ServiceSocket;
