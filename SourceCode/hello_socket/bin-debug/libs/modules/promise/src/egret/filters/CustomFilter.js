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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret;
(function (egret) {
    var SOURCE_KEY_MAP = {};
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = new Array(36);
    var rnd = 0, r;
    /**
     * generate uuid
     * http://www.broofa.com/Tools/Math.uuid.htm
     */
    var generateUUID = function () {
        for (var i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            }
            else if (i === 14) {
                uuid[i] = '4';
            }
            else {
                if (rnd <= 0x02)
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };
    /**
     * custom filter, now support WebGL mode only.
     * @version Egret 4.1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 自定义滤镜，目前仅支持WebGL模式
     * @version Egret 4.1.0
     * @platform Web
     * @language zh_CN
     */
    var CustomFilter = (function (_super) {
        __extends(CustomFilter, _super);
        /**
         * 初始化 CustomFilter 对象
         * @method egret.CustomFilter#constructor
         * @param vertexSrc {string} 自定义的顶点着色器程序。
         * @param fragmentSrc {string} 自定义的片段着色器程序。
         * @param uniforms {any} 着色器中uniform的初始值（key，value一一对应），目前仅支持数字和数组。
         * @version Egret 4.1.0
         * @platform Web
         * @language zh_CN
         */
        function CustomFilter(vertexSrc, fragmentSrc, uniforms) {
            if (uniforms === void 0) { uniforms = {}; }
            var _this = _super.call(this) || this;
            /**
             * 滤镜的内边距
             * 如果自定义滤镜所需区域比原区域大（描边等），需要手动设置
             * @version Egret 4.1.0
             * @platform Web
             * @language zh_CN
             */
            _this.padding = 0;
            _this.$vertexSrc = vertexSrc;
            _this.$fragmentSrc = fragmentSrc;
            var tempKey = vertexSrc + fragmentSrc;
            if (!SOURCE_KEY_MAP[tempKey]) {
                SOURCE_KEY_MAP[tempKey] = generateUUID();
            }
            _this.$shaderKey = SOURCE_KEY_MAP[tempKey];
            _this.$uniforms = uniforms;
            _this.type = "custom";
            return _this;
        }
        Object.defineProperty(CustomFilter.prototype, "uniforms", {
            get: function () {
                return this.$uniforms;
            },
            enumerable: true,
            configurable: true
        });
        return CustomFilter;
    }(egret.Filter));
    egret.CustomFilter = CustomFilter;
    __reflect(CustomFilter.prototype, "egret.CustomFilter");
})(egret || (egret = {}));
