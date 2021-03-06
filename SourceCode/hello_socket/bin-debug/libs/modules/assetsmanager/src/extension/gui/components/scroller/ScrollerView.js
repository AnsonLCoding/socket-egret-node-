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
         * @private
         */
        var ScrollerView = (function (_super) {
            __extends(ScrollerView, _super);
            /**
             * Create a egret.ScrollerView objects
             * @param content {egret.DisplayObject} You need to scroll object
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 创建一个 egret.ScrollerView 对象
             * @param content {egret.DisplayObject} 需要滚动的对象
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            function ScrollerView(content) {
                if (content === void 0) { content = null; }
                var _this = _super.call(this) || this;
                /**
                 * Start rolling threshold when the touch point from the initial touch point at a distance exceeding this value will trigger roll
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 开始滚动的阈值，当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.scrollBeginThreshold = 10;
                /**
                 * Scrolling speed, the speed is required and the default speed ratio.
                 * The range of scrollSpeed> 0 assigned to 2:00, the speed is 2 times the default speed
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 滚动速度，这个值为需要的速度与默认速度的比值。
                 * 取值范围为 scrollSpeed > 0 赋值为 2 时，速度是默认速度的 2 倍
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.scrollSpeed = 1;
                /**
                 * @private
                 */
                _this._content = null;
                /**
                 * @private
                 */
                _this.delayTouchBeginEvent = null;
                /**
                 * @private
                 */
                _this.touchBeginTimer = null;
                _this.touchEnabled = true;
                _this._ScrV_Props_ = new gui.ScrollerViewProperties();
                if (content) {
                    _this.setContent(content);
                }
                return _this;
            }
            Object.defineProperty(ScrollerView.prototype, "bounces", {
                /**
                 * Whether to enable rebound, rebound When enabled, ScrollerView contents allowed to continue to drag the border after arriving at the end user drag operation, and then bounce back boundary position
                 * @default true
                 * @version Egret 2.4
                 * @language en_US
                 */
                /**
                 * 是否启用回弹，当启用回弹后，ScrollView中内容在到达边界后允许继续拖动，在用户拖动操作结束后，再反弹回边界位置
                 * @default true
                 * @version Egret 2.4
                 * @language zh_CN
                 */
                get: function () {
                    return this._ScrV_Props_._bounces;
                },
                set: function (value) {
                    this._ScrV_Props_._bounces = !!value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Set to scroll object
             * @param content {egret.DisplayObject} You need to scroll object
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 设置需要滚动的对象
             * @param content {egret.DisplayObject} 需要滚动的对象
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.setContent = function (content) {
                if (this._content === content)
                    return;
                this.removeContent();
                if (content) {
                    this._content = content;
                    _super.prototype.addChild.call(this, content);
                    this._addEvents();
                }
            };
            /**
             * Remove rolling objects
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 移除滚动的对象
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.removeContent = function () {
                if (this._content) {
                    this._removeEvents();
                    _super.prototype.removeChildAt.call(this, 0);
                }
                this._content = null;
            };
            Object.defineProperty(ScrollerView.prototype, "verticalScrollPolicy", {
                /**
                 * Vertical scroll bar display policy, on / off / auto.
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 垂直滚动条显示策略，on/off/auto。
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._ScrV_Props_._verticalScrollPolicy;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._verticalScrollPolicy)
                        return;
                    this._ScrV_Props_._verticalScrollPolicy = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollerView.prototype, "horizontalScrollPolicy", {
                /**
                 * The horizontal scroll bar display policy, on / off / auto.
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 水平滚动条显示策略，on/off/auto。
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._ScrV_Props_._horizontalScrollPolicy;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._horizontalScrollPolicy)
                        return;
                    this._ScrV_Props_._horizontalScrollPolicy = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollerView.prototype, "scrollLeft", {
                /**
                 * Gets or sets the horizontal scroll position
                 * @returns {number}
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 获取或设置水平滚动位置,
                 * @returns {number}
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._ScrV_Props_._scrollLeft;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._scrollLeft)
                        return;
                    this._ScrV_Props_._scrollLeft = value;
                    this._validatePosition(false, true);
                    this._updateContentPosition();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollerView.prototype, "scrollTop", {
                /**
                 * Gets or sets the vertical scroll position
                 * @returns {number}
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 获取或设置垂直滚动位置,
                 * @returns {number}
                 * @version Egret 2.4
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._ScrV_Props_._scrollTop;
                },
                set: function (value) {
                    if (value == this._ScrV_Props_._scrollTop)
                        return;
                    this._ScrV_Props_._scrollTop = value;
                    this._validatePosition(true, false);
                    this._updateContentPosition();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Set scroll position
             * @param top {number} The vertical scroll position
             * @param left {number} The horizontal scroll position
             * @param isOffset {boolean} Optional parameter, the default is false, whether it is the amount of scrolling increase as top = 1 on behalf of one pixel scroll up
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 设置滚动位置
             * @param top {number} 垂直滚动位置
             * @param left {number} 水平滚动位置
             * @param isOffset {boolean} 可选参数，默认是false，是否是滚动增加量，如 top=1 代表往上滚动1像素
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.setScrollPosition = function (top, left, isOffset) {
                if (isOffset === void 0) { isOffset = false; }
                if (isOffset && top == 0 && left == 0)
                    return;
                if (!isOffset && this._ScrV_Props_._scrollTop == top
                    && this._ScrV_Props_._scrollLeft == left)
                    return;
                var oldTop = this._ScrV_Props_._scrollTop, oldLeft = this._ScrV_Props_._scrollLeft;
                if (isOffset) {
                    var maxLeft = this.getMaxScrollLeft();
                    var maxTop = this.getMaxScrollTop();
                    if (oldTop <= 0 || oldTop >= maxTop) {
                        top = top / 2;
                    }
                    if (oldLeft <= 0 || oldLeft >= maxLeft) {
                        left = left / 2;
                    }
                    var newTop = oldTop + top;
                    var newLeft = oldLeft + left;
                    //判断是否回弹
                    var bounces = this._ScrV_Props_._bounces;
                    if (!bounces) {
                        if (newTop <= 0 || newTop >= maxTop)
                            newTop = Math.max(0, Math.min(newTop, maxTop));
                        if (newLeft <= 0 || newLeft >= maxLeft)
                            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
                    }
                    this._ScrV_Props_._scrollTop = newTop;
                    this._ScrV_Props_._scrollLeft = newLeft;
                }
                else {
                    this._ScrV_Props_._scrollTop = top;
                    this._ScrV_Props_._scrollLeft = left;
                }
                this._validatePosition(true, true);
                this._updateContentPosition();
            };
            /**
             * @private
             *
             * @param top
             * @param left
             */
            ScrollerView.prototype._validatePosition = function (top, left) {
                if (top === void 0) { top = false; }
                if (left === void 0) { left = false; }
                if (top) {
                    var height = this.height;
                    var contentHeight = this._getContentHeight();
                    this._ScrV_Props_._scrollTop = Math.max(this._ScrV_Props_._scrollTop, (0 - height) / 2);
                    this._ScrV_Props_._scrollTop = Math.min(this._ScrV_Props_._scrollTop, contentHeight > height ? (contentHeight - height / 2) : height / 2);
                }
                if (left) {
                    var width = this.width;
                    var contentWidth = this._getContentWidth();
                    this._ScrV_Props_._scrollLeft = Math.max(this._ScrV_Props_._scrollLeft, (0 - width) / 2);
                    this._ScrV_Props_._scrollLeft = Math.min(this._ScrV_Props_._scrollLeft, contentWidth > width ? (contentWidth - width / 2) : width / 2);
                }
            };
            /**
             * @private
             * @inheritDoc
             */
            ScrollerView.prototype.$setWidth = function (value) {
                if (this.$getExplicitWidth() == value) {
                    return false;
                }
                var result = _super.prototype.$setWidth.call(this, value);
                this._updateContentPosition();
                return result;
            };
            /**
             * @private
             * @inheritDoc
             */
            ScrollerView.prototype.$setHeight = function (value) {
                if (this.$getExplicitHeight() == value)
                    return false;
                var result = _super.prototype.$setHeight.call(this, value);
                this._updateContentPosition();
                return result;
            };
            /**
             * @private
             *
             */
            ScrollerView.prototype._updateContentPosition = function () {
                var height = this.height;
                var width = this.width;
                //这里将坐标取整，避免有些浏览器精度低产生“黑线”问题
                this.scrollRect = new egret.Rectangle(Math.round(this._ScrV_Props_._scrollLeft), Math.round(this._ScrV_Props_._scrollTop), width, height);
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._checkScrollPolicy = function () {
                var hpolicy = this._ScrV_Props_._horizontalScrollPolicy;
                var hCanScroll = this.__checkScrollPolicy(hpolicy, this._getContentWidth(), this.width);
                this._ScrV_Props_._hCanScroll = hCanScroll;
                var vpolicy = this._ScrV_Props_._verticalScrollPolicy;
                var vCanScroll = this.__checkScrollPolicy(vpolicy, this._getContentHeight(), this.height);
                this._ScrV_Props_._vCanScroll = vCanScroll;
                return hCanScroll || vCanScroll;
            };
            /**
             * @private
             *
             * @param policy
             * @param contentLength
             * @param viewLength
             * @returns
             */
            ScrollerView.prototype.__checkScrollPolicy = function (policy, contentLength, viewLength) {
                if (policy == "on")
                    return true;
                if (policy == "off")
                    return false;
                return contentLength > viewLength;
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._addEvents = function () {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, true);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, true);
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._removeEvents = function () {
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, true);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, true);
            };
            /**
             * @private
             *
             * @param e
             */
            ScrollerView.prototype._onTouchBegin = function (e) {
                if (e.$isDefaultPrevented) {
                    return;
                }
                var canScroll = this._checkScrollPolicy();
                if (!canScroll) {
                    return;
                }
                this._ScrV_Props_._touchStartPosition.x = e.stageX;
                this._ScrV_Props_._touchStartPosition.y = e.stageY;
                if (this._ScrV_Props_._isHTweenPlaying || this._ScrV_Props_._isVTweenPlaying) {
                    this._onScrollFinished();
                }
                this._tempStage = this.stage;
                this._tempStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
                this._tempStage.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
                this._tempStage.addEventListener(egret.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
                this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
                this._logTouchEvent(e);
                e.preventDefault();
            };
            /**
             * @private
             *
             * @param event
             */
            ScrollerView.prototype._onTouchBeginCapture = function (event) {
                var canScroll = this._checkScrollPolicy();
                if (!canScroll) {
                    return;
                }
                var target = event.target;
                while (target != this) {
                    if ("_checkScrollPolicy" in target) {
                        canScroll = target._checkScrollPolicy();
                        if (canScroll) {
                            return;
                        }
                    }
                    target = target.parent;
                }
                event.stopPropagation();
                var evt = this.cloneTouchEvent(event);
                this.delayTouchBeginEvent = evt;
                if (!this.touchBeginTimer) {
                    this.touchBeginTimer = new egret.Timer(100, 1);
                    this.touchBeginTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this);
                }
                this.touchBeginTimer.start();
                this._onTouchBegin(event);
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype._onTouchEndCapture = function (event) {
                var _this = this;
                if (!this.delayTouchBeginEvent) {
                    return;
                }
                this._onTouchBeginTimer();
                event.stopPropagation();
                var evt = this.cloneTouchEvent(event);
                egret.callLater(function () {
                    if (_this.stage) {
                        _this.dispatchPropagationEvent(evt);
                    }
                }, this);
            };
            /**
             * @private
             *
             */
            ScrollerView.prototype._onTouchBeginTimer = function () {
                this.touchBeginTimer.stop();
                var event = this.delayTouchBeginEvent;
                this.delayTouchBeginEvent = null;
                //Dispatch event only if the scroll view is still on the stage
                if (this.stage)
                    this.dispatchPropagationEvent(event);
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype.dispatchPropagationEvent = function (event) {
                var target = event.$target;
                var list = this.$getPropagationList(target);
                var length = list.length;
                var targetIndex = list.length * 0.5;
                var startIndex = -1;
                for (var i = 0; i < length; i++) {
                    if (list[i] === this._content) {
                        startIndex = i;
                        break;
                    }
                }
                list.splice(0, startIndex + 1);
                targetIndex -= startIndex + 1;
                this.$dispatchPropagationEvent(event, list, targetIndex);
                egret.Event.release(event);
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype._onTouchMove = function (event) {
                if (this._ScrV_Props_._lastTouchPosition.x == event.stageX && this._ScrV_Props_._lastTouchPosition.y == event.stageY)
                    return;
                if (!this._ScrV_Props_._scrollStarted) {
                    var x = event.stageX - this._ScrV_Props_._touchStartPosition.x, y = event.stageY - this._ScrV_Props_._touchStartPosition.y;
                    var distance = Math.sqrt(x * x + y * y);
                    if (distance < this.scrollBeginThreshold) {
                        this._logTouchEvent(event);
                        return;
                    }
                }
                this._ScrV_Props_._scrollStarted = true;
                if (this.delayTouchBeginEvent) {
                    this.delayTouchBeginEvent = null;
                    this.touchBeginTimer.stop();
                }
                this.touchChildren = false;
                var offset = this._getPointChange(event);
                this.setScrollPosition(offset.y, offset.x, true);
                this._calcVelocitys(event);
                this._logTouchEvent(event);
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype._onTouchEnd = function (event) {
                this.touchChildren = true;
                this._ScrV_Props_._scrollStarted = false;
                this._tempStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
                this._tempStage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
                this._tempStage.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
                this.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
                this._moveAfterTouchEnd();
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype._onEnterFrame = function (event) {
                var time = egret.getTimer();
                if (time - this._ScrV_Props_._lastTouchTime > 100 && time - this._ScrV_Props_._lastTouchTime < 300) {
                    this._calcVelocitys(this._ScrV_Props_._lastTouchEvent);
                }
            };
            /**
             * @private
             *
             * @param e
             * @returns
             */
            ScrollerView.prototype._logTouchEvent = function (e) {
                this._ScrV_Props_._lastTouchPosition.x = e.stageX;
                this._ScrV_Props_._lastTouchPosition.y = e.stageY;
                this._ScrV_Props_._lastTouchEvent = this.cloneTouchEvent(e);
                this._ScrV_Props_._lastTouchTime = egret.getTimer();
            };
            /**
             * @private
             *
             * @param e
             * @returns
             */
            ScrollerView.prototype._getPointChange = function (e) {
                return {
                    x: this._ScrV_Props_._hCanScroll === false ? 0 : (this._ScrV_Props_._lastTouchPosition.x - e.stageX),
                    y: this._ScrV_Props_._vCanScroll === false ? 0 : (this._ScrV_Props_._lastTouchPosition.y - e.stageY)
                };
            };
            /**
             * @private
             *
             * @param e
             * @returns
             */
            ScrollerView.prototype._calcVelocitys = function (e) {
                var time = egret.getTimer();
                if (this._ScrV_Props_._lastTouchTime == 0) {
                    this._ScrV_Props_._lastTouchTime = time;
                    return;
                }
                var change = this._getPointChange(e);
                var timeoffset = time - this._ScrV_Props_._lastTouchTime;
                change.x /= timeoffset;
                change.y /= timeoffset;
                this._ScrV_Props_._velocitys.push(change);
                if (this._ScrV_Props_._velocitys.length > 5)
                    this._ScrV_Props_._velocitys.shift();
                this._ScrV_Props_._lastTouchPosition.x = e.stageX;
                this._ScrV_Props_._lastTouchPosition.y = e.stageY;
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._getContentWidth = function () {
                return this._content.$getExplicitWidth() || this._content.width;
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._getContentHeight = function () {
                return this._content.$getExplicitHeight() || this._content.height;
            };
            /**
             * The left side of the maximum distance
             * @returns The left side of the maximum distance
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 距离左侧的最大值
             * @returns 距离左侧最大值
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.getMaxScrollLeft = function () {
                var max = this._getContentWidth() - this.width;
                return Math.max(0, max);
            };
            /**
             * Above the maximum distance
             * @returns Above the maximum distance
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 距离上方最大值
             * @returns 距离上方最大值
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.getMaxScrollTop = function () {
                var max = this._getContentHeight() - this.height;
                return Math.max(0, max);
            };
            /**
             * @private
             *
             */
            ScrollerView.prototype._moveAfterTouchEnd = function () {
                if (this._ScrV_Props_._velocitys.length == 0)
                    return;
                var sum = { x: 0, y: 0 }, totalW = 0;
                for (var i = 0; i < this._ScrV_Props_._velocitys.length; i++) {
                    var v = this._ScrV_Props_._velocitys[i];
                    var w = ScrollerView.weight[i];
                    sum.x += v.x * w;
                    sum.y += v.y * w;
                    totalW += w;
                }
                this._ScrV_Props_._velocitys.length = 0;
                if (this.scrollSpeed <= 0)
                    this.scrollSpeed = 1;
                var x = sum.x / totalW * this.scrollSpeed, y = sum.y / totalW * this.scrollSpeed;
                var pixelsPerMSX = Math.abs(x), pixelsPerMSY = Math.abs(y);
                var maxLeft = this.getMaxScrollLeft();
                var maxTop = this.getMaxScrollTop();
                var datax = pixelsPerMSX > 0.02 ? this.getAnimationDatas(x, this._ScrV_Props_._scrollLeft, maxLeft) : {
                    position: this._ScrV_Props_._scrollLeft,
                    duration: 1
                };
                var datay = pixelsPerMSY > 0.02 ? this.getAnimationDatas(y, this._ScrV_Props_._scrollTop, maxTop) : {
                    position: this._ScrV_Props_._scrollTop,
                    duration: 1
                };
                this.setScrollLeft(datax.position, datax.duration);
                this.setScrollTop(datay.position, datay.duration);
            };
            /**
             * @private
             *
             * @param tw
             */
            ScrollerView.prototype.onTweenFinished = function (tw) {
                if (tw == this._ScrV_Props_._vScrollTween)
                    this._ScrV_Props_._isVTweenPlaying = false;
                if (tw == this._ScrV_Props_._hScrollTween)
                    this._ScrV_Props_._isHTweenPlaying = false;
                if (this._ScrV_Props_._isHTweenPlaying == false && this._ScrV_Props_._isVTweenPlaying == false) {
                    this._onScrollFinished();
                }
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._onScrollStarted = function () {
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype._onScrollFinished = function () {
                gui.ScrollerTween.removeTweens(this);
                this._ScrV_Props_._hScrollTween = null;
                this._ScrV_Props_._vScrollTween = null;
                this._ScrV_Props_._isHTweenPlaying = false;
                this._ScrV_Props_._isVTweenPlaying = false;
                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            };
            /**
             * Set the scroll position above the distance
             * @param scrollTop Position above distance
             * @param duration Easing of time, in milliseconds
             * @returns Get tween vertical scrolling
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 设置滚动距离上方的位置
             * @param scrollTop 距离上方的位置
             * @param duration 缓动时间，毫秒单位
             * @returns 获取垂直滚动的tween
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.setScrollTop = function (scrollTop, duration) {
                if (duration === void 0) { duration = 0; }
                var finalPosition = Math.min(this.getMaxScrollTop(), Math.max(scrollTop, 0));
                if (duration == 0) {
                    this.scrollTop = finalPosition;
                    return;
                }
                if (this._ScrV_Props_._bounces == false)
                    scrollTop = finalPosition;
                var vtween = gui.ScrollerTween.get(this).to({ scrollTop: scrollTop }, duration, gui.ScrollerEase.quartOut);
                if (finalPosition != scrollTop) {
                    vtween.to({ scrollTop: finalPosition }, 300, gui.ScrollerEase.quintOut);
                }
                this._ScrV_Props_._isVTweenPlaying = true;
                this._ScrV_Props_._vScrollTween = vtween;
                vtween.call(this.onTweenFinished, this, [vtween]);
                if (!this._ScrV_Props_._isHTweenPlaying)
                    this._onScrollStarted();
            };
            /**
             * Set the scroll position from the left side
             * @param scrollLeft From the position on the left side
             * @param duration Get tween vertical scrolling
             * @returns Gets the horizontal scroll tween
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 设置滚动距离左侧的位置
             * @param scrollLeft 距离左侧的位置
             * @param duration 缓动时间，毫秒单位
             * @returns 获取水平滚动的tween
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            ScrollerView.prototype.setScrollLeft = function (scrollLeft, duration) {
                if (duration === void 0) { duration = 0; }
                var finalPosition = Math.min(this.getMaxScrollLeft(), Math.max(scrollLeft, 0));
                if (duration == 0) {
                    this.scrollLeft = finalPosition;
                    return;
                }
                if (this._ScrV_Props_._bounces == false)
                    scrollLeft = finalPosition;
                var htween = gui.ScrollerTween.get(this).to({ scrollLeft: scrollLeft }, duration, gui.ScrollerEase.quartOut);
                if (finalPosition != scrollLeft) {
                    htween.to({ scrollLeft: finalPosition }, 300, gui.ScrollerEase.quintOut);
                }
                this._ScrV_Props_._isHTweenPlaying = true;
                this._ScrV_Props_._hScrollTween = htween;
                htween.call(this.onTweenFinished, this, [htween]);
                if (!this._ScrV_Props_._isVTweenPlaying)
                    this._onScrollStarted();
            };
            /**
             * @private
             *
             * @param pixelsPerMS
             * @param curPos
             * @param maxPos
             * @returns
             */
            ScrollerView.prototype.getAnimationDatas = function (pixelsPerMS, curPos, maxPos) {
                var absPixelsPerMS = Math.abs(pixelsPerMS);
                var extraFricition = 0.95;
                var duration = 0;
                var friction = 0.998;
                var minVelocity = 0.02;
                var posTo = curPos + pixelsPerMS * 500;
                if (posTo < 0 || posTo > maxPos) {
                    posTo = curPos;
                    while (Math.abs(pixelsPerMS) != Infinity && Math.abs(pixelsPerMS) > minVelocity) {
                        posTo += pixelsPerMS;
                        if (posTo < 0 || posTo > maxPos) {
                            pixelsPerMS *= friction * extraFricition;
                        }
                        else {
                            pixelsPerMS *= friction;
                        }
                        duration++;
                    }
                }
                else {
                    duration = -Math.log(minVelocity / absPixelsPerMS) * 500;
                }
                var result = {
                    position: Math.min(maxPos + 50, Math.max(posTo, -50)),
                    duration: duration
                };
                return result;
            };
            /**
             * @private
             *
             * @param event
             * @returns
             */
            ScrollerView.prototype.cloneTouchEvent = function (event) {
                var evt = new egret.TouchEvent(event.type, event.bubbles, event.cancelable);
                evt.touchPointID = event.touchPointID;
                evt.$stageX = event.stageX;
                evt.$stageY = event.stageY;
                //evt.ctrlKey = event.ctrlKey;
                //evt.altKey = event.altKey;
                //evt.shiftKey = event.shiftKey;
                evt.touchDown = event.touchDown;
                evt.$isDefaultPrevented = false;
                evt.$target = event.target;
                return evt;
            };
            /**
             * @private
             *
             * @returns
             */
            ScrollerView.prototype.throwNotSupportedError = function () {
                egret.$error(1023);
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.addChild = function (child) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.addChildAt = function (child, index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.removeChild = function (child) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.removeChildAt = function (index) {
                this.throwNotSupportedError();
                return null;
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.setChildIndex = function (child, index) {
                this.throwNotSupportedError();
            };
            /**
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.swapChildren = function (child1, child2) {
                this.throwNotSupportedError();
            };
            /**
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             * @version Egret 2.4
             * @platform Web,Native
             */
            ScrollerView.prototype.swapChildrenAt = function (index1, index2) {
                this.throwNotSupportedError();
            };
            ScrollerView.prototype.$measureContentBounds = function (bounds) {
                bounds.setTo(0, 0, this.width, this.height);
            };
            /**
             * @inheritDoc
             */
            ScrollerView.prototype.$hitTest = function (stageX, stageY) {
                var childTouched = _super.prototype.$hitTest.call(this, stageX, stageY);
                if (childTouched)
                    return childTouched;
                //return Sprite.prototype.$hitTest.call(this, stageX, stageY);
                if (!this.$visible) {
                    return null;
                }
                var m = this.$getInvertedConcatenatedMatrix();
                var bounds = this.$getContentBounds();
                var localX = m.a * stageX + m.c * stageY + m.tx;
                var localY = m.b * stageX + m.d * stageY + m.ty;
                if (bounds.contains(localX, localY)) {
                    if (!this.$children) {
                        var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                        if (rect && !rect.contains(localX, localY)) {
                            return null;
                        }
                        if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                            return null;
                        }
                    }
                    return this;
                }
                return null;
            };
            return ScrollerView;
        }(egret.DisplayObjectContainer));
        /**
         * @private
         */
        ScrollerView.weight = [1, 1.33, 1.66, 2, 2.33];
        gui.ScrollerView = ScrollerView;
        __reflect(ScrollerView.prototype, "egret.gui.ScrollerView");
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
