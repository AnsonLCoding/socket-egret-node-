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
    /**
     * @private
     * 格式化旋转角度的值
     */
    function clampRotation(value) {
        value %= 360;
        if (value > 180) {
            value -= 360;
        }
        else if (value < -180) {
            value += 360;
        }
        return value;
    }
    /**
     * The DisplayObject class is the base class for all objects that can be placed on the display list. The display list
     * manages all objects displayed in the runtime. Use the DisplayObjectContainer class to arrange the display
     * objects in the display list. DisplayObjectContainer objects can have child display objects, while other display objects,
     * such as Shape and TextField objects, are "leaf" nodes that have only parents and siblings, no children.
     * The DisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced
     * properties of the object such as its transformation matrix.<br/>
     * The DisplayObject class contains several broadcast events.Normally, the target of any particular event is a specific
     * DisplayObject instance. For example, the target of an added event is the specific DisplayObject instance that was added
     * to the display list. Having a single target restricts the placement of event listeners to that target and in some cases
     * the target's ancestors on the display list. With broadcast events, however, the target is not a specific DisplayObject
     * instance, but rather all DisplayObject instances, including those that are not on the display list. This means that you
     * can add a listener to any DisplayObject instance to listen for broadcast events.
     *
     * @event egret.Event.ADDED Dispatched when a display object is added to the display list.
     * @event egret.Event.ADDED_TO_STAGE Dispatched when a display object is added to the on stage display list, either directly or through the addition of a sub tree in which the display object is contained.
     * @event egret.Event.REMOVED Dispatched when a display object is about to be removed from the display list.
     * @event egret.Event.REMOVED_FROM_STAGE Dispatched when a display object is about to be removed from the display list, either directly or through the removal of a sub tree in which the display object is contained.
     * @event egret.Event.ENTER_FRAME [broadcast event] Dispatched when the playhead is entering a new frame.
     * @event egret.Event.RENDER [broadcast event] Dispatched when the display list is about to be updated and rendered.
     * @event egret.TouchEvent.TOUCH_MOVE Dispatched when the user touches the device, and is continuously dispatched until the point of contact is removed.
     * @event egret.TouchEvent.TOUCH_BEGIN Dispatched when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_END Dispatched when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_TAP Dispatched when the user lifts the point of contact over the same DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @event egret.TouchEvent.TOUCH_RELEASE_OUTSIDE Dispatched when the user lifts the point of contact over the different DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObject.ts
     * @language en_US
     */
    /**
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列
     * 显示列表中的显示对象。DisplayObjectContainer 对象可以有子显示对象，而其他显示对象（如 Shape 和 TextField 对象）是“叶”节点，没有子项，只有父级和
     * 同级。DisplayObject 类有一些基本的属性（如确定坐标位置的 x 和 y 属性），也有一些高级的对象属性（如 Matrix 矩阵变换）。<br/>
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。例如，added 事件的目标是已添加到显示列表
     * 的目标 DisplayObject 实例。若只有一个目标，则会将事件侦听器限制为只能监听在该目标上（在某些情况下，可监听在显示列表中该目标的祖代上）。
     * 但是对于广播事件，目标不是特定的 DisplayObject 实例，而是所有 DisplayObject 实例（包括那些不在显示列表中的实例）。这意味着您可以向任何
     * DisplayObject 实例添加侦听器来侦听广播事件。
     *
     * @event egret.Event.ADDED 将显示对象添加到显示列表中时调度。
     * @event egret.Event.ADDED_TO_STAGE 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
     * @event egret.Event.REMOVED 将要从显示列表中删除显示对象时调度。
     * @event egret.Event.REMOVED_FROM_STAGE 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
     * @event egret.Event.ENTER_FRAME [广播事件] 播放头进入新帧时调度。
     * @event egret.Event.RENDER [广播事件] 将要更新和呈现显示列表时调度。
     * @event egret.TouchEvent.TOUCH_MOVE 当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
     * @event egret.TouchEvent.TOUCH_BEGIN 当用户第一次触摸启用触摸的设备时（例如，用手指触摸手机屏幕）调度。
     * @event egret.TouchEvent.TOUCH_END 当用户移除与启用触摸的设备的接触时（例如，将手指从屏幕上抬起）调度。
     * @event egret.TouchEvent.TOUCH_TAP 当用户在启用触摸设备上的已启动接触的同一 DisplayObject 实例上抬起接触点时（例如，手机点击屏幕后抬起）调度。
     * @event egret.TouchEvent.TOUCH_RELEASE_OUTSIDE 当用户在启用触摸设备上的已启动接触的不同 DisplayObject 实例上抬起接触点时（例如，按住屏幕上的某个对象,然后从它上面挪开后再松开手指）调度。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/DisplayObject.ts
     * @language zh_CN
     */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        /**
         * Initializes a DisplayObject object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个显示对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function DisplayObject() {
            var _this = _super.call(this) || this;
            /**
             * @private
             * 能够含有子项的类将子项列表存储在这个属性里。
             */
            _this.$children = null;
            /**
             * @private
             */
            _this.$parent = null;
            /**
             * @private
             */
            _this.$stage = null;
            /**
             * @private
             * 这个对象在显示列表中的嵌套深度，舞台为1，它的子项为2，子项的子项为3，以此类推。当对象不在显示列表中时此属性值为0.
             */
            _this.$nestLevel = 0;
            /**
             * @private
             */
            _this.$visible = true;
            /**
             * @private
             * cacheAsBitmap创建的缓存位图节点。
             */
            _this.$displayList = null;
            /**
             * @private
             */
            _this.$alpha = 1;
            _this.$touchEnabled = DisplayObject.defaultTouchEnabled;
            /**
             * @private
             */
            _this.$scrollRect = null;
            /**
             * @private
             */
            _this.$blendMode = 0;
            /**
             * @private
             * 被遮罩的对象
             */
            _this.$maskedObject = null;
            /**
             * @private
             */
            _this.$mask = null;
            /**
             * @private
             */
            _this.$maskRect = null;
            /**
             * @private
             */
            _this.$parentDisplayList = null;
            /**
             * @private
             * 渲染节点,不为空表示自身有绘制到屏幕的内容
             */
            _this.$renderNode = null;
            _this.$displayFlags = 2032 /* InitFlags */;
            _this.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new egret.Matrix(),
                7: new egret.Matrix(),
                8: new egret.Matrix(),
                9: new egret.Rectangle(),
                10: new egret.Rectangle(),
                11: false,
                12: 0,
                13: 0,
                14: NaN,
                15: NaN,
                16: 0,
                17: 0,
                18: 0,
                19: null,
                20: null //filters
            };
            return _this;
        }
        /**
         * @private
         * 添加一个标志量
         */
        DisplayObject.prototype.$setFlags = function (flags) {
            this.$displayFlags |= flags;
        };
        /**
         * @private
         * 移除一个标志量
         */
        DisplayObject.prototype.$removeFlags = function (flags) {
            this.$displayFlags &= ~flags;
        };
        /**
         * @private
         * 沿着显示列表向上移除标志量，如果标志量没被设置过就停止移除。
         */
        DisplayObject.prototype.$removeFlagsUp = function (flags) {
            if (!this.$hasAnyFlags(flags)) {
                return;
            }
            this.$removeFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$removeFlagsUp(flags);
            }
        };
        /**
         * @private
         * 是否含有指定的所有标志量
         */
        DisplayObject.prototype.$hasFlags = function (flags) {
            return (this.$displayFlags & flags) == flags;
        };
        /**
         * @private
         * 沿着显示列表向上传递标志量，如果标志量已经被设置过就停止传递。
         */
        DisplayObject.prototype.$propagateFlagsUp = function (flags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$propagateFlagsUp(flags);
            }
        };
        /**
         * @private
         * 沿着显示列表向下传递标志量，非容器直接设置自身的flag，此方法会在 DisplayObjectContainer 中被覆盖。
         */
        DisplayObject.prototype.$propagateFlagsDown = function (flags, cachedBreak) {
            if (cachedBreak === void 0) { cachedBreak = false; }
            this.$setFlags(flags);
        };
        /**
         * @private
         * 是否含有多个标志量其中之一。
         */
        DisplayObject.prototype.$hasAnyFlags = function (flags) {
            return !!(this.$displayFlags & flags);
        };
        /**
         * @private
         * 标记矩阵失效
         */
        DisplayObject.prototype.$invalidateMatrix = function () {
            this.$setFlags(8 /* InvalidMatrix */);
            this.$invalidatePosition();
        };
        /**
         * @private
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        DisplayObject.prototype.$invalidatePosition = function () {
            var self = this;
            self.$invalidateTransform();
            self.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ |
                32 /* InvalidInvertedConcatenatedMatrix */);
            if (self.$parent) {
                self.$parent.$propagateFlagsUp(4 /* InvalidBounds */);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "name", {
            /**
             * Indicates the instance name of the DisplayObject. The object can be identified in the child list of its parent
             * display object container by calling the getChildByName() method of the display object container.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示 DisplayObject 的实例名称。
             * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DisplayObject[5 /* name */];
            },
            set: function (value) {
                this.$DisplayObject[5 /* name */] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "parent", {
            /**
             * Indicates the DisplayObjectContainer object that contains this display object. Use the parent property to specify
             * a relative path to display objects that are above the current display object in the display list hierarchy.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示包含此显示对象的 DisplayObjectContainer 对象。
             * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$parent;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 设置父级显示对象
         */
        DisplayObject.prototype.$setParent = function (parent) {
            if (this.$parent == parent) {
                return false;
            }
            this.$parent = parent;
            return true;
        };
        /**
         * @private
         * 显示对象添加到舞台
         */
        DisplayObject.prototype.$onAddToStage = function (stage, nestLevel) {
            this.$stage = stage;
            this.$nestLevel = nestLevel;
            this.$hasAddToStage = true;
            egret.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this);
        };
        /**
         * @private
         * 显示对象从舞台移除
         */
        DisplayObject.prototype.$onRemoveFromStage = function () {
            this.$nestLevel = 0;
            egret.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        };
        Object.defineProperty(DisplayObject.prototype, "stage", {
            /**
             * The Stage of the display object. you can create and load multiple display objects into the display list, and
             * the stage property of each display object refers to the same Stage object.<br/>
             * If a display object is not added to the display list, its stage property is set to null.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 显示对象的舞台。
             * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指向相同的 Stage 对象。<br/>
             * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "matrix", {
            /**
             * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.<br/>
             * Note: to change the value of a display object's matrix, you must make a copy of the entire matrix object, then copy
             * the new object into the matrix property of the display object.
             * @example the following code increases the tx value of a display object's matrix
             * <pre>
             *     let myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。<br/>
             * 注意：要改变一个显示对象矩阵的值，您必引用整个矩阵对象，然后将它重新赋值给显示对象的 matrix 属性。
             * @example 以下代码改变了显示对象矩阵的tx属性值：
             * <pre>
             *     let myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getMatrix().clone();
            },
            set: function (value) {
                this.$setMatrix(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取矩阵
         */
        DisplayObject.prototype.$getMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(8 /* InvalidMatrix */)) {
                values[6 /* matrix */].$updateScaleAndRotation(values[0 /* scaleX */], values[1 /* scaleY */], values[2 /* skewX */], values[3 /* skewY */]);
                this.$removeFlags(8 /* InvalidMatrix */);
            }
            return values[6 /* matrix */];
        };
        /**
         * @private
         * 设置矩阵
         */
        DisplayObject.prototype.$setMatrix = function (matrix, needUpdateProperties) {
            if (needUpdateProperties === void 0) { needUpdateProperties = true; }
            var self = this;
            var values = self.$DisplayObject;
            var m = values[6 /* matrix */];
            if (m.equals(matrix)) {
                return false;
            }
            m.copyFrom(matrix);
            if (needUpdateProperties) {
                values[0 /* scaleX */] = m.$getScaleX();
                values[1 /* scaleY */] = m.$getScaleY();
                values[2 /* skewX */] = matrix.$getSkewX();
                values[3 /* skewY */] = matrix.$getSkewY();
                values[16 /* skewXdeg */] = clampRotation(values[2 /* skewX */] * 180 / Math.PI);
                values[17 /* skewYdeg */] = clampRotation(values[3 /* skewY */] * 180 / Math.PI);
                values[4 /* rotation */] = clampRotation(values[3 /* skewY */] * 180 / Math.PI);
            }
            self.$removeFlags(8 /* InvalidMatrix */);
            self.$invalidatePosition();
            return true;
        };
        /**
         * @private
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        DisplayObject.prototype.$getConcatenatedMatrix = function () {
            var matrix = this.$DisplayObject[7 /* concatenatedMatrix */];
            if (this.$hasFlags(16 /* InvalidConcatenatedMatrix */)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), matrix);
                }
                else {
                    matrix.copyFrom(this.$getMatrix());
                }
                var values = this.$DisplayObject;
                var offsetX = values[12 /* anchorOffsetX */];
                var offsetY = values[13 /* anchorOffsetY */];
                var rect = this.$scrollRect;
                if (rect) {
                    matrix.$preMultiplyInto(egret.$TempMatrix.setTo(1, 0, 0, 1, -rect.x - offsetX, -rect.y - offsetY), matrix);
                }
                else if (offsetX != 0 || offsetY != 0) {
                    matrix.$preMultiplyInto(egret.$TempMatrix.setTo(1, 0, 0, 1, -offsetX, -offsetY), matrix);
                }
                if (this.$displayList) {
                    this.$displayList.$renderNode.moved = true;
                }
                if (this.$renderNode) {
                    this.$renderNode.moved = true;
                }
                this.$removeFlags(16 /* InvalidConcatenatedMatrix */);
            }
            return matrix;
        };
        /**
         * @private
         * 获取链接矩阵
         */
        DisplayObject.prototype.$getInvertedConcatenatedMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(32 /* InvalidInvertedConcatenatedMatrix */)) {
                this.$getConcatenatedMatrix().$invertInto(values[8 /* invertedConcatenatedMatrix */]);
                this.$removeFlags(32 /* InvalidInvertedConcatenatedMatrix */);
            }
            return values[8 /* invertedConcatenatedMatrix */];
        };
        Object.defineProperty(DisplayObject.prototype, "x", {
            /**
             * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer.<br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer
             * rotated 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is
             * rotated 90° counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。<br/>
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getX();
            },
            set: function (value) {
                this.$setX(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取x坐标
         */
        DisplayObject.prototype.$getX = function () {
            return this.$DisplayObject[6 /* matrix */].tx;
        };
        /**
         * @private
         * 设置x坐标
         */
        DisplayObject.prototype.$setX = function (value) {
            value = +value || 0;
            var m = this.$DisplayObject[6 /* matrix */];
            if (value == m.tx) {
                return false;
            }
            m.tx = value;
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "y", {
            /**
             * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer. <br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated
             * 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90°
             * counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。<br/>
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getY();
            },
            set: function (value) {
                this.$setY(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取y坐标
         */
        DisplayObject.prototype.$getY = function () {
            return this.$DisplayObject[6 /* matrix */].ty;
        };
        /**
         * @private
         * 设置y坐标
         */
        DisplayObject.prototype.$setY = function (value) {
            value = +value || 0;
            var m = this.$DisplayObject[6 /* matrix */];
            if (value == m.ty) {
                return false;
            }
            m.ty = value;
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            /**
             * Indicates the horizontal scale (percentage) of the object as applied from the registration point. <br/>
             * The default 1.0 equals 100% scale.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示从注册点开始应用的对象的水平缩放比例（百分比）。<br/>
             * 1.0 等于 100% 缩放。
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getScaleX();
            },
            set: function (value) {
                this.$setScaleX(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getScaleX = function () {
            return this.$DisplayObject[0 /* scaleX */];
        };
        /**
         * @private
         * 设置水平缩放值
         */
        DisplayObject.prototype.$setScaleX = function (value) {
            value = +value || 0;
            var values = this.$DisplayObject;
            if (value == values[0 /* scaleX */]) {
                return false;
            }
            values[0 /* scaleX */] = value;
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            /**
             * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
             * 1.0 is 100% scale.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。1.0 是 100% 缩放。
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getScaleY();
            },
            set: function (value) {
                this.$setScaleY(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getScaleY = function () {
            return this.$DisplayObject[1 /* scaleY */];
        };
        /**
         * @private
         * 设置垂直缩放值
         */
        DisplayObject.prototype.$setScaleY = function (value) {
            value = +value || 0;
            if (value == this.$DisplayObject[1 /* scaleY */]) {
                return false;
            }
            this.$DisplayObject[1 /* scaleY */] = value;
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            /**
             * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation. Values from
             * 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation. Values outside
             * this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement
             * myDisplayObject.rotation = 450 is the same as myDisplayObject.rotation = 90.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
             * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
             * 减去 360 获得该范围内的值。例如，myDisplayObject.rotation = 450语句与 myDisplayObject.rotation = 90 是相同的。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getRotation();
            },
            set: function (value) {
                this.$setRotation(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getRotation = function () {
            return this.$DisplayObject[4 /* rotation */];
        };
        DisplayObject.prototype.$setRotation = function (value) {
            value = +value || 0;
            value = clampRotation(value);
            var values = this.$DisplayObject;
            if (value == values[4 /* rotation */]) {
                return false;
            }
            var delta = value - values[4 /* rotation */];
            var angle = delta / 180 * Math.PI;
            values[2 /* skewX */] += angle;
            values[3 /* skewY */] += angle;
            values[4 /* rotation */] = value;
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "skewX", {
            /**
             * 表示DisplayObject的x方向斜切
             * @member {number} egret.DisplayObject#skewX
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$DisplayObject[16 /* skewXdeg */];
            },
            set: function (value) {
                this.$setSkewX(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DisplayObject.prototype.$setSkewX = function (value) {
            value = +value || 0;
            var values = this.$DisplayObject;
            if (value == values[16 /* skewXdeg */]) {
                return false;
            }
            values[16 /* skewXdeg */] = value;
            value = clampRotation(value);
            value = value / 180 * Math.PI;
            values[2 /* skewX */] = value;
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "skewY", {
            /**
             * 表示DisplayObject的y方向斜切
             * @member {number} egret.DisplayObject#skewY
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$DisplayObject[17 /* skewYdeg */];
            },
            set: function (value) {
                this.$setSkewY(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DisplayObject.prototype.$setSkewY = function (value) {
            value = +value || 0;
            var values = this.$DisplayObject;
            if (value == values[17 /* skewYdeg */]) {
                return false;
            }
            values[17 /* skewYdeg */] = value;
            value = clampRotation(value);
            value = value / 180 * Math.PI;
            values[3 /* skewY */] = value;
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "width", {
            /**
             * Indicates the width of the display object, in pixels. The width is calculated based on the bounds of the content
             * of the display object.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getWidth();
            },
            set: function (value) {
                this.$setWidth(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取显示宽度
         */
        DisplayObject.prototype.$getWidth = function () {
            return isNaN(this.$getExplicitWidth()) ? this.$getOriginalBounds().width : this.$getExplicitWidth();
            //return this.$getTransformedBounds(this.$parent, $TempRectangle).width;
        };
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getExplicitWidth = function () {
            return this.$DisplayObject[14 /* explicitWidth */];
        };
        /**
         * @private
         * 设置显示宽度
         */
        DisplayObject.prototype.$setWidth = function (value) {
            this.$DisplayObject[14 /* explicitWidth */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return false;
            }
            // if (false) {
            //     let values = this.$DisplayObject;
            //     let originalBounds = this.$getOriginalBounds();
            //     let bounds = this.$getTransformedBounds(this.$parent, $TempRectangle);
            //     let angle = values[Keys.rotation] / 180 * Math.PI;
            //     let baseWidth = originalBounds.$getBaseWidth(angle);
            //     if (!baseWidth) {
            //         return false;
            //     }
            //     let baseHeight = originalBounds.$getBaseHeight(angle);
            //     values[Keys.scaleY] = bounds.height / baseHeight;
            //     values[Keys.scaleX] = value / baseWidth;
            // }
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "height", {
            /**
             * Indicates the height of the display object, in pixels. The height is calculated based on the bounds of the
             * content of the display object.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getHeight();
            },
            set: function (value) {
                this.$setHeight(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取显示高度
         */
        DisplayObject.prototype.$getHeight = function () {
            return isNaN(this.$getExplicitHeight()) ? this.$getOriginalBounds().height : this.$getExplicitHeight();
            //return this.$getTransformedBounds(this.$parent, $TempRectangle).height;
        };
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getExplicitHeight = function () {
            return this.$DisplayObject[15 /* explicitHeight */];
        };
        /**
         * @private
         * 设置显示高度
         */
        DisplayObject.prototype.$setHeight = function (value) {
            this.$DisplayObject[15 /* explicitHeight */] = isNaN(value) ? NaN : value;
            value = +value;
            if (value < 0) {
                return false;
            }
            // if (false) {
            //     let values = this.$DisplayObject;
            //     let originalBounds = this.$getOriginalBounds();
            //     let bounds = this.$getTransformedBounds(this.$parent, $TempRectangle);
            //     let angle = values[Keys.rotation] / 180 * Math.PI;
            //     let baseHeight = originalBounds.$getBaseHeight(angle);
            //     if (!baseHeight) {
            //         return false;
            //     }
            //     let baseWidth = originalBounds.$getBaseWidth(angle);
            //     values[Keys.scaleY] = value / baseHeight;
            //     values[Keys.scaleX] = bounds.width / baseWidth;
            // }
            this.$invalidateMatrix();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "measuredWidth", {
            /**
             * 测量宽度
             * @returns {number}
             * @member {egret.Rectangle} egret.DisplayObject#measuredWidth
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$getOriginalBounds().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "measuredHeight", {
            /**
             * 测量高度
             * @returns {number}
             * @member {egret.Rectangle} egret.DisplayObject#measuredWidth
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$getOriginalBounds().height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetX", {
            /**
             * X represents the object of which is the anchor.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示从对象绝对锚点X。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DisplayObject[12 /* anchorOffsetX */];
            },
            set: function (value) {
                this.$setAnchorOffsetX(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        DisplayObject.prototype.$getAnchorOffsetX = function () {
            return this.$DisplayObject[12 /* anchorOffsetX */];
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        DisplayObject.prototype.$setAnchorOffsetX = function (value) {
            value = +value || 0;
            if (value == this.$DisplayObject[12 /* anchorOffsetX */]) {
                return false;
            }
            this.$DisplayObject[12 /* anchorOffsetX */] = value;
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetY", {
            /**
             * Y represents the object of which is the anchor.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示从对象绝对锚点Y。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DisplayObject[13 /* anchorOffsetY */];
            },
            set: function (value) {
                this.$setAnchorOffsetY(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        DisplayObject.prototype.$getAnchorOffsetY = function () {
            return this.$DisplayObject[13 /* anchorOffsetY */];
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        DisplayObject.prototype.$setAnchorOffsetY = function (value) {
            value = +value || 0;
            if (value == this.$DisplayObject[13 /* anchorOffsetY */]) {
                return false;
            }
            this.$DisplayObject[13 /* anchorOffsetY */] = value;
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            /**
             * Whether or not the display object is visible. Display objects that are not visible are disabled. For example,
             * if visible=false for an DisplayObject instance, it cannot receive touch or other user input.
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 显示对象是否可见。不可见的显示对象将被禁用。例如，如果实例的 visible 为 false，则无法接受触摸或用户交互操作。
             * @default true
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$visible;
            },
            set: function (value) {
                this.$setVisible(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.$setVisible = function (value) {
            value = !!value;
            if (value == this.$visible) {
                return false;
            }
            this.$visible = value;
            this.$propagateFlagsDown(1024 /* InvalidConcatenatedVisible */);
            this.$invalidateTransform();
            return true;
        };
        /**
         * @private
         * 获取这个显示对象跟它所有父级透明度的乘积
         */
        DisplayObject.prototype.$getConcatenatedVisible = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(1024 /* InvalidConcatenatedVisible */)) {
                if (this.$parent) {
                    var parentVisible = this.$parent.$getConcatenatedVisible();
                    values[19 /* concatenatedVisible */] = parentVisible && this.$visible;
                }
                else {
                    values[19 /* concatenatedVisible */] = this.$visible;
                }
                this.$removeFlags(1024 /* InvalidConcatenatedVisible */);
            }
            return values[19 /* concatenatedVisible */];
        };
        Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
            /**
             * If set to true, Egret runtime caches an internal bitmap representation of the display object. This caching can
             * increase performance for display objects that contain complex vector content. After you set the cacheAsBitmap
             * property to true, the rendering does not change, however the display object performs pixel snapping automatically.
             * The execution speed can be significantly faster depending on the complexity of the content.The cacheAsBitmap
             * property is best used with display objects that have mostly static content and that do not scale and rotate frequently.<br/>
             * Note: The display object will not create the bitmap caching when the memory exceeds the upper limit,even if you set it to true.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 如果设置为 true，则 Egret 运行时将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
             * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
             * 具体取决于显示对象内容的复杂性。最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放或旋转的显示对象一起使用。<br/>
             * 注意：在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DisplayObject[11 /* cacheAsBitmap */];
            },
            set: function (value) {
                value = !!value;
                this.$DisplayObject[11 /* cacheAsBitmap */] = value;
                this.$setHasDisplayList(value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.$setHasDisplayList = function (value) {
            var hasDisplayList = !!this.$displayList;
            if (hasDisplayList == value) {
                return;
            }
            if (value) {
                var displayList = egret.sys.DisplayList.create(this);
                if (displayList) {
                    this.$displayList = displayList;
                    if (this.$parentDisplayList) {
                        this.$parentDisplayList.markDirty(displayList);
                    }
                    this.$cacheAsBitmapChanged();
                }
            }
            else {
                this.$displayList = null;
                this.$cacheAsBitmapChanged();
            }
        };
        /**
         * @private
         * cacheAsBitmap属性改变
         */
        DisplayObject.prototype.$cacheAsBitmapChanged = function () {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if (this.$renderNode && parentCache) {
                parentCache.markDirty(this);
            }
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ |
                32 /* InvalidInvertedConcatenatedMatrix */);
        };
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            /**
             * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent) to 1 (fully opaque).
             * The default value is 1. Display objects with alpha set to 0 are active, even though they are invisible.
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 表示指定对象的 Alpha 透明度值。
             * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是可触摸的，即使它们不可见。
             * @default 1
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$alpha;
            },
            set: function (value) {
                this.$setAlpha(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DisplayObject.prototype.$setAlpha = function (value) {
            value = +value || 0;
            if (value == this.$alpha) {
                return false;
            }
            this.$alpha = value;
            this.$propagateFlagsDown(64 /* InvalidConcatenatedAlpha */);
            this.$invalidate();
            return true;
        };
        /**
         * @private
         * 获取这个显示对象跟它所有父级透明度的乘积
         */
        DisplayObject.prototype.$getConcatenatedAlpha = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(64 /* InvalidConcatenatedAlpha */)) {
                if (this.$parent) {
                    var parentAlpha = this.$parent.$getConcatenatedAlpha();
                    values[18 /* concatenatedAlpha */] = parentAlpha * this.$alpha;
                }
                else {
                    values[18 /* concatenatedAlpha */] = this.$alpha;
                }
                this.$removeFlags(64 /* InvalidConcatenatedAlpha */);
            }
            return values[18 /* concatenatedAlpha */];
        };
        Object.defineProperty(DisplayObject.prototype, "touchEnabled", {
            /**
             * Specifies whether this object receives touch or other user input. The default value is false, which means that
             * by default any DisplayObject instance that is on the display list cannot receive touch events. If touchEnabled is
             * set to false, the instance does not receive any touch events (or other user input events). Any children of
             * this instance on the display list are not affected. To change the touchEnabled behavior for all children of
             * an object on the display list, use DisplayObjectContainer.touchChildren.
             * @see egret.DisplayObjectContainer#touchChildren
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指定此对象是否接收触摸或其他用户输入。默认值为 false，这表示默认情况下，显示列表上的任何 DisplayObject 实例都不会接收触摸事件或
             * 其他用户输入事件。如果将 touchEnabled 设置为 false，则实例将不接收任何触摸事件（或其他用户输入事件）。显示列表上的该实例的任
             * 何子级都不会受到影响。要更改显示列表上对象的所有子级的 touchEnabled 行为，请使用 DisplayObjectContainer.touchChildren。
             * @see egret.DisplayObjectContainer#touchChildren
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$getTouchEnabled();
            },
            set: function (value) {
                this.$setTouchEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        DisplayObject.prototype.$getTouchEnabled = function () {
            return this.$touchEnabled;
        };
        /**
         * @private
         */
        DisplayObject.prototype.$setTouchEnabled = function (value) {
            if (this.$touchEnabled == value) {
                return false;
            }
            this.$touchEnabled = value;
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "scrollRect", {
            /**
             * The scroll rectangle bounds of the display object. The display object is cropped to the size defined by the rectangle,
             * and it scrolls within the rectangle when you change the x and y properties of the scrollRect object. A scrolled display
             * object always scrolls in whole pixel increments.You can scroll an object left and right by setting the x property of
             * the scrollRect Rectangle object. You can scroll an object up and down by setting the y property of the scrollRect
             * Rectangle object. If the display object is rotated 90° and you scroll it left and right, the display object actually
             * scrolls up and down.<br/>
             *
             * Note: to change the value of a display object's scrollRect, you must make a copy of the entire scrollRect object, then copy
             * the new object into the scrollRect property of the display object.
             * @example the following code increases the x value of a display object's scrollRect
             * <pre>
             *     let myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
             * 滚动的显示对象始终以整像素为增量进行滚动。您可以通过设置 scrollRect Rectangle 对象的 x 属性来左右滚动对象， 还可以通过设置
             * scrollRect 对象的 y 属性来上下滚动对象。如果显示对象旋转了 90 度，并且您左右滚动它，则实际上显示对象会上下滚动。<br/>
             *
             * 注意：要改变一个显示对象 scrollRect 属性的值，您必引用整个 scrollRect 对象，然后将它重新赋值给显示对象的 scrollRect 属性。
             * @example 以下代码改变了显示对象 scrollRect 的 x 属性值：
             * <pre>
             *     let myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;//设置完scrollRect的x、y、width、height值之后，一定要对myDisplayObject重新赋值scrollRect，不然会出问题。
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$scrollRect;
            },
            set: function (value) {
                this.$setScrollRect(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DisplayObject.prototype.$setScrollRect = function (value) {
            if (!value && !this.$scrollRect) {
                return false;
            }
            if (value) {
                if (!this.$scrollRect) {
                    this.$scrollRect = new egret.Rectangle();
                }
                this.$scrollRect.copyFrom(value);
            }
            else {
                this.$scrollRect = null;
            }
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "blendMode", {
            /**
             * A value from the BlendMode class that specifies which blend mode to use. Determine how a source image (new one)
             * is drawn on the target image (old one).<br/>
             * If you attempt to set this property to an invalid value, Egret runtime set the value to BlendMode.NORMAL.
             * @default egret.BlendMode.NORMAL
             * @see egret.BlendMode
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上<br/>
             * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
             * @default egret.BlendMode.NORMAL
             * @see egret.BlendMode
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return egret.sys.numberToBlendMode(this.$blendMode);
            },
            set: function (value) {
                var mode = egret.sys.blendModeToNumber(value);
                if (mode == this.$blendMode) {
                    return;
                }
                this.$blendMode = mode;
                this.$invalidateTransform();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mask", {
            /**
             * The calling display object is masked by the specified mask object. To ensure that masking works when the Stage
             * is scaled, the mask display object must be in an active part of the display list. The mask object itself is not drawn.
             * Set mask to null to remove the mask. To be able to scale a mask object, it must be on the display list. To be
             * able to drag a mask object , it must be on the display list.<br/>
             * Note: A single mask object cannot be used to mask more than one calling display object. When the mask is assigned
             * to a second display object, it is removed as the mask of the first object, and that object's mask property becomes null.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
             * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
             * 对象，它必须在显示列表中。<br/>
             * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
             * 该对象的 mask 属性将变为 null。
             *
             * 下面例子为 mask 为 Rectangle 类型对象，这种情况下，修改 mask 的值后，一定要对 myDisplayObject 重新赋值 mask，不然会出问题。
             * @example 以下代码改变了显示对象 mask 的 x 属性值：
             * <pre>
             *     let myMask:Rectangle = myDisplayObject.mask;
             *     myMask.x += 10;
             *     myDisplayObject.mask = myMask;//设置完 mask 的x、y、width、height值之后，一定要对myDisplayObject重新赋值 mask，不然会出问题。
             * </pre>
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$mask ? this.$mask : this.$maskRect;
            },
            set: function (value) {
                if (value === this) {
                    return;
                }
                if (value) {
                    if (value instanceof DisplayObject) {
                        if (value == this.$mask) {
                            return;
                        }
                        if (value.$maskedObject) {
                            value.$maskedObject.mask = null;
                        }
                        value.$maskedObject = this;
                        value.$invalidateTransform();
                        this.$mask = value;
                        this.$maskRect = null;
                    }
                    else {
                        this.$setMaskRect(value);
                        if (this.$mask) {
                            this.$mask.$maskedObject = null;
                            this.$mask.$invalidateTransform();
                        }
                        this.$mask = null;
                    }
                }
                else {
                    if (this.$mask) {
                        this.$mask.$maskedObject = null;
                        this.$mask.$invalidateTransform();
                    }
                    this.$mask = null;
                    this.$maskRect = null;
                }
                this.$invalidateTransform();
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.$setMaskRect = function (value) {
            if (!value && !this.$maskRect) {
                return false;
            }
            if (value) {
                if (!this.$maskRect) {
                    this.$maskRect = new egret.Rectangle();
                }
                this.$maskRect.copyFrom(value);
            }
            else {
                this.$maskRect = null;
            }
            this.$invalidatePosition();
            return true;
        };
        Object.defineProperty(DisplayObject.prototype, "filters", {
            /**
             * An indexed array that contains each filter object currently associated with the display object.
             * @version Egret 3.1.0
             * @platform Web
             * @language en_US
             */
            /**
             * 包含当前与显示对象关联的每个滤镜对象的索引数组。
             * @version Egret 3.1.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$DisplayObject[20 /* filters */];
            },
            set: function (value) {
                var filters = this.$DisplayObject[20 /* filters */];
                if (!filters && !value) {
                    this.$DisplayObject[20 /* filters */] = value;
                    return;
                }
                this.$invalidateContentBounds();
                //需要通知子项
                this.$invalidate(true);
                if (filters && filters.length) {
                    var length_1 = filters.length;
                    for (var i = 0; i < length_1; i++) {
                        filters[i].$removeTarget(this);
                    }
                }
                this.$DisplayObject[20 /* filters */] = value;
                if (value && value.length) {
                    var length_2 = value.length;
                    for (var i = 0; i < length_2; i++) {
                        value[i].$addTarget(this);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 获取filters
         */
        DisplayObject.prototype.$getFilters = function () {
            return this.$DisplayObject[20 /* filters */];
        };
        /**
         * Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
         * @param targetCoordinateSpace The display object that defines the coordinate system to use.
         * @param resultRect A reusable instance of Rectangle for saving the results. Passing this parameter can reduce the number of reallocate objects
         *, which allows you to get better code execution performance..
         * @returns The rectangle that defines the area of the display object relative to the targetCoordinateSpace object's coordinate system.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 一个用于存储结果的可复用Rectangle实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        DisplayObject.prototype.getTransformedBounds = function (targetCoordinateSpace, resultRect) {
            targetCoordinateSpace = targetCoordinateSpace || this;
            return this.$getTransformedBounds(targetCoordinateSpace, resultRect);
        };
        /**
         * Obtain measurement boundary of display object
         * @param resultRect {Rectangle} Optional. It is used to import Rectangle object for saving results, preventing duplicate object creation.
         * @param calculateAnchor {boolean} Optional. It is used to determine whether to calculate anchor point.
         * @returns {Rectangle}
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取显示对象的测量边界
         * @param resultRect {Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
         * @param calculateAnchor {boolean} 可选参数，是否会计算锚点。
         * @returns {Rectangle}
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        DisplayObject.prototype.getBounds = function (resultRect, calculateAnchor) {
            if (calculateAnchor === void 0) { calculateAnchor = true; }
            resultRect = this.$getTransformedBounds(this, resultRect);
            if (calculateAnchor) {
                var values = this.$DisplayObject;
                if (values[12 /* anchorOffsetX */] != 0 || values[13 /* anchorOffsetY */] != 0) {
                    resultRect.x -= values[12 /* anchorOffsetX */];
                    resultRect.y -= values[13 /* anchorOffsetY */];
                }
            }
            return resultRect;
        };
        /**
         * @private
         */
        DisplayObject.prototype.$getTransformedBounds = function (targetCoordinateSpace, resultRect) {
            var bounds = this.$getOriginalBounds();
            if (!resultRect) {
                resultRect = new egret.Rectangle();
            }
            resultRect.copyFrom(bounds);
            if (targetCoordinateSpace == this) {
                return resultRect;
            }
            var m;
            if (targetCoordinateSpace) {
                m = egret.$TempMatrix;
                var invertedTargetMatrix = targetCoordinateSpace.$getInvertedConcatenatedMatrix();
                invertedTargetMatrix.$preMultiplyInto(this.$getConcatenatedMatrix(), m);
            }
            else {
                m = this.$getConcatenatedMatrix();
            }
            m.$transformBounds(resultRect);
            return resultRect;
        };
        /**
         * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates.
         * @param stageX the x value in the global coordinates
         * @param stageY the y value in the global coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns A Point object with coordinates relative to the display object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        DisplayObject.prototype.globalToLocal = function (stageX, stageY, resultPoint) {
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            var m = this.$getInvertedConcatenatedMatrix();
            return m.transformPoint(stageX, stageY, resultPoint);
        };
        /**
         * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates.
         * @param localX the x value in the local coordinates
         * @param localY the x value in the local coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns  A Point object with coordinates relative to the Stage.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将显示对象的（本地）坐标转换为舞台（全局）坐标。
         * @param localX 本地坐标 x
         * @param localY 本地坐标 y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 一个具有相对于舞台坐标的 Point 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        DisplayObject.prototype.localToGlobal = function (localX, localY, resultPoint) {
            if (localX === void 0) { localX = 0; }
            if (localY === void 0) { localY = 0; }
            var m = this.$getConcatenatedMatrix();
            return m.transformPoint(localX, localY, resultPoint);
        };
        /**
         * @private
         * 标记自身的测量尺寸失效
         */
        DisplayObject.prototype.$invalidateContentBounds = function () {
            this.$invalidate();
            this.$setFlags(2 /* InvalidContentBounds */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * @private
         * 获取显示对象占用的矩形区域集合，通常包括自身绘制的测量区域，如果是容器，还包括所有子项占据的区域。
         */
        DisplayObject.prototype.$getOriginalBounds = function () {
            var bounds = this.$DisplayObject[9 /* bounds */];
            if (this.$hasFlags(4 /* InvalidBounds */)) {
                bounds.copyFrom(this.$getContentBounds());
                this.$measureChildBounds(bounds);
                this.$removeFlags(4 /* InvalidBounds */);
                if (this.$displayList) {
                    this.$displayList.$renderNode.moved = true;
                }
                var offset = this.$measureFiltersOffset(false);
                if (offset) {
                    bounds.x += offset.minX;
                    bounds.y += offset.minY;
                    bounds.width += -offset.minX + offset.maxX;
                    bounds.height += -offset.minY + offset.maxY;
                }
            }
            return bounds;
        };
        /**
         * @private
         * 测量子项占用的矩形区域
         * @param bounds 测量结果存储在这个矩形对象内
         */
        DisplayObject.prototype.$measureChildBounds = function (bounds) {
        };
        /**
         * @private
         */
        DisplayObject.prototype.$getContentBounds = function () {
            var bounds = this.$DisplayObject[10 /* contentBounds */];
            if (this.$hasFlags(2 /* InvalidContentBounds */)) {
                this.$measureContentBounds(bounds);
                if (this.$renderNode) {
                    this.$renderNode.moved = true;
                }
                this.$removeFlags(2 /* InvalidContentBounds */);
            }
            return bounds;
        };
        /**
         * @private
         * 测量自身占用的矩形区域，注意：此测量结果并不包括子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        DisplayObject.prototype.$measureContentBounds = function (bounds) {
        };
        /**
         * @private
         * 标记此显示对象需要重绘。此方法会触发自身的cacheAsBitmap重绘。如果只是矩阵改变，自身显示内容并不改变，应该调用$invalidateTransform().
         * @param notiryChildren 是否标记子项也需要重绘。传入false或不传入，将只标记自身需要重绘。注意:当子项cache时不会继续向下标记
         */
        DisplayObject.prototype.$invalidate = function (notifyChildren) {
            if (!this.$renderNode || this.$hasFlags(256 /* DirtyRender */ | 128 /* InvalidRenderNodes */)) {
                return;
            }
            this.$setFlags(256 /* DirtyRender */ | 128 /* InvalidRenderNodes */);
            var displayList = this.$displayList ? this.$displayList : this.$parentDisplayList;
            if (displayList) {
                displayList.markDirty(this);
            }
        };
        /**
         * @private
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        DisplayObject.prototype.$invalidateTransform = function () {
            var self = this;
            if (self.$hasFlags(512 /* DirtyChildren */)) {
                return;
            }
            self.$setFlags(512 /* DirtyChildren */);
            var displayList = self.$displayList;
            if ((displayList || self.$renderNode) && self.$parentDisplayList) {
                self.$parentDisplayList.markDirty(displayList || self);
            }
        };
        /**
         * @private
         * 获取渲染节点
         */
        DisplayObject.prototype.$getRenderNode = function () {
            var node = this.$renderNode;
            if (!node) {
                return null;
            }
            if (this.$displayFlags & 128 /* InvalidRenderNodes */) {
                node.cleanBeforeRender();
                this.$render();
                this.$removeFlags(128 /* InvalidRenderNodes */);
                node = this.$renderNode;
            }
            return node;
        };
        /**
         * @private
         * 更新对象在舞台上的显示区域,返回显示区域是否发生改变。
         */
        DisplayObject.prototype.$update = function (dirtyRegionPolicy, bounds) {
            var self = this;
            self.$removeFlagsUp(768 /* Dirty */);
            var node = self.$renderNode;
            node.renderAlpha = self.$getConcatenatedAlpha();
            //必须在访问moved属性前调用以下两个方法，因为moved属性在以下两个方法内重置。
            var concatenatedMatrix = self.$getConcatenatedMatrix();
            if (dirtyRegionPolicy == egret.DirtyRegionPolicy.OFF) {
                var displayList = self.$displayList || self.$parentDisplayList;
                if (!displayList) {
                    return false;
                }
                var matrix = node.renderMatrix;
                matrix.copyFrom(concatenatedMatrix);
                var root_1 = displayList.root;
                if (root_1 !== self.$stage) {
                    self.$getConcatenatedMatrixAt(root_1, matrix);
                }
            }
            else {
                var renderBounds = bounds || self.$getContentBounds();
                node.renderVisible = self.$getConcatenatedVisible();
                var displayList = self.$displayList || self.$parentDisplayList;
                var region = node.renderRegion;
                if (!displayList) {
                    region.setTo(0, 0, 0, 0);
                    node.moved = false;
                    return false;
                }
                if (!node.moved) {
                    return false;
                }
                node.moved = false;
                var matrix = node.renderMatrix;
                matrix.copyFrom(concatenatedMatrix);
                var root_2 = displayList.root;
                if (root_2 !== self.$stage) {
                    self.$getConcatenatedMatrixAt(root_2, matrix);
                }
                region.updateRegion(renderBounds, matrix);
                var offset = self.$measureFiltersOffset(true);
                if (offset) {
                    region.minX += offset.minX;
                    region.minY += offset.minY;
                    region.maxX += offset.maxX;
                    region.maxY += offset.maxY;
                    region.updateArea();
                }
            }
            return true;
        };
        /**
         * @private
         */
        DisplayObject.prototype.$measureFiltersOffset = function (fromParent) {
            var display = this;
            var minX = 0;
            var minY = 0;
            var maxX = 0;
            var maxY = 0;
            while (display) {
                var filters = display.$DisplayObject[20 /* filters */];
                if (filters && filters.length) {
                    var length_3 = filters.length;
                    for (var i = 0; i < length_3; i++) {
                        var filter = filters[i];
                        //todo 缓存这个数据
                        if (filter.type == "blur") {
                            var offsetX = filter.blurX;
                            var offsetY = filter.blurY;
                            minX -= offsetX;
                            minY -= offsetY;
                            maxX += offsetX;
                            maxY += offsetY;
                        }
                        else if (filter.type == "glow") {
                            var offsetX = filter.blurX;
                            var offsetY = filter.blurY;
                            minX -= offsetX;
                            minY -= offsetY;
                            maxX += offsetX;
                            maxY += offsetY;
                            var distance = filter.distance || 0;
                            var angle = filter.angle || 0;
                            var distanceX = 0;
                            var distanceY = 0;
                            if (distance != 0) {
                                distanceX = distance * egret.NumberUtils.cos(angle);
                                if (distanceX > 0) {
                                    distanceX = Math.ceil(distanceX);
                                }
                                else {
                                    distanceX = Math.floor(distanceX);
                                }
                                distanceY = distance * egret.NumberUtils.sin(angle);
                                if (distanceY > 0) {
                                    distanceY = Math.ceil(distanceY);
                                }
                                else {
                                    distanceY = Math.floor(distanceY);
                                }
                                minX += distanceX;
                                maxX += distanceX;
                                minY += distanceY;
                                maxY += distanceY;
                            }
                        }
                        else if (filter.type == "custom") {
                            var padding = filter.padding;
                            minX -= padding;
                            minY -= padding;
                            maxX += padding;
                            maxY += padding;
                        }
                    }
                }
                if (fromParent) {
                    display = display.$parent;
                }
                else {
                    display = null;
                }
            }
            minX = Math.min(minX, 0);
            minY = Math.min(minY, 0);
            maxX = Math.max(maxX, 0);
            maxY = Math.max(maxY, 0);
            return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
        };
        /**
         * @private
         * 获取相对于指定根节点的连接矩阵。
         * @param root 根节点显示对象
         * @param matrix 目标显示对象相对于舞台的完整连接矩阵。
         */
        DisplayObject.prototype.$getConcatenatedMatrixAt = function (root, matrix) {
            var invertMatrix = root.$getInvertedConcatenatedMatrix();
            if (invertMatrix.a === 0 || invertMatrix.d === 0) {
                var target = this;
                var rootLevel = root.$nestLevel;
                matrix.identity();
                while (target.$nestLevel > rootLevel) {
                    var rect = target.$scrollRect;
                    if (rect) {
                        matrix.concat(egret.$TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y));
                    }
                    matrix.concat(target.$getMatrix());
                    target = target.$parent;
                }
            }
            else {
                invertMatrix.$preMultiplyInto(matrix, matrix);
            }
        };
        DisplayObject.prototype.$getConcatenatedAlphaAt = function (root, alpha) {
            var rootAlpha = root.$getConcatenatedAlpha();
            if (rootAlpha === 0) {
                alpha = 1;
                var target = this;
                var rootLevel = root.$nestLevel;
                while (target.$nestLevel > rootLevel) {
                    alpha *= target.$alpha;
                    target = target.$parent;
                }
            }
            else {
                alpha /= rootAlpha;
            }
            return alpha;
        };
        /**
         * @private
         * 执行渲染,绘制自身到屏幕
         */
        DisplayObject.prototype.$render = function () {
        };
        /**
         * @private
         */
        DisplayObject.prototype.$hitTest = function (stageX, stageY) {
            var values = this.$DisplayObject;
            if (!this.$renderNode || !this.$visible || values[0 /* scaleX */] == 0 || values[1 /* scaleY */] == 0) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            if (m.a == 0 && m.b == 0 && m.c == 0 && m.d == 0) {
                return null;
            }
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
        /**
         * Calculate the display object to determine whether it overlaps or crosses with the points specified by the x and y parameters. The x and y parameters specify the points in the coordinates of the stage, rather than the points in the display object container that contains display objects (except the situation where the display object container is a stage).
         * Note: Don't use accurate pixel collision detection on a large number of objects. Otherwise, this will cause serious performance deterioration.
         * @param x {number}  x coordinate of the object to be tested.
         * @param y {number}  y coordinate of the object to be tested.
         * @param shapeFlag {boolean} Whether to check the actual pixel of object (true) or check that of border (false).Write realized.
         * @returns {boolean} If display object overlaps or crosses with the specified point, it is true; otherwise, it is false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
         * 注意，不要在大量物体中使用精确碰撞像素检测，这回带来巨大的性能开销
         * @param x {number}  要测试的此对象的 x 坐标。
         * @param y {number}  要测试的此对象的 y 坐标。
         * @param shapeFlag {boolean} 是检查对象 (true) 的实际像素，还是检查边框 (false) 的实际像素。
         * @returns {boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
            if (!shapeFlag) {
                var values = this.$DisplayObject;
                if (values[0 /* scaleX */] == 0 || values[1 /* scaleY */] == 0) {
                    return false;
                }
                var m = this.$getInvertedConcatenatedMatrix();
                var bounds = this.getBounds(null, false);
                var localX = m.a * x + m.c * y + m.tx;
                var localY = m.b * x + m.d * y + m.ty;
                if (bounds.contains(localX, localY)) {
                    //这里不考虑设置mask的情况
                    var rect = this.$scrollRect ? this.$scrollRect : this.$maskRect;
                    if (rect && !rect.contains(localX, localY)) {
                        return false;
                    }
                    return true;
                }
                return false;
            }
            else {
                var m = this.$getInvertedConcatenatedMatrix();
                var localX = m.a * x + m.c * y + m.tx;
                var localY = m.b * x + m.d * y + m.ty;
                var data = void 0;
                var displayList = this.$displayList;
                if (displayList) {
                    var buffer = displayList.renderBuffer;
                    try {
                        data = buffer.getPixels(localX - displayList.offsetX, localY - displayList.offsetY);
                    }
                    catch (e) {
                        throw new Error(egret.sys.tr(1039));
                    }
                }
                else {
                    var buffer = egret.sys.customHitTestBuffer;
                    buffer.resize(3, 3);
                    var matrix = egret.Matrix.create();
                    matrix.identity();
                    matrix.translate(1 - localX, 1 - localY);
                    egret.sys.systemRenderer.render(this, buffer, matrix, null, true);
                    egret.Matrix.release(matrix);
                    try {
                        data = buffer.getPixels(1, 1);
                    }
                    catch (e) {
                        throw new Error(egret.sys.tr(1039));
                    }
                }
                if (data[3] === 0) {
                    return false;
                }
                return true;
            }
        };
        /**
         * @private
         */
        DisplayObject.prototype.$addListener = function (type, listener, thisObject, useCapture, priority, dispatchOnce) {
            _super.prototype.$addListener.call(this, type, listener, thisObject, useCapture, priority, dispatchOnce);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if (isEnterFrame || type == egret.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                if (list.indexOf(this) == -1) {
                    list.push(this);
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        DisplayObject.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            var isEnterFrame = (type == egret.Event.ENTER_FRAME);
            if ((isEnterFrame || type == egret.Event.RENDER) && !this.hasEventListener(type)) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                var index = list.indexOf(this);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        DisplayObject.prototype.dispatchEvent = function (event) {
            if (!event.$bubbles) {
                return _super.prototype.dispatchEvent.call(this, event);
            }
            var list = this.$getPropagationList(this);
            var targetIndex = list.length * 0.5;
            event.$setTarget(this);
            this.$dispatchPropagationEvent(event, list, targetIndex);
            return !event.$isDefaultPrevented;
        };
        /**
         * @private
         * 获取事件流列表。注意：Egret框架的事件流与Flash实现并不一致。
         *
         * 事件流有三个阶段：捕获，目标，冒泡。
         * Flash里默认的的事件监听若不开启useCapture将监听目标和冒泡阶段。若开始capture将只能监听捕获当不包括目标的事件。
         * 可以在Flash中写一个简单的测试：实例化一个非容器显示对象，例如TextField。分别监听useCapture为true和false时的鼠标事件。
         * 点击后将只有useCapture为false的回调函数输出信息。也就带来一个问题「Flash的捕获阶段不能监听到最内层对象本身，只在父级列表有效」。
         *
         * 而HTML里的事件流设置useCapture为true时是能监听到目标阶段的，也就是目标阶段会被触发两次，在捕获和冒泡过程各触发一次。这样可以避免
         * 前面提到的监听捕获无法监听目标本身的问题。
         *
         * Egret最终采用了HTML里目标节点触发两次的事件流方式。
         */
        DisplayObject.prototype.$getPropagationList = function (target) {
            var list = [];
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            var captureList = list.concat();
            captureList.reverse(); //使用一次reverse()方法比多次调用unshift()性能高。
            list = captureList.concat(list);
            return list;
        };
        /**
         * @private
         */
        DisplayObject.prototype.$dispatchPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            var captureIndex = targetIndex - 1;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event.$currentTarget = currentTarget;
                if (i < captureIndex)
                    event.$eventPhase = 1 /* CAPTURING_PHASE */;
                else if (i == targetIndex || i == captureIndex)
                    event.$eventPhase = 2 /* AT_TARGET */;
                else
                    event.$eventPhase = 3 /* BUBBLING_PHASE */;
                currentTarget.$notifyListener(event, i < targetIndex);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }
        };
        /**
         * @inheritDoc
         * @version Egret 2.4
         * @platform Web,Native
         */
        DisplayObject.prototype.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasEventListener(type))
                    return true;
                parent = parent.$parent;
            }
            return false;
        };
        return DisplayObject;
    }(egret.EventDispatcher));
    /**
     * @private
     * The default touchEnabled property of DisplayObject
     * @default false
     * @version Egret 2.5
     * @platform Web,Native
     * @language en_US
     */
    /**
     * @private
     * 显示对象默认的 touchEnabled 属性
     * @default false
     * @version Egret 2.5
     * @platform Web,Native
     * @language zh_CN
     */
    DisplayObject.defaultTouchEnabled = false;
    DisplayObject.boundsForUpdate = new egret.Rectangle();
    /**
     * @private
     */
    DisplayObject.$enterFrameCallBackList = [];
    /**
     * @private
     */
    DisplayObject.$renderCallBackList = [];
    egret.DisplayObject = DisplayObject;
    __reflect(DisplayObject.prototype, "egret.DisplayObject", ["egret.sys.Renderable"]);
})(egret || (egret = {}));