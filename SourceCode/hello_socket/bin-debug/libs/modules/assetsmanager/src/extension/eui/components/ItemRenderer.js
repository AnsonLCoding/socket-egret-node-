var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/// <reference path="../utils/registerBindable.ts" />
var eui;
(function (eui) {
    /**
     * The ItemRenderer class is the base class for item renderers.
     *
     * @state up Up state
     * @state down Down state
     * @state upAndSelected Up state when the button is selected
     * @state downAndSelected Down state when the button is selected
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ItemRendererExample.ts
     * @language en_US
     */
    /**
     * ItemRenderer 类是项呈示器的基类。
     *
     * @state up 弹起状态
     * @state down 按下状态
     * @state upAndSelected 选择时的弹起状态
     * @state downAndSelected 选择时的按下状态
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ItemRendererExample.ts
     * @language zh_CN
     */
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        /**
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function ItemRenderer() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this._data = null;
            /**
             * @private
             */
            _this._selected = false;
            /**
             * The index of the item in the data provider
             * of the host component of the item renderer.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 项呈示器的数据提供程序中的项目索引。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.itemIndex = -1;
            /**
             * @private
             * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，触摸点是否在按钮上。
             */
            _this.touchCaptured = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            return _this;
        }
        Object.defineProperty(ItemRenderer.prototype, "data", {
            /**
             * The data to render or edit.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要呈示或编辑的数据。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
                this.dataChanged();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Update the view when the <code>data</code> property changes.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 当数据改变时，更新视图。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        ItemRenderer.prototype.dataChanged = function () {
        };
        Object.defineProperty(ItemRenderer.prototype, "selected", {
            /**
             * Contains <code>true</code> if the item renderer
             * can show itself as selected.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 如果项呈示器可以将其自身显示为已选中，则为 true。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Dispatched when an event of some kind occurred that canceled the touch.
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 由于某个事件取消了触摸时触发
         * @version Egret 3.0.1
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        ItemRenderer.prototype.onTouchCancle = function (event) {
            this.touchCaptured = false;
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.invalidateState();
        };
        /**
         * Handles <code>TouchEvent.TOUCH_BEGIN</code> events
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 触碰开始时触发事件
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        ItemRenderer.prototype.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = true;
            this.invalidateState();
            event.updateAfterEvent();
        };
        /**
         * @private
         * 舞台上触摸弹起事件
         */
        ItemRenderer.prototype.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            this.touchCaptured = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ItemRenderer.prototype.getCurrentState = function () {
            var state = "up";
            if (!this.enabled) {
                state = "disabled";
            }
            if (this.touchCaptured) {
                state = "down";
            }
            if (this._selected) {
                var selectedState = state + "AndSelected";
                var skin = this.skin;
                if (skin && skin.hasState(selectedState)) {
                    return selectedState;
                }
                return state == "disabled" ? "disabled" : "down";
            }
            return state;
        };
        return ItemRenderer;
    }(eui.Component));
    eui.ItemRenderer = ItemRenderer;
    __reflect(ItemRenderer.prototype, "eui.ItemRenderer", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
    eui.registerBindable(ItemRenderer.prototype, "data");
})(eui || (eui = {}));
