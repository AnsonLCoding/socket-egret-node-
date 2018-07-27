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
/// <reference path="../core/ClassFactory.ts" />
/// <reference path="supportClasses/ItemRenderer.ts" />
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        /**
         * @class egret.gui.DataGroup
         * @classdesc
         * 数据项目的容器基类
         * 将数据项目转换为可视元素以进行显示。
         * @extends egret.gui.GroupBase
         */
        var DataGroup = (function (_super) {
            __extends(DataGroup, _super);
            /**
             * 构造函数
             * @method egret.gui.DataGroup#constructor
             */
            function DataGroup() {
                var _this = _super.call(this) || this;
                /**
                 * 项呈示器的主机组件
                 */
                _this._rendererOwner = null;
                _this.useVirtualLayoutChanged = false;
                _this.rendererToClassMap = [];
                _this.freeRenderers = [];
                /**
                 * 是否创建了新的项呈示器标志
                 */
                _this.createNewRendererFlag = false;
                _this.cleanTimer = null;
                _this.dataProviderChanged = false;
                _this._dataProvider = null;
                /**
                 * 对象池字典
                 */
                _this.recyclerDic = {};
                /**
                 * 项呈示器改变
                 */
                _this.itemRendererChanged = false;
                /**
                 * 这里不直接使用Class类型是因为JS里不能用对象作为键，所以需要hashCode。而只有实例对象才有hashCode，Class无法作为键。
                 */
                _this._itemRenderer = null;
                _this.itemRendererSkinNameChange = false;
                _this._itemRendererSkinName = null;
                _this._itemRendererFunction = null;
                /**
                 * 正在进行虚拟布局阶段
                 */
                _this.virtualLayoutUnderway = false;
                _this.typicalItemChanged = false;
                /**
                 * 项呈示器的默认尺寸
                 */
                _this.typicalLayoutRect = null;
                /**
                 * 索引到项呈示器的转换数组
                 */
                _this.indexToRenderer = [];
                /**
                 * 清理freeRenderer标志
                 */
                _this.cleanFreeRenderer = false;
                /**
                 * 正在更新数据项的标志
                 */
                _this.renderersBeingUpdated = false;
                return _this;
            }
            Object.defineProperty(DataGroup.prototype, "layout", {
                /**
                 * @member egret.gui.DataGroup#layout
                 */
                get: function () {
                    return this._layout;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (value == this.layout)
                        return;
                    if (this.layout) {
                        this.layout.typicalLayoutRect = null;
                        this.layout.removeEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this);
                    }
                    if (this.layout && value && (this.layout.useVirtualLayout != value.useVirtualLayout))
                        this.changeUseVirtualLayout();
                    this._setLayout(value);
                    if (value) {
                        value.typicalLayoutRect = this.typicalLayoutRect;
                        value.addEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this);
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 是否使用虚拟布局标记改变
             */
            DataGroup.prototype.layout_useVirtualLayoutChangedHandler = function (event) {
                this.changeUseVirtualLayout();
            };
            /**
             * @method egret.gui.DataGroup#setVirtualElementIndicesInView
             * @param startIndex {number}
             * @param endIndex {number}
             */
            DataGroup.prototype.setVirtualElementIndicesInView = function (startIndex, endIndex) {
                if (!this.layout || !this.layout.useVirtualLayout)
                    return;
                this.virtualRendererIndices = [];
                for (var i = startIndex; i <= endIndex; i++) {
                    this.virtualRendererIndices.push(i);
                }
                for (var index in this.indexToRenderer) {
                    var index2 = parseInt(index);
                    if (this.virtualRendererIndices.indexOf(index2) == -1) {
                        this.freeRendererByIndex(index2);
                    }
                }
            };
            /**
             * @method egret.gui.DataGroup#getVirtualElementAt
             * @param index {number}
             * @returns {IVisualElement}
             */
            DataGroup.prototype.getVirtualElementAt = function (index) {
                if (index < 0 || index >= this.dataProvider.length)
                    return null;
                var element = this.indexToRenderer[index];
                if (!element) {
                    var item = this.dataProvider.getItemAt(index);
                    var renderer = this.createVirtualRenderer(index);
                    this.indexToRenderer[index] = renderer;
                    this.updateRenderer(renderer, index, item);
                    if (this.createNewRendererFlag) {
                        if ("validateNow" in renderer)
                            renderer.validateNow();
                        this.createNewRendererFlag = false;
                        gui.RendererExistenceEvent.dispatchRendererExistenceEvent(this, gui.RendererExistenceEvent.RENDERER_ADD, renderer, index, item);
                    }
                    element = renderer;
                }
                return element;
            };
            /**
             * 释放指定索引处的项呈示器
             */
            DataGroup.prototype.freeRendererByIndex = function (index) {
                if (!this.indexToRenderer[index])
                    return;
                var renderer = (this.indexToRenderer[index]);
                delete this.indexToRenderer[index];
                if (renderer && renderer instanceof egret.DisplayObject) {
                    this.doFreeRenderer(renderer);
                }
            };
            /**
             * 释放指定的项呈示器
             */
            DataGroup.prototype.doFreeRenderer = function (renderer) {
                var rendererFactory = this.rendererToClassMap[renderer.hashCode];
                var hashCode = rendererFactory.hashCode;
                if (!this.freeRenderers[hashCode]) {
                    this.freeRenderers[hashCode] = [];
                }
                this.freeRenderers[hashCode].push(renderer);
                renderer.visible = false;
            };
            /**
             * 标记组件，以便在稍后屏幕更新期间调用该组件的 measure() 方法
             * @method egret.gui.DataGroup#invalidateSize
             */
            DataGroup.prototype.invalidateSize = function () {
                if (!this.createNewRendererFlag)
                    _super.prototype.invalidateSize.call(this);
            };
            /**
             * 为指定索引创建虚拟的项呈示器
             */
            DataGroup.prototype.createVirtualRenderer = function (index) {
                var item = this.dataProvider.getItemAt(index);
                var renderer;
                var rendererFactory = this.itemToRendererClass(item);
                var hashCode = rendererFactory.hashCode;
                var freeRenderers = this.freeRenderers;
                if (freeRenderers[hashCode] && freeRenderers[hashCode].length > 0) {
                    renderer = freeRenderers[hashCode].pop();
                    renderer.visible = true;
                    return renderer;
                }
                this.createNewRendererFlag = true;
                return this.createOneRenderer(rendererFactory);
            };
            /**
             * 根据rendererClass创建一个Renderer,并添加到显示列表
             */
            DataGroup.prototype.createOneRenderer = function (rendererFactory) {
                var renderer;
                var hashCode = rendererFactory.hashCode;
                var recycler = this.recyclerDic[hashCode];
                if (recycler) {
                    renderer = recycler.pop();
                    if (recycler.length == 0)
                        delete this.recyclerDic[hashCode];
                }
                if (!renderer) {
                    renderer = (rendererFactory.newInstance());
                    this.rendererToClassMap[renderer.hashCode] = rendererFactory;
                }
                if (!renderer || !(renderer instanceof egret.DisplayObject))
                    return null;
                if (this._itemRendererSkinName) {
                    this.setItemRenderSkinName(renderer);
                }
                this._addToDisplayList(renderer);
                renderer.setLayoutBoundsSize(NaN, NaN);
                return renderer;
            };
            /**
             * 设置项呈示器的默认皮肤
             */
            DataGroup.prototype.setItemRenderSkinName = function (renderer) {
                if (!renderer)
                    return;
                var comp = renderer;
                if (comp) {
                    if (!comp._skinNameExplicitlySet)
                        comp.skinName = this._itemRendererSkinName;
                }
                else {
                    var client = renderer;
                    if (client && !client.skinName)
                        client.skinName = this._itemRendererSkinName;
                }
            };
            /**
             * 虚拟布局结束清理不可见的项呈示器
             */
            DataGroup.prototype.finishVirtualLayout = function () {
                if (!this.virtualLayoutUnderway)
                    return;
                this.virtualLayoutUnderway = false;
                var found = false;
                for (var hashCode in this.freeRenderers) {
                    if (this.freeRenderers[hashCode].length > 0) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    return;
                if (!this.cleanTimer) {
                    this.cleanTimer = new egret.Timer(3000, 1);
                    this.cleanTimer.addEventListener(egret.TimerEvent.TIMER, this.cleanAllFreeRenderer, this);
                }
                //为了提高持续滚动过程中的性能，防止反复地添加移除子项，这里不直接清理而是延迟后在滚动停止时清理一次。
                this.cleanTimer.reset();
                this.cleanTimer.start();
            };
            /**
             * 延迟清理多余的在显示列表中的ItemRenderer。
             */
            DataGroup.prototype.cleanAllFreeRenderer = function (event) {
                if (event === void 0) { event = null; }
                var renderer;
                var freeRenderers = this.freeRenderers;
                for (var hashCode in freeRenderers) {
                    var list = freeRenderers[hashCode];
                    var length_1 = list.length;
                    for (var i = 0; i < length_1; i++) {
                        renderer = list[i];
                        renderer.visible = true;
                        this.recycle(renderer);
                    }
                }
                this.freeRenderers = [];
                this.cleanFreeRenderer = false;
            };
            /**
             * @method egret.gui.DataGroup#getElementIndicesInView
             * @returns {number}
             */
            DataGroup.prototype.getElementIndicesInView = function () {
                if (this.layout && this.layout.useVirtualLayout)
                    return this.virtualRendererIndices ? this.virtualRendererIndices : [];
                return _super.prototype.getElementIndicesInView.call(this);
            };
            /**
             * 更改是否使用虚拟布局
             */
            DataGroup.prototype.changeUseVirtualLayout = function () {
                this.useVirtualLayoutChanged = true;
                this.cleanFreeRenderer = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            };
            Object.defineProperty(DataGroup.prototype, "dataProvider", {
                /**
                 * 列表数据源，请使用实现了ICollection接口的数据类型，例如ArrayCollection
                 * @member egret.gui.DataGroup#dataProvider
                 */
                get: function () {
                    return this._dataProvider;
                },
                set: function (value) {
                    if (this._dataProvider == value)
                        return;
                    this.removeDataProviderListener();
                    this._dataProvider = value;
                    this.dataProviderChanged = true;
                    this.cleanFreeRenderer = true;
                    this.invalidateProperties();
                    this.invalidateSize();
                    this.invalidateDisplayList();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 移除数据源监听
             */
            DataGroup.prototype.removeDataProviderListener = function () {
                if (this._dataProvider)
                    this._dataProvider.removeEventListener(gui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
            };
            /**
             * 数据源改变事件处理
             */
            DataGroup.prototype.onCollectionChange = function (event) {
                switch (event.kind) {
                    case gui.CollectionEventKind.ADD:
                        this.itemAddedHandler(event.items, event.location);
                        break;
                    case gui.CollectionEventKind.MOVE:
                        this.itemMovedHandler(event.items[0], event.location, event.oldLocation);
                        break;
                    case gui.CollectionEventKind.REMOVE:
                        this.itemRemovedHandler(event.items, event.location);
                        break;
                    case gui.CollectionEventKind.UPDATE:
                        this.itemUpdatedHandler(event.items[0], event.location);
                        break;
                    case gui.CollectionEventKind.REPLACE:
                        this.itemRemoved(event.oldItems[0], event.location);
                        this.itemAdded(event.items[0], event.location);
                        break;
                    case gui.CollectionEventKind.RESET:
                    case gui.CollectionEventKind.REFRESH:
                        if (this.layout && this.layout.useVirtualLayout) {
                            for (var index in this.indexToRenderer) {
                                var index2 = parseInt(index);
                                this.freeRendererByIndex(index2);
                            }
                        }
                        this.dataProviderChanged = true;
                        this.invalidateProperties();
                        break;
                }
                this.invalidateSize();
                this.invalidateDisplayList();
            };
            /**
             * 数据源添加项目事件处理
             */
            DataGroup.prototype.itemAddedHandler = function (items, index) {
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    this.itemAdded(items[i], index + i);
                }
                this.resetRenderersIndices();
            };
            /**
             * 数据源移动项目事件处理
             */
            DataGroup.prototype.itemMovedHandler = function (item, location, oldLocation) {
                this.itemRemoved(item, oldLocation);
                this.itemAdded(item, location);
                this.resetRenderersIndices();
            };
            /**
             * 数据源移除项目事件处理
             */
            DataGroup.prototype.itemRemovedHandler = function (items, location) {
                var length = items.length;
                for (var i = length - 1; i >= 0; i--) {
                    this.itemRemoved(items[i], location + i);
                }
                this.resetRenderersIndices();
            };
            /**
             * 添加一项
             */
            DataGroup.prototype.itemAdded = function (item, index) {
                if (this.layout)
                    this.layout.elementAdded(index);
                if (this.layout && this.layout.useVirtualLayout) {
                    var virtualRendererIndices = this.virtualRendererIndices;
                    if (virtualRendererIndices) {
                        var length_2 = virtualRendererIndices.length;
                        for (var i = 0; i < length_2; i++) {
                            var vrIndex = virtualRendererIndices[i];
                            if (vrIndex >= index)
                                virtualRendererIndices[i] = vrIndex + 1;
                        }
                        this.indexToRenderer.splice(index, 0, null);
                    }
                    return;
                }
                var rendererFactory = this.itemToRendererClass(item);
                var renderer = this.createOneRenderer(rendererFactory);
                this.indexToRenderer.splice(index, 0, renderer);
                if (!renderer)
                    return;
                this.updateRenderer(renderer, index, item);
                gui.RendererExistenceEvent.dispatchRendererExistenceEvent(this, gui.RendererExistenceEvent.RENDERER_ADD, renderer, index, item);
            };
            /**
             * 移除一项
             */
            DataGroup.prototype.itemRemoved = function (item, index) {
                if (this.layout)
                    this.layout.elementRemoved(index);
                var virtualRendererIndices = this.virtualRendererIndices;
                if (virtualRendererIndices && (virtualRendererIndices.length > 0)) {
                    var vrItemIndex = -1;
                    var length_3 = virtualRendererIndices.length;
                    for (var i = 0; i < length_3; i++) {
                        var vrIndex = virtualRendererIndices[i];
                        if (vrIndex == index)
                            vrItemIndex = i;
                        else if (vrIndex > index)
                            virtualRendererIndices[i] = vrIndex - 1;
                    }
                    if (vrItemIndex != -1)
                        virtualRendererIndices.splice(vrItemIndex, 1);
                }
                var oldRenderer = this.indexToRenderer[index];
                if (this.indexToRenderer.length > index)
                    this.indexToRenderer.splice(index, 1);
                gui.RendererExistenceEvent.dispatchRendererExistenceEvent(this, gui.RendererExistenceEvent.RENDERER_REMOVE, oldRenderer, index, item);
                if (oldRenderer && oldRenderer instanceof egret.DisplayObject) {
                    this.recycle(oldRenderer);
                }
            };
            /**
             * 回收一个ItemRenderer实例
             */
            DataGroup.prototype.recycle = function (renderer) {
                this._removeFromDisplayList(renderer);
                if ("ownerChanged" in renderer) {
                    renderer.ownerChanged(null);
                }
                var rendererFactory = this.rendererToClassMap[renderer.hashCode];
                var hashCode = rendererFactory.hashCode;
                if (!this.recyclerDic[hashCode]) {
                    this.recyclerDic[hashCode] = [];
                }
                this.recyclerDic[hashCode].push(renderer);
            };
            /**
             * 更新当前所有项的索引
             */
            DataGroup.prototype.resetRenderersIndices = function () {
                if (this.indexToRenderer.length == 0)
                    return;
                if (this.layout && this.layout.useVirtualLayout) {
                    var virtualRendererIndices = this.virtualRendererIndices;
                    var length_4 = virtualRendererIndices.length;
                    for (var i = 0; i < length_4; i++) {
                        var index = virtualRendererIndices[i];
                        this.resetRendererItemIndex(index);
                    }
                }
                else {
                    var indexToRendererLength = this.indexToRenderer.length;
                    for (var index = 0; index < indexToRendererLength; index++)
                        this.resetRendererItemIndex(index);
                }
            };
            /**
             * 数据源更新或替换项目事件处理
             */
            DataGroup.prototype.itemUpdatedHandler = function (item, location) {
                if (this.renderersBeingUpdated)
                    return; //防止无限循环
                var renderer = this.indexToRenderer[location];
                if (renderer)
                    this.updateRenderer(renderer, location, item);
            };
            /**
             * 调整指定项呈示器的索引值
             */
            DataGroup.prototype.resetRendererItemIndex = function (index) {
                var renderer = (this.indexToRenderer[index]);
                if (renderer)
                    renderer.itemIndex = index;
            };
            Object.defineProperty(DataGroup.prototype, "itemRenderer", {
                /**
                 * 用于数据项目的项呈示器。该类必须实现 IItemRenderer 接口。<br/>
                 * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
                 * @member egret.gui.DataGroup#itemRenderer
                 */
                get: function () {
                    return this._itemRenderer;
                },
                set: function (value) {
                    if (this._itemRenderer === value)
                        return;
                    this._itemRenderer = value;
                    this.itemRendererChanged = true;
                    this.typicalItemChanged = true;
                    this.cleanFreeRenderer = true;
                    this.removeDataProviderListener();
                    this.invalidateProperties();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataGroup.prototype, "itemRendererSkinName", {
                /**
                 * 条目渲染器的可选皮肤标识符。在实例化itemRenderer时，若其内部没有设置过skinName,则将此属性的值赋值给它的skinName。
                 * 注意:若itemRenderer不是ISkinnableClient，则此属性无效。
                 * @member egret.gui.DataGroup#itemRendererSkinName
                 */
                get: function () {
                    return this._itemRendererSkinName;
                },
                set: function (value) {
                    if (this._itemRendererSkinName == value)
                        return;
                    this._itemRendererSkinName = value;
                    if (this._itemRendererSkinName && this.initialized) {
                        this.itemRendererSkinNameChange = true;
                        this.invalidateProperties();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataGroup.prototype, "itemRendererFunction", {
                /**
                 * 为某个特定项目返回一个项呈示器Class的函数。<br/>
                 * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。<br/>
                 * 应该定义一个与此示例函数类似的呈示器函数： <br/>
                 * function myItemRendererFunction(item:Object):IFactory
                 * @member egret.gui.DataGroup#itemRendererFunction
                 */
                get: function () {
                    return this._itemRendererFunction;
                },
                set: function (value) {
                    if (this._itemRendererFunction == value)
                        return;
                    this._itemRendererFunction = value;
                    this.itemRendererChanged = true;
                    this.typicalItemChanged = true;
                    this.removeDataProviderListener();
                    this.invalidateProperties();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 为特定的数据项返回项呈示器的工厂实例
             */
            DataGroup.prototype.itemToRendererClass = function (item) {
                var rendererFactory;
                if (this._itemRendererFunction != null) {
                    rendererFactory = this._itemRendererFunction(item);
                    if (!rendererFactory)
                        rendererFactory = this._itemRenderer;
                }
                else {
                    rendererFactory = this._itemRenderer;
                }
                return rendererFactory ? rendererFactory : DataGroup.defaultRendererFactory;
            };
            /**
             * @method egret.gui.DataGroup#createChildren
             * 设置默认的ItemRenderer
             * @private
             *
             */
            DataGroup.prototype.createChildren = function () {
                if (!this.layout) {
                    var _layout = new gui.VerticalLayout();
                    _layout.gap = 0;
                    _layout.horizontalAlign = egret.HorizontalAlign.CONTENT_JUSTIFY;
                    this.layout = _layout;
                }
                _super.prototype.createChildren.call(this);
            };
            /**
             * 处理对组件设置的属性
             * @method egret.gui.DataGroup#commitProperties
             */
            DataGroup.prototype.commitProperties = function () {
                if (this.itemRendererChanged || this.dataProviderChanged || this.useVirtualLayoutChanged) {
                    this.removeAllRenderers();
                    if (this.layout)
                        this.layout.clearVirtualLayoutCache();
                    this.setTypicalLayoutRect(null);
                    this.useVirtualLayoutChanged = false;
                    this.itemRendererChanged = false;
                    if (this._dataProvider)
                        this._dataProvider.addEventListener(gui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
                    if (this.layout && this.layout.useVirtualLayout) {
                        this.invalidateSize();
                        this.invalidateDisplayList();
                    }
                    else {
                        this.createRenderers();
                    }
                    if (this.dataProviderChanged) {
                        this.dataProviderChanged = false;
                        this.verticalScrollPosition = this.horizontalScrollPosition = 0;
                    }
                }
                _super.prototype.commitProperties.call(this);
                if (this.typicalItemChanged) {
                    this.typicalItemChanged = false;
                    if (this._dataProvider && this._dataProvider.length > 0) {
                        this.typicalItem = this._dataProvider.getItemAt(0);
                        this.measureRendererSize();
                    }
                }
                if (this.itemRendererSkinNameChange) {
                    this.itemRendererSkinNameChange = false;
                    var length_5 = this.indexToRenderer.length;
                    for (var i = 0; i < length_5; i++) {
                        this.setItemRenderSkinName(this.indexToRenderer[i]);
                    }
                    var freeRenderers = this.freeRenderers;
                    for (var hashCode in freeRenderers) {
                        var list = freeRenderers[hashCode];
                        if (list) {
                            length_5 = list.length;
                            for (var i = 0; i < length_5; i++) {
                                this.setItemRenderSkinName(list[i]);
                            }
                        }
                    }
                }
            };
            /**
             * 计算组件的默认大小和（可选）默认最小大小
             * @method egret.gui.DataGroup#measure
             */
            DataGroup.prototype.measure = function () {
                if (this.layout && this.layout.useVirtualLayout) {
                    this.ensureTypicalLayoutElement();
                }
                _super.prototype.measure.call(this);
            };
            /**
             * 绘制对象和/或设置其子项的大小和位置
             * @method egret.gui.DataGroup#updateDisplayList
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            DataGroup.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                if (this._layoutInvalidateDisplayListFlag && this.layout && this.layout.useVirtualLayout) {
                    this.virtualLayoutUnderway = true;
                    this.ensureTypicalLayoutElement();
                }
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                if (this.virtualLayoutUnderway)
                    this.finishVirtualLayout();
            };
            /**
             * 确保测量过默认条目大小。
             */
            DataGroup.prototype.ensureTypicalLayoutElement = function () {
                if (this.layout.typicalLayoutRect)
                    return;
                if (this._dataProvider && this._dataProvider.length > 0) {
                    this.typicalItem = this._dataProvider.getItemAt(0);
                    this.measureRendererSize();
                }
            };
            /**
             * 测量项呈示器默认尺寸
             */
            DataGroup.prototype.measureRendererSize = function () {
                if (!this.typicalItem) {
                    this.setTypicalLayoutRect(null);
                    return;
                }
                var rendererFactory = this.itemToRendererClass(this.typicalItem);
                var typicalRenderer = this.createOneRenderer(rendererFactory);
                if (!typicalRenderer) {
                    this.setTypicalLayoutRect(null);
                    return;
                }
                this.createNewRendererFlag = true;
                this.updateRenderer(typicalRenderer, 0, this.typicalItem);
                if ("validateNow" in typicalRenderer)
                    typicalRenderer.validateNow();
                var rect = new egret.Rectangle(0, 0, typicalRenderer.preferredWidth, typicalRenderer.preferredHeight);
                this.recycle(typicalRenderer);
                this.setTypicalLayoutRect(rect);
                this.createNewRendererFlag = false;
            };
            /**
             * 设置项目默认大小
             */
            DataGroup.prototype.setTypicalLayoutRect = function (rect) {
                this.typicalLayoutRect = rect;
                if (this.layout)
                    this.layout.typicalLayoutRect = rect;
            };
            /**
             * 移除所有项呈示器
             */
            DataGroup.prototype.removeAllRenderers = function () {
                var length = this.indexToRenderer.length;
                var renderer;
                for (var i = 0; i < length; i++) {
                    renderer = this.indexToRenderer[i];
                    if (renderer) {
                        this.recycle(renderer);
                        gui.RendererExistenceEvent.dispatchRendererExistenceEvent(this, gui.RendererExistenceEvent.RENDERER_REMOVE, renderer, renderer.itemIndex, renderer.data);
                    }
                }
                this.indexToRenderer = [];
                this.virtualRendererIndices = null;
                if (!this.cleanFreeRenderer)
                    return;
                this.cleanAllFreeRenderer();
            };
            /**
             * 为数据项创建项呈示器
             */
            DataGroup.prototype.createRenderers = function () {
                if (!this._dataProvider)
                    return;
                var index = 0;
                var length = this._dataProvider.length;
                for (var i = 0; i < length; i++) {
                    var item = this._dataProvider.getItemAt(i);
                    var rendererFactory = this.itemToRendererClass(item);
                    var renderer = this.createOneRenderer(rendererFactory);
                    if (!renderer)
                        continue;
                    this.indexToRenderer[index] = renderer;
                    this.updateRenderer(renderer, index, item);
                    gui.RendererExistenceEvent.dispatchRendererExistenceEvent(this, gui.RendererExistenceEvent.RENDERER_ADD, renderer, index, item);
                    index++;
                }
            };
            /**
             * 更新项呈示器
             * @method egret.gui.DataGroup#updateRenderer
             * @param renderer {IItemRenderer}
             * @param itemIndex {number}
             * @param data {any}
             * @returns {IItemRenderer}
             */
            DataGroup.prototype.updateRenderer = function (renderer, itemIndex, data) {
                this.renderersBeingUpdated = true;
                if (this._rendererOwner) {
                    renderer = this._rendererOwner.updateRenderer(renderer, itemIndex, data);
                }
                else {
                    if ("ownerChanged" in renderer) {
                        renderer.ownerChanged(this);
                    }
                    renderer.itemIndex = itemIndex;
                    renderer.label = this.itemToLabel(data);
                    renderer.data = data;
                }
                this.renderersBeingUpdated = false;
                return renderer;
            };
            /**
             * 返回可在项呈示器中显示的 String。
             * 若DataGroup被作为SkinnableDataContainer的皮肤组件,此方法将不会执行，被SkinnableDataContainer.itemToLabel()所替代。
             * @method egret.gui.DataGroup#itemToLabel
             * @param item {any}
             * @returns {string}
             */
            DataGroup.prototype.itemToLabel = function (item) {
                if (item)
                    return item.toString();
                else
                    return " ";
            };
            /**
             * 返回位于指定索引处的子显示对象实例
             * @method egret.gui.DataGroup#getElementAt
             * @param index {number}
             * @returns {IVisualElement}
             */
            DataGroup.prototype.getElementAt = function (index) {
                return this.indexToRenderer[index];
            };
            /**
             * 返回 element 实例的索引位置
             * @method egret.gui.DataGroup#getElementIndex
             * @param element {IVisualElement}
             * @returns {number}
             */
            DataGroup.prototype.getElementIndex = function (element) {
                if (!element)
                    return -1;
                return this.indexToRenderer.indexOf(element);
            };
            Object.defineProperty(DataGroup.prototype, "numElements", {
                /**
                 * 获得对象容器的子对象总数
                 * @member egret.gui.DataGroup#numElements
                 */
                get: function () {
                    if (!this._dataProvider)
                        return 0;
                    return this._dataProvider.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中
             * @method egret.gui.DataGroup#addChild
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            DataGroup.prototype.addChild = function (child) {
                egret.$error(3004, egret.sys.tr(3003));
                return null;
            };
            /**
             * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中
             * @method egret.gui.DataGroup#addChildAt
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            DataGroup.prototype.addChildAt = function (child, index) {
                egret.$error(3005, egret.sys.tr(3003));
                return null;
            };
            /**
             * 从 DisplayObjectContainer 实例的子列表中删除指定的 child DisplayObject 实例
             * @method egret.gui.DataGroup#removeChild
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            DataGroup.prototype.removeChild = function (child) {
                egret.$error(3006, egret.sys.tr(3003));
                return null;
            };
            /**
             * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject
             * @method egret.gui.DataGroup#removeChildAt
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             */
            DataGroup.prototype.removeChildAt = function (index) {
                egret.$error(3007, egret.sys.tr(3003));
                return null;
            };
            /**
             * 更改现有子项在显示对象容器中的位置
             * @method egret.gui.DataGroup#setChildIndex
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             */
            DataGroup.prototype.setChildIndex = function (child, index) {
                egret.$error(3008, egret.sys.tr(3003));
            };
            /**
             * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）
             * @method egret.gui.DataGroup#swapChildren
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             */
            DataGroup.prototype.swapChildren = function (child1, child2) {
                egret.$error(3009, egret.sys.tr(3003));
            };
            /**
             * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）
             * @method egret.gui.DataGroup#swapChildrenAt
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            DataGroup.prototype.swapChildrenAt = function (index1, index2) {
                egret.$error(3010, egret.sys.tr(3003));
            };
            return DataGroup;
        }(gui.GroupBase));
        /**
         * @method egret.gui.DataGroup.defaultRendererFactory
         * @param ClassFactory {any}
         */
        DataGroup.defaultRendererFactory = new gui.ClassFactory(gui.ItemRenderer);
        gui.DataGroup = DataGroup;
        __reflect(DataGroup.prototype, "egret.gui.DataGroup");
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));