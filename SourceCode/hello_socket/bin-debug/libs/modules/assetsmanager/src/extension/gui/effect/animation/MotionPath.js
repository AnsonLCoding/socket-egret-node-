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
    var gui;
    (function (gui) {
        /**
         * @class egret.gui.MotionPath
         * @classdesc
         * MotionPath 类定义效果的 Keyframe 对象的集合，以及要设置动画的目标上属性的名称。
         */
        var MotionPath = (function () {
            /**
             * @param property 要设置动画的目标上属性的名称。
             * @method egret.gui.MotionPath#constructor
             */
            function MotionPath(property) {
                if (property === void 0) { property = null; }
                this.interpolator = gui.NumberInterpolator.getInstance();
                this.property = property;
            }
            /**
             * 返回此 MotionPath 对象的副本（包含每个关键帧的副本）。
             */
            MotionPath.prototype.clone = function () {
                var mp = new MotionPath(this.property);
                mp.interpolator = this.interpolator;
                if (this.keyframes !== null) {
                    mp.keyframes = new Array();
                    for (var i = 0; i < this.keyframes.length; ++i)
                        mp.keyframes[i] = this.keyframes[i].clone();
                }
                return mp;
            };
            /**
             * 计算每一个关键帧的timeFraction值
             */
            MotionPath.prototype._scaleKeyframes = function (duration) {
                var n = this.keyframes.length;
                for (var i = 0; i < n; ++i) {
                    var kf = this.keyframes[i];
                    kf._timeFraction = kf.time / duration;
                }
            };
            /**
             * 给定已过去时间部分的情况下，计算并返回一个内插值。
             * 该函数决定该部分所处于的关键帧时间间隔，
             * 然后在该时间间隔内插补该时间间隔的定界关键帧值之间的值。
             * @param fraction 效果的总体持续时间部分（从 0.0 到 1.0 之间的值）。
             * @return 内插值
             */
            MotionPath.prototype.getValue = function (fraction) {
                if (!this.keyframes)
                    return null;
                var n = this.keyframes.length;
                if (n == 2 && this.keyframes[1]._timeFraction == 1) {
                    var easedF = (this.keyframes[1].easer != null) ?
                        this.keyframes[1].easer.ease(fraction) :
                        fraction;
                    return this.interpolator.interpolate(easedF, this.keyframes[0].value, this.keyframes[1].value);
                }
                if (isNaN(this.keyframes[0]._timeFraction))
                    this._scaleKeyframes(this.keyframes[this.keyframes.length - 1].time);
                var prevT = 0;
                var prevValue = this.keyframes[0].value;
                for (var i = 1; i < n; ++i) {
                    var kf = this.keyframes[i];
                    if (fraction >= prevT && fraction < kf._timeFraction) {
                        var t = (fraction - prevT) / (kf._timeFraction - prevT);
                        var easedT = (kf.easer != null) ? kf.easer.ease(t) : t;
                        return this.interpolator.interpolate(easedT, prevValue, kf.value);
                    }
                    prevT = kf._timeFraction;
                    prevValue = kf.value;
                }
                return this.keyframes[n - 1].value;
            };
            return MotionPath;
        }());
        gui.MotionPath = MotionPath;
        __reflect(MotionPath.prototype, "egret.gui.MotionPath");
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
