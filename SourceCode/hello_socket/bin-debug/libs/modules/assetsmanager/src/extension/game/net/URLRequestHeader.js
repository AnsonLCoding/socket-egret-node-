//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    /**
     * A URLRequestHeader object encapsulates a single HTTP request header and consists of a name/value pair.  URLRequestHeader objects are used in the requestHeaders property of the URLRequest class.
     * Note: Because of browser compatibility, this property has not been achieved in html5
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/net/URLRequestHeader.ts
     * @language en_US
     */
    /**
     * URLRequestHeader 对象封装了一个 HTTP 请求标头并由一个名称/值对组成。URLRequestHeader 对象在 URLRequest 类的 requestHeaders 属性中使用。
     * 注意：由于浏览器兼容性原因，在 html5 中并未实现
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/net/URLRequestHeader.ts
     * @language zh_CN
     */
    var URLRequestHeader = (function () {
        /**
         * Create an egret.URLRequestHeader object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.URLRequestHeader 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function URLRequestHeader(name, value) {
            /**
             * HTTP request header name, such as Content-Type
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * HTTP 请求标头名称，如 Content-Type
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            this.name = "";
            /**
             * The values associated with the name property (such as text/plain).
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 与 name 属性相关联的值，如 text/plain
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            this.value = "";
            this.name = name;
            this.value = value;
        }
        return URLRequestHeader;
    }());
    egret.URLRequestHeader = URLRequestHeader;
    __reflect(URLRequestHeader.prototype, "egret.URLRequestHeader");
})(egret || (egret = {}));
