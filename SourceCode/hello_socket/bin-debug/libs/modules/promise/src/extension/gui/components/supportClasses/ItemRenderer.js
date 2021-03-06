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
    var gui;
    (function (gui) {
        /**
         * @class egret.gui.ItemRenderer
         * @classdesc
         * 项呈示器基类
         * @extends egret.gui.ButtonBase
         * @implements egret.gui.IItemRenderer
         */
        var ItemRenderer = (function (_super) {
            __extends(ItemRenderer, _super);
            /**
             * 构造函数
             * @method egret.gui.ItemRenderer#constructor
             */
            function ItemRenderer() {
                var _this = _super.call(this) || this;
                _this.dataChangedFlag = false;
                _this._data = null;
                _this._selected = false;
                _this._itemIndex = -1;
                _this.touchChildren = true;
                return _this;
            }
            Object.defineProperty(ItemRenderer.prototype, "data", {
                /**
                 * @member egret.gui.ItemRenderer#data
                 */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    //这里不能加if(_data==value)return;的判断，会导致数据源无法刷新的问题
                    this._data = value;
                    if (this.initialized || this.parent) {
                        this.dataChangedFlag = false;
                        this.dataChanged();
                    }
                    else {
                        this.dataChangedFlag = true;
                        this.invalidateProperties();
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 子类复写此方法以在data数据源发生改变时跟新显示列表。
             * 与直接复写_data的setter方法不同，它会确保在皮肤已经附加完成后再被调用。
             * @method egret.gui.ItemRenderer#dataChanged
             */
            ItemRenderer.prototype.dataChanged = function () {
            };
            Object.defineProperty(ItemRenderer.prototype, "selected", {
                /**
                 * @member egret.gui.ItemRenderer#selected
                 */
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    if (this._selected == value)
                        return;
                    this._selected = value;
                    this.invalidateSkinState();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemRenderer.prototype, "itemIndex", {
                /**
                 * @member egret.gui.ItemRenderer#itemIndex
                 */
                get: function () {
                    return this._itemIndex;
                },
                set: function (value) {
                    this._itemIndex = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 处理对组件设置的属性
             * @method egret.gui.ItemRenderer#commitProperties
             */
            ItemRenderer.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.dataChangedFlag) {
                    this.dataChangedFlag = false;
                    this.dataChanged();
                }
            };
            /**
             * 返回要应用到呈示器的状态的名称
             * @method egret.gui.ItemRenderer#getCurrentSkinState
             * @returns {string}
             */
            ItemRenderer.prototype.getCurrentSkinState = function () {
                if (this._selected)
                    return "down";
                return _super.prototype.getCurrentSkinState.call(this);
            };
            return ItemRenderer;
        }(gui.ButtonBase));
        gui.ItemRenderer = ItemRenderer;
        __reflect(ItemRenderer.prototype, "egret.gui.ItemRenderer", ["egret.gui.IItemRenderer", "egret.gui.ILayoutElement", "egret.IEventDispatcher"]);
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
