var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var InterruptionBehavior = (function () {
            function InterruptionBehavior() {
            }
            return InterruptionBehavior;
        }());
        /**
         * 指定一个过渡（可中断另一个正在运行的过渡）在开始之前结束另一个过渡。
         * 通过对过渡中的所有效果调用 end() 方法来结束过渡。end() 方法导致所有效果到达结束状态。
         */
        InterruptionBehavior.END = "end";
        /**
         * 指定一个过渡（可中断另一个正在运行的过渡）在开始之前停止正在进行的其它过渡。
         * 通过对过渡中的所有效果调用 stop() 方法来停止过渡。
         */
        InterruptionBehavior.STOP = "stop";
        gui.InterruptionBehavior = InterruptionBehavior;
        __reflect(InterruptionBehavior.prototype, "egret.gui.InterruptionBehavior");
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
