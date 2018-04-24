var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BaseEuiLayer = (function (_super) {
    __extends(BaseEuiLayer, _super);
    function BaseEuiLayer() {
        var _this = _super.call(this) || this;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseEuiLayer;
}(eui.Group));
__reflect(BaseEuiLayer.prototype, "BaseEuiLayer");
/**
 * Created by yangsong on 14/12/18.
 * 基类
 */
var BaseClass = (function () {
    function BaseClass() {
    }
    /**
     * 获取一个单例
     * @returns {any}
     */
    BaseClass.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            Class._instance = new (Class.bind.apply(Class, [void 0].concat(args)))();
        }
        return Class._instance;
    };
    return BaseClass;
}());
__reflect(BaseClass.prototype, "BaseClass");
var BaseSpriteLayer = (function (_super) {
    __extends(BaseSpriteLayer, _super);
    function BaseSpriteLayer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseSpriteLayer;
}(egret.DisplayObjectContainer));
__reflect(BaseSpriteLayer.prototype, "BaseSpriteLayer");
//显示基类,用于增加一些显示相关的共有函数
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.event = [];
        return _this;
    }
    BaseView.prototype.observe = function (func, myfunc, callobj) {
        if (callobj === void 0) { callobj = undefined; }
        MessageCenter.addListener(func, myfunc, this, callobj);
    };
    BaseView.prototype.removeObserveOne = function (func, myfunc) {
        MessageCenter.ins().removeListener(func.funcallname, myfunc, this);
    };
    BaseView.prototype.removeObserve = function () {
        MessageCenter.ins().removeAll(this);
    };
    BaseView.prototype.addTouchEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    BaseView.prototype.addTouchEndEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
    };
    BaseView.prototype.addChangeEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.CHANGE, obj, func);
    };
    BaseView.prototype.addEvent = function (ev, obj, func) {
        obj.addEventListener(ev, func, this);
        this.event.push([ev, func, obj]);
    };
    BaseView.prototype.removeEvent = function (ev, obj, func) {
        obj.removeEventListener(ev, func, this);
    };
    BaseView.prototype.removeTouchEvent = function (obj, func) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    BaseView.prototype.removeEvents = function () {
        for (var _i = 0, _a = this.event; _i < _a.length; _i++) {
            var ev = _a[_i];
            ev[2].removeEventListener(ev[0], ev[1], this);
        }
    };
    BaseView.prototype.$onClose = function () {
        var fun = function (tar) {
            for (var i = 0; i < tar.numChildren; i++) {
                var obj = tar.getChildAt(i);
                if (obj instanceof BaseView) {
                    obj.$onClose();
                }
                else if (obj instanceof egret.DisplayObjectContainer) {
                    arguments.callee(obj);
                }
                else if (obj["$onClose"]) {
                    obj["$onClose"]();
                }
            }
        };
        fun(this);
        this.removeEvents();
        this.removeObserve();
    };
    BaseView.prototype.setSkinPart = function (partName, instance) {
        var oldInstance = this.skin[partName];
        _super.prototype.setSkinPart.call(this, partName, instance);
        // if (!instance || !this.skin[partName] || this.skin[partName] == instance)
        // 	return;
        if (instance && oldInstance && oldInstance != instance) {
            for (var i = 0; i < BaseView.replaceKeys.length; i++) {
                var key = BaseView.replaceKeys[i];
                instance[key] = oldInstance[key];
            }
            if (instance instanceof eui.BitmapLabel) {
                instance["font"] = oldInstance["$font"];
            }
            var p = oldInstance.parent;
            if (p) {
                var pIndex = p.getChildIndex(oldInstance);
                p.addChildAt(instance, pIndex);
            }
        }
        if (oldInstance != instance) {
            this.skin[partName] = instance;
            DisplayUtils.destroyDisplayObject(oldInstance);
        }
    };
    // setSkinPart(partName: string, instance: any): void {
    // 	super.setSkinPart(partName, instance);
    // 	if (!instance || !this.skin[partName] || this.skin[partName] == instance)
    // 		return;
    // 	let p = this.skin[partName].parent;
    // 	let pIndex = p.getChildIndex(this.skin[partName]);
    // 	DisplayUtils.removeFromParent(this.skin[partName]);
    // 	for (let i = 0; i < BaseView.replaceKeys.length; i++) {
    // 		let key = BaseView.replaceKeys[i];
    // 		instance[key] = this.skin[partName][key];
    // 	}
    // 	if(instance instanceof eui.BitmapLabel){
    // 		instance["font"] = this.skin[partName]["$font"];
    // 	}
    // 	this.skin[partName] = instance;
    // 	p.addChildAt(instance, pIndex);
    // }
    BaseView.replaceKeys = ["x", "y", "alpha", "anchorOffsetX", "anchorOffsetY", "blendMode", "bottom",
        "cacheAsBitmap", "currentState", "enabled", "filters", "height", "horizontalCenter", "hostComponentKey",
        "includeInLayout", "left", "mask", "matrix", "maxHeight", "maxWidth", "minHeight", "minWidth", "name",
        "percentHeight", "percentWidth", "right", "rotation", "scaleX", "scaleY", "scrollRect", "skewX", "skewY",
        "skinName", "top", "touchChildren", "touchEnabled", "verticalCenter", "visible", "width"];
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView");
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    /**
     * 构造函数
     */
    function TimerManager() {
        var _this = _super.call(this) || this;
        _this.currHandler = null;
        _this._handlers = [];
        _this.nexthandles = null;
        _this._currTime = egret.getTimer();
        _this._currFrame = 0;
        egret.startTick(_this.onEnterFrame, _this);
        return _this;
    }
    TimerManager.ins = function () {
        return _super.ins.call(this);
    };
    TimerManager.prototype.getFrameId = function () {
        return this._currFrame;
    };
    TimerManager.prototype.getCurrTime = function () {
        return this._currTime;
    };
    // 从大到小排序
    TimerManager.binFunc = function (b1, b2) {
        if (b1.exeTime > b2.exeTime)
            return -1;
        else if (b1.exeTime < b2.exeTime)
            return 1;
        else
            return 0;
    };
    TimerManager.DeleteHandle = function (handler) {
        handler.clear();
        ObjectPool.push(handler);
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerManager.prototype.onEnterFrame = function (time) {
        this._currFrame++;
        this._currTime = egret.getTimer();
        // process the nextlist first
        var nexthandles = this.nexthandles;
        this.nexthandles = null;
        if (nexthandles && nexthandles.length > 0) {
            for (var _i = 0, nexthandles_1 = nexthandles; _i < nexthandles_1.length; _i++) {
                var handler_1 = nexthandles_1[_i];
                handler_1.method.call(handler_1.methodObj);
                TimerManager.DeleteHandle(handler_1);
            }
            nexthandles = null;
        }
        if (this._handlers.length <= 0)
            return false;
        var handler = this._handlers[this._handlers.length - 1];
        while (handler.exeTime <= this._currTime) {
            this.currHandler = handler = this._handlers.pop();
            handler.method.call(handler.methodObj);
            handler.exeTime = egret.getTimer() + handler.delay;
            var repeat = handler.forever;
            if (!repeat) {
                if (handler.repeatCount > 1) {
                    handler.repeatCount--;
                    repeat = true;
                }
                else {
                    if (handler.onFinish) {
                        handler.onFinish.apply(handler.finishObj);
                    }
                }
            }
            if (repeat) {
                var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
                this._handlers.splice(index, 0, handler);
            }
            else {
                TimerManager.DeleteHandle(handler);
            }
            if (this._handlers.length <= 0)
                break;
            else
                handler = this._handlers[this._handlers.length - 1];
        }
        this.currHandler = null;
        return false;
    };
    TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (delay < 0 || repeat < 0 || method == null) {
            return;
        }
        var handler = ObjectPool.pop("TimerHandler");
        handler.forever = repeat == 0;
        handler.repeatCount = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.onFinish = onFinish;
        handler.finishObj = fobj;
        handler.exeTime = startTime + this._currTime;
        // this._handlers.push(handler);
        var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
        this._handlers.splice(index, 0, handler);
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.doTimer = function (delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
    };
    /**
     *
     * 定时执行
     * @param startTime 延迟多久第一次执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.doTimerDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
    };
    // 下一帧执行，且只执行一次
    TimerManager.prototype.doNext = function (method, methodObj) {
        var handler = ObjectPool.pop("TimerHandler");
        handler.method = method;
        handler.methodObj = methodObj;
        if (!this.nexthandles)
            this.nexthandles = [];
        this.nexthandles.push(handler);
    };
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.remove = function (method, methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.method == method &&
            currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
            }
        }
    };
    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.removeAll = function (methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
            }
        }
    };
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    TimerManager.prototype.isExists = function (method, methodObj) {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.method == method && handler.methodObj == methodObj) {
                return true;
            }
        }
        return false;
    };
    return TimerManager;
}(BaseClass));
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**是否重复执行*/
        this.forever = false;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
    }
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.onFinish = null;
        this.finishObj = null;
        this.forever = false;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this.filters = ["TipsView"];
        _this._regesterInfo = {};
        _this._views = {};
        _this._hCode2Key = {};
        _this._opens = [];
        return _this;
    }
    ViewManager.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 清空处理
     */
    ViewManager.prototype.clear = function () {
        this.closeAll();
        this._views = {};
    };
    /**
     * 面板注册
     * @param viewClass 面板类
     * @param layer 层级
     */
    ViewManager.prototype.reg = function (viewClass, layer) {
        if (viewClass == null) {
            return;
        }
        var keys = egret.getQualifiedClassName(viewClass);
        if (this._regesterInfo[keys]) {
            return;
        }
        this._regesterInfo[keys] = [viewClass, layer];
    };
    /**
     * 销毁一个面板
     * @param hCode
     */
    ViewManager.prototype.destroy = function (hCode) {
        var keys = this._hCode2Key[hCode];
        delete this._views[keys];
    };
    ViewManager.prototype.getKey = function (nameOrClass) {
        var key = "";
        if (typeof (nameOrClass) == "string")
            key = nameOrClass;
        else if (typeof (nameOrClass) == "function")
            key = egret.getQualifiedClassName(nameOrClass);
        else if ((nameOrClass) instanceof BaseEuiView) {
            var keys = Object.keys(this._views);
            for (var i = 0, len = keys.length; i < len; i++) {
                var tempKey = keys[i];
                if (this._views[tempKey] == nameOrClass) {
                    key = tempKey;
                    break;
                }
            }
        }
        else
            DebugUtils.log("打开界面只支持类名和类名的字符串形式,关闭界面只支持类名和类名的字符串以及类的实例形式,错误编号:" + nameOrClass);
        return key;
    };
    /**
     * 检测能否开启
     * @param key 类名
     * @param param
     * @returns {boolean}
     */
    ViewManager.prototype.viewOpenCheck = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var result = true; //为什么默认是true，当info为空时应该返回null？
        var info = this._regesterInfo[key];
        if (info != null) {
            var c = info[0];
            var f = c["openCheck"];
            if (f != null) {
                result = f.apply(void 0, param);
            }
        }
        return result;
    };
    ViewManager.prototype.toggleWin = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var isShow = this.isShow(nameOrClass);
        if (isShow) {
            ViewManager.ins().close(nameOrClass);
        }
        else {
            ViewManager.ins().open(nameOrClass);
        }
        return null;
    };
    ViewManager.prototype.openByScript = function (param) {
        if (param.length > 1) {
            var winParam = param.slice(1, param.length);
            ViewManager.ins().open(param[0], winParam);
        }
        else {
            ViewManager.ins().open(param[0]);
        }
    };
    /**
     * 统一打开窗口函数
     * @param nameOrClass 类名,类字符串名,或者类对象
     * @param param 打开窗口传入的参数
     *  */
    ViewManager.prototype.open = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var key = this.getKey(nameOrClass);
        //检测能否开启
        if (this.viewOpenCheck.apply(this, [key].concat(param)) == false) {
            return null;
        }
        var view = this.openEasy(key, param);
        if (view) {
            this.checkOpenView(view);
            DebugUtils.log("成功打开窗口:" + key);
        }
        else {
            // DebugUtils.log("成功打开窗口:" + key);
        }
        return view;
    };
    //简单的打开一个界面
    ViewManager.prototype.openEasy = function (nameOrClass, param) {
        if (param === void 0) { param = null; }
        var keys = this.getKey(nameOrClass);
        var view = this._views[keys];
        var info = this._regesterInfo[keys];
        if (!view) {
            //参数参考this.register函数
            view = new info[0]();
            // view.$setParent(info[1]);
            this._views[keys] = view;
            this._hCode2Key[view.hashCode] = keys;
        }
        if (view == null) {
            Debug.log("UI_" + keys + "不存在");
            return null;
        }
        //关闭互斥窗口
        for (var _i = 0, _a = view.exclusionWins; _i < _a.length; _i++) {
            var exclusionWin = _a[_i];
            this.closeEasy(exclusionWin);
        }
        if (view.isShow() || view.isInit()) {
            view.open.apply(view, param); //第一个参数表示函数运行的作用域，第二个是参数数组
            view.addToParent(info[1]);
        }
        else {
            this.openWin();
            view.loadResource(function () {
                view.addToParent(info[1]);
                view.setVisible(false);
            }.bind(this), function () {
                view.initUI();
                view.initData();
                view.open.apply(view, param);
                view.setVisible(true);
                this.openWinCom();
            }.bind(this));
        }
        if (this._opens.indexOf(keys) == -1)
            this._opens.push(keys);
        return view;
    };
    ViewManager.prototype.checkOpenView = function (view) {
        if (view.isTopLevel) {
            this.openTopWin();
            // GameMap.ins().removeFromParent();
        }
    };
    //----------------------------------------------------关闭-------------------------------------
    /**
     * 统一关闭窗口函数
     * @param nameOrClass 类名,类字符串名,或者类对象
     * @param param 关闭传入的参数
     **/
    ViewManager.prototype.close = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var key = this.getKey(nameOrClass);
        // DebugUtils.log("开始关闭窗口" + key);
        var view = this.closeEasy(key, param);
        if (view) {
            this.checkCloseView();
            // DebugUtils.log("成功关闭窗口" + key);
        }
        else {
            // DebugUtils.log("窗口不存在" + key);
        }
    };
    //简单关闭一个窗口
    ViewManager.prototype.closeEasy = function (nameOrClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(nameOrClass)) {
            return null;
        }
        var key = this.getKey(nameOrClass);
        var view = this.getView(key);
        if (view) {
            var viewIndex = this._opens.indexOf(key);
            if (viewIndex >= 0) {
                this._opens.splice(viewIndex, 1);
            }
            view.close.apply(view, param);
            view.$onClose.apply(view);
            view.removeFromParent();
        }
        return view;
    };
    ViewManager.prototype.checkCloseView = function () {
        var hasTopLevelWin = false; //是否有一级窗口
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var key = _a[_i];
            var win = this.getView(key);
            if (win && win.isTopLevel) {
                hasTopLevelWin = true;
                break;
            }
        }
        if (!hasTopLevelWin) {
            this.closeTopWin();
            // GameMap.ins().addToParent();
        }
    };
    ViewManager.prototype.openTopWin = function () {
    };
    ViewManager.prototype.closeTopWin = function () {
    };
    ViewManager.prototype.openWin = function () {
    };
    ViewManager.prototype.openWinCom = function () {
    };
    /**
     * 获取一个UI对象
     * 返回null代表未初始化
     * @param nameOrClass  类名,类字符串名,或者类对象
     * @returns BaseEuiView
     */
    ViewManager.prototype.getView = function (nameOrClass) {
        var keys = this.getKey(nameOrClass);
        // if (this._views[keys] instanceof Array)
        // 	return null;
        return this._views[keys];
    };
    /**
     * 关闭所有开启中的UI
     */
    ViewManager.prototype.closeAll = function () {
        while (this._opens.length) {
            this.closeEasy(this._opens[0], []);
        }
        this.checkCloseView();
    };
    /**
     * 关闭所有一级界面
     */
    ViewManager.prototype.closeTopLevel = function () {
        for (var i = this._opens.length - 1; i >= 0; i--) {
            var keys = this._opens[i];
            var view = this.getView(keys);
            if (view.isTopLevel)
                this.closeEasy(keys, []);
        }
        this.checkCloseView();
    };
    /**
     * 当前ui打开数量
     * @returns {number}
     */
    ViewManager.prototype.openNum = function () {
        return this._opens.length;
    };
    /**
     * 检测一个UI是否开启中
     * @param nameOrClass 类名,类字符串名,或者类对象
     * @returns {boolean}
     */
    ViewManager.prototype.isShow = function (nameOrClass) {
        return this._opens.indexOf(this.getKey(nameOrClass)) >= 0;
    };
    return ViewManager;
}(BaseClass));
__reflect(ViewManager.prototype, "ViewManager");
var GameByteArray = (function (_super) {
    __extends(GameByteArray, _super);
    function GameByteArray() {
        var _this = _super.call(this) || this;
        _this.endian = egret.Endian.LITTLE_ENDIAN;
        return _this;
    }
    GameByteArray.prototype.readString = function () {
        var s = this.readUTF();
        this.position++;
        return s;
    };
    // 对于协议中要读取8字节Int64的字段，分两种情况：如果不需要加减等运算的字段，比如handle，
    // 用readDouble函数读取，如果是需要运算的数字类型，比如金币等，用readNumber读取
    // 返回uint64类型的readInt64以后不要使用了,已经使用的地方慢慢修改过来
    GameByteArray.prototype.readNumber = function () {
        var i64 = new uint64(this);
        var str = i64.toString();
        return +str;
    };
    // 对应readnumer
    GameByteArray.prototype.writeNumber = function (val) {
        var i64 = uint64.stringToUint64(val.toString());
        this.writeInt64(i64);
    };
    GameByteArray.prototype.writeInt64 = function (bigInt) {
        this.writeUnsignedInt(bigInt._lowUint);
        this.writeUnsignedInt(bigInt._highUint);
    };
    GameByteArray.prototype.writeString = function (value) {
        this.writeUTF(value);
        this.writeByte(0);
    };
    GameByteArray.prototype.writeCmd = function (id, subId) {
        this.writeByte(id);
        this.writeByte(subId);
    };
    return GameByteArray;
}(egret.ByteArray));
__reflect(GameByteArray.prototype, "GameByteArray");
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone(res) {
        var _this = _super.call(this) || this;
        _this.skinName = 'StoneSkin';
        _this.res = res;
        return _this;
    }
    Stone.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.createStone();
    };
    Stone.prototype.createStone = function () {
        if (this.res == '0')
            return;
        this.icon.source = "img_" + this.res;
    };
    Stone.prototype.stoneDown = function () {
        var t = egret.Tween.get(this);
        var endY = this.y + 300;
        var self = this;
        t.to({ y: endY }, 300).call(function () {
            ObjectPool.push(self);
            DisplayUtils.removeFromParent(self);
        }, this);
    };
    return Stone;
}(BaseView));
__reflect(Stone.prototype, "Stone");
var BaseScene = (function () {
    /**
     * 构造函数
     */
    function BaseScene() {
        this._layers = new Array();
    }
    /**
     * 进入Scene调用
     */
    BaseScene.prototype.onEnter = function () {
    };
    /**
     * 退出Scene调用
     */
    BaseScene.prototype.onExit = function () {
        ViewManager.ins().closeAll();
        this.removeAllLayer();
    };
    /**
     * 添加一个Layer到舞台
     * @param layer
     */
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().addChild(layer);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().addChild(layer);
            this._layers.push(layer);
        }
    };
    /**
     * 添加一个Layer到舞台
     * @param layer
     */
    BaseScene.prototype.addLayerAt = function (layer, index) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().addChildAt(layer, index);
            this._layers.push(layer);
        }
    };
    /**
     * 在舞台移除一个Layer
     * @param layer
     */
    BaseScene.prototype.removeLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
        else if (layer instanceof BaseEuiLayer) {
            StageUtils.ins().getUIStage().removeChild(layer);
            this._layers.splice(this._layers.indexOf(layer), 1);
        }
    };
    /**
     * Layer中移除所有
     * @param layer
     */
    BaseScene.prototype.layerRemoveAllChild = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            layer.removeChildren();
        }
        else if (layer instanceof BaseEuiLayer) {
            layer.removeChildren();
        }
    };
    /**
     * 移除所有Layer
     */
    BaseScene.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers[0];
            this.layerRemoveAllChild(layer);
            this.removeLayer(layer);
        }
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
var BaseSystem = (function (_super) {
    __extends(BaseSystem, _super);
    function BaseSystem() {
        var _this = _super.call(this) || this;
        //必须在init前
        // let cls = egret.getDefinitionByName(egret.getQualifiedClassName(this));
        // MessageCenter.compile(cls);
        _this.observe(GameApp.postLoginInit, _this.initLogin);
        return _this;
    }
    BaseSystem.prototype.regNetMsg = function (msgId, fun) {
        GameSocket.ins().registerSTCFunc(this.sysId, msgId, fun, this);
    };
    /**
     * 游戏登录初始化
     */
    BaseSystem.prototype.initLogin = function () {
    };
    /**
     * 从对象池获取一个bytes对象
     */
    BaseSystem.prototype.getGameByteArray = function () {
        return GameSocket.ins().getBytes();
    };
    BaseSystem.prototype.getBytes = function (msgId) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgId);
        return bytes;
    };
    BaseSystem.prototype.sendBaseProto = function (msgId) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgId);
        this.sendToServer(bytes);
    };
    /**
     * 发送到服务器
     * @param bytes
     */
    BaseSystem.prototype.sendToServer = function (bytes) {
        GameSocket.ins().sendToServer(bytes);
    };
    BaseSystem.prototype.observe = function (func, myFunc) {
        MessageCenter.addListener(func, myFunc, this);
    };
    BaseSystem.prototype.removeObserveOne = function (func, myFunc) {
        MessageCenter.ins().removeListener(func.funcallname, myFunc, this);
    };
    BaseSystem.prototype.removeObserve = function () {
        MessageCenter.ins().removeAll(this);
    };
    BaseSystem.prototype.associated = function (fun) {
        var funs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            funs[_i - 1] = arguments[_i];
        }
        for (var _a = 0, funs_1 = funs; _a < funs_1.length; _a++) {
            var i = funs_1[_a];
            this.observe(i, fun);
        }
    };
    return BaseSystem;
}(BaseClass));
__reflect(BaseSystem.prototype, "BaseSystem");
var LayerManager = (function () {
    function LayerManager() {
    }
    /**
     * 游戏背景层
     * @type {BaseSpriteLayer}
     */
    LayerManager.Game_Bg = new BaseSpriteLayer();
    /**
     * 主游戏层
     * @type {BaseSpriteLayer}
     */
    LayerManager.Game_Main = new BaseSpriteLayer();
    /**
     * UI主界面
     * @type {BaseEuiLayer}
     */
    LayerManager.UI_Main = new BaseEuiLayer();
    /**
     * UI主界面2 比 UI主界面 高一层
     * @type {BaseEuiLayer}
     */
    LayerManager.UI_Main2 = new BaseEuiLayer();
    /**
     * UI弹出框层
     * @type {BaseEuiLayer}
     */
    LayerManager.UI_Popup = new BaseEuiLayer();
    /**
     * UI警告消息层
     * @type {BaseEuiLayer}
     */
    LayerManager.UI_Message = new BaseEuiLayer();
    /**
     * UITips层
     * @type {BaseEuiLayer}
     */
    LayerManager.UI_Tips = new BaseEuiLayer();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
var BaseSound = (function () {
    /**
     * 构造函数
     */
    function BaseSound() {
        this._cache = {};
        this._loadingCache = new Array();
        TimerManager.ins().doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }
    /**
     * 处理音乐文件的清理
     */
    BaseSound.prototype.dealSoundTimer = function () {
        var currTime = egret.getTimer();
        var keys = Object.keys(this._cache);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!this.checkCanClear(key))
                continue;
            if (currTime - this._cache[key] >= SoundManager.CLEAR_TIME) {
                //DebugUtils.log(key + "已clear")
                delete this._cache[key];
                RES.destroyRes(key);
            }
        }
    };
    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    BaseSound.prototype.getSound = function (key) {
        var sound = RES.getRes(key);
        if (sound) {
            if (this._cache[key]) {
                this._cache[key] = egret.getTimer();
            }
        }
        else {
            if (this._loadingCache.indexOf(key) != -1) {
                return null;
            }
            this._loadingCache.push(key);
            RES.getResAsync(key, this.onResourceLoadComplete, this);
        }
        return sound;
    };
    /**
     * 资源加载完成
     * @param event
     */
    BaseSound.prototype.onResourceLoadComplete = function (data, key) {
        var index = this._loadingCache.indexOf(key);
        if (index != -1) {
            this._loadingCache.splice(index, 1);
            this._cache[key] = egret.getTimer();
            this.loadedPlay(key);
        }
    };
    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    BaseSound.prototype.loadedPlay = function (key) {
    };
    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    BaseSound.prototype.checkCanClear = function (key) {
        return true;
    };
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
var BaseEuiView = (function (_super) {
    __extends(BaseEuiView, _super);
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    function BaseEuiView() {
        var _this = _super.call(this) || this;
        _this._resources = null;
        /**是否一级窗口,一级窗口会把部分主界面遮挡 */
        _this.isTopLevel = false;
        /** 互斥窗口,类名或者类字符串的数组,打开某些窗口会关闭互斥的窗口*/
        _this.exclusionWins = [];
        _this._isInit = false;
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        return _this;
    }
    /**
     * 添加互斥窗口
     * @classOrName 类名或者类字符串
     * */
    BaseEuiView.prototype.addExclusionWin = function (classOrName) {
        if (this.exclusionWins.indexOf(classOrName) == -1)
            this.exclusionWins.push(classOrName);
    };
    /**
     * 获取我的父级
     * @returns {egret.DisplayObjectContainer}
     */
    // public get myParent(): egret.DisplayObjectContainer {
    // 	return this._myParent;
    // }
    /**
     * 设置初始加载资源
     * @param resources
     */
    // public setResources(resources: string[]): void {
    // 	this._resources = resources;
    // }
    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    BaseEuiView.prototype.isInit = function () {
        return this._isInit;
    };
    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    // public applyFunc(key: any, ...param: any[]): any {
    // 	return this._controller.applyFunc.apply(this._controller, arguments);
    // }
    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    // public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
    // 	return this._controller.applyControllerFunc.apply(this._controller, arguments);
    // }
    /**
     * 面板是否显示
     * @return
     *
     */
    BaseEuiView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    /**
     * 添加到父级
     */
    BaseEuiView.prototype.addToParent = function (p) {
        p.addChild(this);
    };
    /**
     * 从父级移除
     */
    BaseEuiView.prototype.removeFromParent = function () {
        DisplayUtils.removeFromParent(this);
        this.destoryView();
    };
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    BaseEuiView.prototype.initUI = function () {
        this._isInit = true;
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    BaseEuiView.prototype.initData = function () {
    };
    /**
     * 销毁
     */
    BaseEuiView.prototype.destroy = function () {
    };
    BaseEuiView.prototype.destoryView = function () {
        TimerManager.ins().removeAll(this);
        ViewManager.ins().destroy(this.hashCode);
    };
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    BaseEuiView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    BaseEuiView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 加载面板所需资源
     */
    BaseEuiView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            ResourceUtils.ins().loadResource(this._resources, [], loadComplete, null, this);
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    /**
     * 设置是否隐藏
     * @param value
     */
    BaseEuiView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseEuiView.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    return BaseEuiView;
}(BaseView));
__reflect(BaseEuiView.prototype, "BaseEuiView", ["IBaseView"]);
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    /**
     * 构造函数
     * @param type 0:使用分帧处理 1:及时执行
     */
    function MessageCenter(type) {
        var _this = _super.call(this) || this;
        _this.flag = 0;
        _this.type = type;
        _this.dict = {};
        _this.eVec = [];
        if (_this.type == 0) {
            egret.startTick(_this.run, _this);
        }
        return _this;
    }
    MessageCenter.ins = function () {
        // if (!MessageCenter._ins) MessageCenter._ins = new MessageCenter(0);
        // return MessageCenter._ins;
        return _super.ins.call(this, 0);
    };
    /**
     * 清空处理
     */
    MessageCenter.prototype.clear = function () {
        this.dict = {};
        this.eVec.splice(0);
    };
    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    MessageCenter.prototype.addListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (!arr) {
            this.dict[type] = arr = [];
        }
        else if (this.flag != 0) {
            this.dict[type] = arr = arr.concat();
        }
        //检测是否已经存在
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (item[0] == listener && item[1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]); //添加元素
    };
    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (!arr) {
            return;
        }
        if (this.flag != 0) {
            this.dict[type] = arr = arr.concat();
        }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    };
    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeAll = function (listenerObj) {
        var keys = Object.keys(this.dict);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var type = keys_1[_i];
            var arr = this.dict[type];
            if (this.flag != 0) {
                this.dict[type] = arr = arr.concat();
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }
            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    };
    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    MessageCenter.prototype.dispatch = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var vo = ObjectPool.pop("MessageVo");
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            Debug.log("MessageCenter未实现的类型");
        }
    };
    /**
     * 运行
     *
     */
    MessageCenter.prototype.run = function (time) {
        var currTime = egret.getTimer();
        while (this.eVec.length > 0) {
            this.dealMsg(this.eVec.shift());
            if ((egret.getTimer() - currTime) > 5) {
                break;
            }
        }
        return false;
    };
    /**
     * 处理一条消息
     * @param msgVo
     */
    MessageCenter.prototype.dealMsg = function (msgVo) {
        var listeners = this.dict[msgVo.type];
        if (!listeners) {
            return;
        }
        var len = listeners.length;
        if (len == 0)
            return;
        this.flag++;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener[0].apply(listener[1], msgVo.param);
        }
        this.flag--;
        msgVo.dispose();
        ObjectPool.push(msgVo);
    };
    MessageCenter.setFunction = function (ins, obj, name, ex) {
        if (name.indexOf(ex) == 0 && typeof (obj[name]) == "function") {
            var msgname_1 = egret.getQualifiedClassName(obj) + MessageCenter.splite + name;
            var func_1 = obj[name];
            var newfunc = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var argsLen = args.length;
                var data;
                if (ins)
                    data = func_1.call.apply(func_1, [this].concat(args));
                else
                    data = func_1.apply(void 0, args);
                if (typeof data != "boolean" || data) {
                    MessageCenter.ins().dispatch(msgname_1, data);
                }
                return data;
            };
            newfunc["funcallname"] = msgname_1;
            obj[name] = newfunc;
            return true;
        }
        return false;
    };
    /**
     * 绑定
     * */
    MessageCenter.compile = function (thisobj, ex) {
        if (ex === void 0) { ex = "post"; }
        for (var name_1 in thisobj) {
            MessageCenter.setFunction(false, thisobj, name_1, ex);
        }
        var p = thisobj.prototype;
        var keys = Object.keys(p);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var name_2 = keys_2[_i];
            MessageCenter.setFunction(true, p, name_2, ex);
        }
    };
    MessageCenter.addListener = function (func, listener, thisObj, callobj) {
        if (callobj === void 0) { callobj = undefined; }
        if (func.funcallname) {
            MessageCenter.ins().addListener(func.funcallname, listener, thisObj);
            if (callobj)
                listener.call(callobj);
            return true;
        }
        else {
            DebugUtils.log("MessageCenter.addListener error:" + egret.getQualifiedClassName(thisObj));
            return false;
        }
    };
    MessageCenter.splite = ".";
    return MessageCenter;
}(BaseClass));
__reflect(MessageCenter.prototype, "MessageCenter");
var MessageVo = (function () {
    function MessageVo() {
    }
    MessageVo.prototype.dispose = function () {
        this.type = null;
        this.param = null;
    };
    return MessageVo;
}());
__reflect(MessageVo.prototype, "MessageVo");
var CommonUtils = (function (_super) {
    __extends(CommonUtils, _super);
    function CommonUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 给字体添加描边
     * @param lable      文字
     * @param color      表示文本的描边颜色
     * @param width      描边宽度。
     */
    CommonUtils.addLableStrokeColor = function (lable, color, width) {
        lable.strokeColor = color;
        lable.stroke = width;
    };
    /**
     * 获取一个对象的长度
     * @param list
     */
    CommonUtils.getObjectLength = function (list) {
        var num = 0;
        for (var i in list) {
            num++;
        }
        return num;
    };
    /**
     * 深度复制
     * @param _data
     */
    CommonUtils.copyDataHandler = function (obj) {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    };
    /**
     * 锁屏
     */
    CommonUtils.lock = function () {
        StageUtils.ins().getStage().touchEnabled = StageUtils.ins().getStage().touchChildren = false;
    };
    /**
     * 解屏
     */
    CommonUtils.unlock = function () {
        StageUtils.ins().getStage().touchEnabled = StageUtils.ins().getStage().touchChildren = true;
    };
    /**
     * 万字的显示
     * @param label
     * @param num
     */
    CommonUtils.labelIsOverLenght = function (label, num) {
        label.text = this.overLength(num);
    };
    CommonUtils.overLength = function (num) {
        var str = null;
        if (num < 100000) {
            str = num;
        }
        else if (num >= 100000000) {
            num = Math.floor(num / 100000000);
            str = num + "亿";
        }
        else {
            num = Math.floor(num / 10000);
            str = num + "万";
        }
        return str;
    };
    CommonUtils.overLengthChange = function (num) {
        var str = null;
        if (num < 10000) {
            str = num;
        }
        else if (num > 100000000) {
            num = (num / 100000000);
            num = Math.floor(num * 10) / 10;
            str = num + "亿";
        }
        else {
            num = (num / 10000);
            num = Math.floor(num * 10) / 10;
            str = num + "万";
        }
        return str;
    };
    /**
     * 去掉小数点后面的值
     * @param num
     * @returns {null}
     */
    CommonUtils.overLengthChange2 = function (num) {
        var str = null;
        if (num < 10000) {
            str = num;
        }
        else if (num > 100000000) {
            num = (num / 100000000);
            num = Math.floor(num * 10 / 10);
            str = num + "亿";
        }
        else {
            num = (num / 10000);
            num = Math.floor(num * 10 / 10);
            str = num + "万";
        }
        return str;
    };
    /**
     * 克隆一个对象
     * @param  {any} tarObj
     */
    CommonUtils.cloneObject = function (obj) {
        if (null == obj || "object" != typeof obj)
            return obj;
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            var copy = [];
            var len = obj.length;
            for (var i = 0; i < len; ++i) {
                copy[i] = CommonUtils.cloneObject(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                    copy[attr] = CommonUtils.cloneObject(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    /**
     * 获取一个对象的字符串名字
     * @param obj  可以是类名,数字,显示对象,字符串
     * 注意:如果参数是一个显示对象,需要递归遍历显示对象树,
     * 你的显示对象必须是所在类的子显示对象,并且添加到了显示列表中,否则将得到一个错误的值
     * 所以不是必须的话不建议传一个显示对象.
     */
    CommonUtils.getObjName = function (obj) {
        var key = "";
        if (obj instanceof egret.DisplayObject) {
            this.findName(obj);
        }
        else if (typeof (obj) == "number")
            key = obj.toString();
        else if (typeof (obj) == "string")
            key = obj;
        else if (typeof (obj) == "function")
            key = egret.getQualifiedClassName(obj);
        else
            DebugUtils.log("需要获取的对象类型错误" + obj);
        return key;
    };
    CommonUtils.findName = function (obj) {
        if (obj.parent) {
            for (var key in obj.parent) {
                if (obj.parent[key] == obj) {
                    return key;
                }
            }
            return this.findName(obj.parent);
        }
        else {
            return obj.name;
        }
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
var GameApp = (function () {
    function GameApp() {
        // ReportData.getIns().report('loaded');
        //全局配置数据
        GlobalConfig.init();
        // for (let i in ComplieClass) {
        // 	ComplieClass[i]();
        // }
        for (var i in GameSystem) {
            GameSystem[i]();
        }
        //地图网格初始化
        // GameMap.ins().init(data);
        //音乐音效处理
        SoundManager.ins().setEffectOn(true);
        GameApp.doPerLoadComplete();
        // let groupName = LocationProperty.isFirstLoad ? "firstLoad" : "preload";
        // ResourceUtils.ins().loadGroup(groupName, this.onComplete, this.onProgress, this);
    }
    GameApp.prototype.onComplete = function () {
        // RES.getResByUrl(`${MAP_DIR}maps.json`, (data) => {
        // 	ReportData.getIns().report('loaded');
        // 	//全局配置数据
        // 	// GlobalConfig.init();
        // 	// for (let i in GameSystem) {
        // 	// 	GameSystem[i]();
        // 	// }
        // 	//音乐音效处理
        // 	SoundManager.ins().setEffectOn(true);
        // 	LocationProperty.setLoadProgress(90, "(登录游戏中)");
        // 	// RoleCC.ins().connectServer();	//连接服务器
        // 	if (LocationProperty.isFirstLoad) {
        // 		ResourceUtils.ins().loadGroup("preload",
        // 			GameApp.doPerLoadComplete,
        // 			GameApp.postPerLoadProgress, GameApp);
        // 	}
        // }, this);
    };
    GameApp.prototype.onProgress = function (itemsLoaded, itemsTotal) {
        LocationProperty.setLoadProgress(40 + (itemsLoaded / itemsTotal * 30), "(加载必要资源)");
    };
    GameApp.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    //这里不直接用post是因为有可能组内有加载项失败
    //如果失败可以在这里处理之后在post
    GameApp.doPerLoadComplete = function () {
        this.postPerLoadComplete();
        ViewManager.ins().open(MainWin);
    };
    GameApp.postPerLoadComplete = function () {
    };
    GameApp.postLoginInit = function () {
    };
    return GameApp;
}());
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.LEFT = 37;
    Keyboard.UP = 38;
    Keyboard.RIGHT = 39;
    Keyboard.DOWN = 40;
    Keyboard.KC_1 = 49;
    Keyboard.KC_2 = 50;
    Keyboard.KC_3 = 51;
    Keyboard.KC_4 = 52;
    Keyboard.KC_5 = 53;
    Keyboard.KC_6 = 54;
    Keyboard.KC_7 = 55;
    Keyboard.KC_8 = 56;
    Keyboard.KC_9 = 57;
    Keyboard.KC_0 = 48;
    Keyboard.A = 65;
    Keyboard.B = 66;
    Keyboard.C = 67;
    Keyboard.D = 68;
    Keyboard.E = 69;
    Keyboard.F = 70;
    Keyboard.G = 71;
    Keyboard.H = 72;
    Keyboard.I = 73;
    Keyboard.J = 74;
    Keyboard.K = 75;
    Keyboard.L = 76;
    Keyboard.M = 77;
    Keyboard.N = 78;
    Keyboard.O = 79;
    Keyboard.P = 80;
    Keyboard.Q = 81;
    Keyboard.R = 82;
    Keyboard.S = 83;
    Keyboard.T = 84;
    Keyboard.U = 85;
    Keyboard.V = 86;
    Keyboard.W = 87;
    Keyboard.X = 88;
    Keyboard.Y = 89;
    Keyboard.Z = 90;
    Keyboard.SPACE = 32;
    /** + */
    Keyboard.SMALL_K_ADD = 107;
    /** - */
    Keyboard.SMALL_K_MIN = 109;
    /** [ */
    Keyboard.BRACE_L = 219;
    /** \ */
    Keyboard.BACKSLASH = 220;
    /** ] */
    Keyboard.BRACE_R = 221;
    /** ` */
    Keyboard.BACK_QUOTE = 192;
    /** enter */
    Keyboard.ENTER = 13; // enter	
    /* 主键盘功能键 */
    Keyboard.KC_BACKSPACE = 8; //backspace 退格键
    Keyboard.KC_TAB = 9; //tab 换行键
    Keyboard.KC_ENTER = 13; //main ENTER 回车键（主键盘区）
    Keyboard.KC_SHIFT = 16; //shift 
    Keyboard.KC_CONTROL = 17; //ctrl
    Keyboard.KC_ESCAPE = 27; //esc
    Keyboard.KC_SPACE = 32; //space 空格键
    Keyboard.KC_WINDOWS = 91; //windows
    Keyboard.KC_MENU = 93; //menu
    return Keyboard;
}());
__reflect(Keyboard.prototype, "Keyboard");
var BmpNumber = (function (_super) {
    __extends(BmpNumber, _super);
    function BmpNumber() {
        var _this = _super.call(this) || this;
        _this.bmps = [];
        _this.maxHeight = 0;
        _this.maxWidth = 0;
        return _this;
    }
    /**
     * 设置数字
     * @value 整数,或者字符串
     * @type 类型 NumberType中的值
     * @spacing 叠加间距 NumberType中的值
     * */
    BmpNumber.prototype.setNumber = function (value, numberType, spacing) {
        if (spacing === void 0) { spacing = 0; }
        var valueStr = value.toString();
        valueStr = valueStr.replace(RegExpUtil.DOT_NUMBER, "");
        var len = Math.max(valueStr.length, this.bmps.length);
        var lastX = 0;
        this.maxHeight = this.maxWidth = 0;
        for (var i = 0; i < len; i++) {
            var bmp = this.bmps[i];
            if (!bmp) {
                bmp = new egret.Bitmap;
                this.bmps[i] = bmp;
                this.addChild(bmp);
            }
            if (i < valueStr.length) {
                var texture = RES.getRes(BmpNumber.parserUrl((numberType) + valueStr[i]));
                if (texture) {
                    bmp.visible = true;
                    bmp.texture = texture;
                    this.maxHeight = Math.max(bmp.texture.textureHeight, this.maxHeight);
                    this.maxWidth += bmp.texture.textureWidth;
                }
                else
                    throw new Error("BmpNumber\u7C7B\u4F7F\u7528\u7684\u6570\u5B57\u8D44\u6E90\u5FC5\u987B\u63D0\u524D\u9884\u52A0\u8F7D,\u5728 num.png \u4E2D\u6253\u5305\u6210\u56FE\u96C6" + (BmpNumber.parserUrl((numberType) + valueStr[i])));
            }
            else {
                bmp.texture = null;
                bmp.visible = false;
            }
            bmp.x = lastX + spacing;
            lastX = bmp.x + bmp.width;
        }
    };
    BmpNumber.parserUrl = function (str) {
        return str;
    };
    Object.defineProperty(BmpNumber.prototype, "height", {
        get: function () {
            return this.maxHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BmpNumber.prototype, "width", {
        get: function () {
            return this.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    BmpNumber.prototype.reset = function () {
        this.alpha = this.scaleX = this.scaleY = 1;
        this.maxHeight = this.maxWidth = 0;
        for (var _i = 0, _a = this.bmps; _i < _a.length; _i++) {
            var bmp = _a[_i];
            bmp.texture = null;
        }
    };
    return BmpNumber;
}(egret.DisplayObjectContainer));
__reflect(BmpNumber.prototype, "BmpNumber");
var HotspotBitmap = (function (_super) {
    __extends(HotspotBitmap, _super);
    function HotspotBitmap() {
        var _this = _super.call(this) || this;
        _this._hotspot = [];
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
        return _this;
    }
    HotspotBitmap.prototype.addHotspotArea = function (rect, callBack, thisObj, para) {
        this._hotspot.push({ "rect": rect, "callBack": callBack, "thisObj": thisObj, "para": para });
    };
    HotspotBitmap.prototype.onTouch = function (e) {
        var x = e.localX;
        var y = e.localY;
        var tempObj;
        for (var i = 0; i < this._hotspot.length; i++) {
            tempObj = this._hotspot[i];
            if (tempObj.rect.contains(x, y)) {
                if (tempObj.para)
                    tempObj.callBack.call(tempObj.thisObj, tempObj.para);
                else
                    tempObj.callBack.call(tempObj.thisObj);
            }
        }
    };
    return HotspotBitmap;
}(egret.Bitmap));
__reflect(HotspotBitmap.prototype, "HotspotBitmap");
/**
 *  动画类
 * @author
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        /**倍率 ,越大越快*/
        _this.rate = 1;
        _this._mcFactory = new egret.MovieClipDataFactory();
        return _this;
    }
    MovieClip.prototype.playFile = function (name, playCount, compFun, remove) {
        var _this = this;
        if (playCount === void 0) { playCount = 1; }
        if (compFun === void 0) { compFun = null; }
        if (remove === void 0) { remove = true; }
        this.time = egret.getTimer();
        this._compFun = compFun;
        this.playCount = playCount;
        this.remove = remove;
        TimerManager.ins().remove(this.playComp, this);
        if (this.name == name) {
            this.createBody();
            return;
        }
        this.name = name;
        this.jsonData = null;
        this.texture = null;
        RES.getResByUrl(this.name + ".json", function (data) {
            if (_this.name != name || !data)
                return;
            _this.jsonData = data;
            _this.createBody();
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this.name + ".png", function (data) {
            if (_this.name != name || !data)
                return;
            _this.texture = data;
            _this.createBody();
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    /**
     * 创建主体动画
     */
    MovieClip.prototype.createBody = function () {
        if (!this.jsonData || !this.texture)
            return;
        this._mcFactory.mcDataSet = this.jsonData;
        this._mcFactory.texture = this.texture;
        var temp = this.name.split("/");
        var tempName = temp.pop();
        this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
        if (!(this.name in MovieClip.originalRate)) {
            MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
        }
        this.frameRate = (MovieClip.originalRate[this.name] * this.rate) >> 0;
        //从第一帧开始自动播放
        this.gotoAndPlay(1, this.playCount);
        this.visible = true;
        if (this.playCount > 0) {
            var tempTime = egret.getTimer() - this.time;
            tempTime = this.playTime * this.playCount - tempTime;
            if (tempTime > 0)
                TimerManager.ins().doTimer(tempTime, 1, this.playComp, this);
            else
                this.playComp();
        }
        //抛出内容已经改变事件
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    /**
     * 自动播放次数完成处理
     * @param e
     */
    MovieClip.prototype.playComp = function () {
        if (this.stage && this._compFun)
            this._compFun();
        if (this.remove)
            DisplayUtils.removeFromParent(this);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        /** 播放总时长(毫秒) */
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearComFun = function () {
        this._compFun = null;
    };
    Object.defineProperty(MovieClip.prototype, "enableCache", {
        set: function (value) {
            if (this._mcFactory) {
                this._mcFactory.enableCache = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 原始帧频 */
    MovieClip.originalRate = {};
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
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
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var GameSocket = (function () {
    function GameSocket() {
        this._socketStatus = 0;
        this._lastReceiveTime = 0;
        this.pid = 0;
        /**
         * 服务器协议处理注册表
         * 格式
         * PACK_HANDLER[sysId][msgId] = [fun,funThisObj]
         */
        this.PACK_HANDLER = [];
        this._serverId = 0;
        this._user = "";
        this._pwd = "";
        this.isCrossLogin = false;
        // private big: number = 0;
        // private small: number = 0;
        // private mid: number = 0;
        this.lastPos = -1;
        egret.startTick(this.update, this);
        this.newSocket();
        this.recvPack = ObjectPool.pop(GameSocket.CLASSNAME);
        this._packets = [];
    }
    GameSocket.ins = function () {
        if (!GameSocket._ins) {
            GameSocket._ins = new GameSocket();
        }
        return GameSocket._ins;
    };
    GameSocket.prototype.newSocket = function () {
        // this.socket_ = new egret.WebSocket;
        // this.socket_.type = egret.WebSocket.TYPE_BINARY;
        // this.socket_.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        // this.socket_.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        // this.socket_.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        // this.socket_.addEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
    };
    /**
     * 发送到服务器
     * @param bytes
     */
    GameSocket.prototype.sendToServer = function (bytes) {
        this.send(bytes);
        // bytes.position = 0;
        // DebugUtils.log("发送协议:" + bytes.read);
        GameSocket.recycleByte(bytes);
    };
    GameSocket.prototype.connectError = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        alert("\u7F51\u7EDC\u4E2D\u65AD--" + this._host + ":" + this._port);
        window["connectError"]();
        TimerManager.ins().remove(this.reLogin, this);
        TimerManager.ins().doTimer(5000, 1, this.reLogin, this);
    };
    GameSocket.prototype.connect = function (host, port) {
        this.updateStatus(GameSocket.STATUS_CONNECTING);
        this._host = host;
        this._port = port;
        this.socket_.connect(host, port);
    };
    GameSocket.prototype.close = function () {
        if (!this.socket_)
            return;
        DebugUtils.log("close socket！ip:" + this._host + " port:" + this._port);
        this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
        this.socket_.close();
    };
    GameSocket.prototype.send = function (message) {
        if (this._socketStatus == GameSocket.STATUS_COMMUNICATION) {
            this.sendPack(message);
            return true;
        }
        else {
            DebugUtils.log("发送数据时没和服务连接或者未进入通信状态");
            return false;
        }
    };
    GameSocket.prototype.onSocketConnected = function (e) {
        DebugUtils.log("Socket connected！ip:" + this._host + " port:" + this._port);
        TimerManager.ins().remove(this.reLogin, this);
        this.updateStatus(GameSocket.STATUS_CHECKING);
        var bytes = new GameByteArray;
        bytes.writeUnsignedInt(Encrypt.getSelfSalt());
        this.socket_.writeBytes(bytes);
        this.socket_.flush();
        if (this._onConnected) {
            this._onConnected();
        }
    };
    GameSocket.prototype.onSocketRead = function (e) {
        if (this.lastPos != -1) {
            for (var i = 0; i <= this.lastPos; i++) {
                GameSocket.recycleByte(this._packets[i]);
            }
            this._packets.splice(0, this.lastPos + 1);
            this.lastPos = -1;
        }
        // 检验阶段
        if (this._socketStatus < GameSocket.STATUS_COMMUNICATION) {
            this.sendKeyToServer();
            return;
        }
        var bytesCache = this.recvPack;
        // 记录接收数据包时间
        this._lastReceiveTime = egret.getTimer();
        // 将收到的字节流写入到存储接收到服务器数据包的字节流
        this.socket_.readBytes(bytesCache, bytesCache.length);
        // 截取完成数据包并派发
        var pos = 0;
        bytesCache.position = 0;
        // 处理数据包数量
        while (bytesCache.bytesAvailable > GameSocket.HEAD_SIZE) {
            // 识别并记录包起始位置
            pos = bytesCache.position;
            var tag = bytesCache.readUnsignedShort();
            if (tag != GameSocket.DEFAULT_TAG)
                continue;
            // 读取数据包buff长度
            var buffLen = bytesCache.readUnsignedShort();
            // 预留4字节
            bytesCache.position += 4;
            // 读取buffLen长度的数据
            if (buffLen > bytesCache.bytesAvailable) {
                break;
            }
            var datasize = buffLen + GameSocket.HEAD_SIZE;
            if ((2 * datasize) > bytesCache.bytesAvailable) {
                // this.big++;
                var newbuff = ObjectPool.pop(GameSocket.CLASSNAME);
                newbuff.clear();
                if (bytesCache.bytesAvailable > buffLen) {
                    var curpos = bytesCache.position;
                    bytesCache.position += buffLen;
                    bytesCache.readBytes(newbuff, 0, bytesCache.bytesAvailable);
                    bytesCache.position = curpos;
                    // this.mid++;
                }
                this._packets.push(bytesCache);
                bytesCache = this.recvPack = newbuff;
                bytesCache.position = 0;
            }
            else {
                // this.small++;
                // 读取包的数据
                var buff = ObjectPool.pop(GameSocket.CLASSNAME);
                buff.clear();
                bytesCache.readBytes(buff, 0, buffLen);
                // 收集完成的消息包，然后一次性派发，这样也便于外部模块处理异常
                this._packets.push(buff);
            }
            // 记录截取位置，即下一个包的起始位置
            pos = bytesCache.position;
            // DebugUtils.log(`big:${this.big},small:${this.small}, mid:${this.mid}`);
        }
        // 输出处理消息包的数量
        // DebugUtils.log("收包时间：" + this._lastReceiveTime, "包数量：" + numPackets);
        if (pos) {
            bytesCache.position = pos;
            bytesCache.readBytes(bytesCache);
            bytesCache.length -= pos;
        }
    };
    GameSocket.prototype.update = function (time) {
        // 派发消息包
        for (var _i = 0, _a = this._packets; _i < _a.length; _i++) {
            var pack = _a[_i];
            this.lastPos++;
            this.processRecvPacket(pack);
            GameSocket.recycleByte(pack);
        }
        this._packets.length = 0;
        this.lastPos = -1;
        return false;
    };
    GameSocket.prototype.sendKeyToServer = function () {
        var pack = new GameByteArray;
        this.socket_.readBytes(pack);
        pack.position = 0;
        var salt = pack.readUnsignedInt();
        Encrypt.setTargetSalt(salt);
        // 发送检验码到服务器
        pack.position = 0;
        pack.writeShort(Encrypt.getCheckKey());
        this.socket_.writeBytes(pack, 0, 2);
        // 进入通信状态
        this.updateStatus(GameSocket.STATUS_COMMUNICATION);
    };
    GameSocket.prototype.onSocketClose = function (e) {
        DebugUtils.log("与服务器的连接断开了！ip:" + this._host + " port:" + this._port);
        this.updateStatus(GameSocket.STATUS_DISCONNECT);
        if (this._onClosed) {
            this._onClosed();
        }
        // TimerManager.ins().remove(this.reLogin, this);
        // TimerManager.ins().doTimer(5000, 1, this.reLogin, this);
        // ConfirmWin.show(`提示`, `您已经与服务器断开连接。\n是否确认重连？`, (type) => {
        // 	if(type == 0) {
        // 		this.reLogin();
        // 	}
        // }, this, [`确定`], 0, -1, 0.5);
    };
    GameSocket.prototype.reLogin = function () {
        this.close();
        this.newSocket();
        this.login(this._user, this._pwd, this._serverId, this._host, this._port);
    };
    GameSocket.prototype.updateStatus = function (status) {
        if (this._socketStatus != status) {
            var old = this._socketStatus;
            this._socketStatus = status;
            this.onFinishCheck(status, old);
        }
    };
    GameSocket.prototype.onFinishCheck = function (newStatus, oldStatus) {
        if (newStatus == GameSocket.STATUS_COMMUNICATION) {
            DebugUtils.log("与服务器建立通信成功！ip:" + this._host + " port:" + this._port);
            if (!this.isCrossLogin) {
                this.sendCheckAccount(this._user, this._pwd);
            }
            else {
            }
        }
        else if (newStatus == GameSocket.STATUS_DISCONNECT) {
            // TODO: output error message
        }
    };
    Object.defineProperty(GameSocket.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameSocket.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    GameSocket.prototype.sendCheckAccount = function (user, pwd) {
        var bytes = this.getBytes();
        bytes.writeCmd(255, 1);
        bytes.writeInt(this._serverId);
        bytes.writeString(user);
        bytes.writeString(pwd);
        this.sendToServer(bytes);
    };
    /**跨服连接 */
    GameSocket.prototype.crossLogin = function (serverId, ip, port, key) {
        this.close();
        this.newSocket();
        this.isCrossLogin = true;
        this.crossLoginKey = key;
        this.connect(ip, port);
    };
    GameSocket.prototype.login = function (user, pwd, serverID, ip, port) {
        this.isCrossLogin = false;
        this._user = user;
        this._pwd = pwd;
        this._serverId = serverID;
        if (ip.split(":")[1] && ip.split(":")[1].length)
            port = parseInt(ip.split(":")[1]);
        if (!this.socket_.connected) {
            DebugUtils.log("connect to " + ip + " ,port: " + port);
            this.connect(ip, port);
        }
        else {
            this.sendCheckAccount(user, pwd);
        }
    };
    GameSocket.prototype.processRecvPacket = function (packet) {
        var sysId = packet.readUnsignedByte();
        var msgId = packet.readUnsignedByte();
        this.dispatch(sysId, msgId, packet);
    };
    /** 派发协议 */
    GameSocket.prototype.dispatch = function (sysId, msgId, byte) {
        // DebugUtils.log("派发协议 ::::::: ", sysId, msgId);  // lyl_log
        if (!this.PACK_HANDLER[sysId] || !this.PACK_HANDLER[sysId][msgId]) {
            // egret.log("未处理服务器协议：" + sysId + "-" + msgId);
            DebugUtils.log("未处理服务器协议：" + sysId + "-" + msgId);
            return;
        }
        var arr = this.PACK_HANDLER[sysId][msgId];
        arr[0].call(arr[1], byte);
    };
    /**
     * 回收bytes对象
     * @param byte
     */
    GameSocket.recycleByte = function (byte) {
        ObjectPool.push(byte);
    };
    /**
     * 从对象池获取一个bytes对象
     */
    GameSocket.prototype.getBytes = function () {
        var pack = ObjectPool.pop(GameSocket.CLASSNAME);
        pack.clear();
        pack.writeShort(GameSocket.DEFAULT_TAG);
        pack.writeShort(0);
        pack.writeShort(0);
        pack.writeShort(GameSocket.DEFAULT_CRC_KEY);
        pack.writeUnsignedInt(this.pid++);
        return pack;
    };
    /**
     * 注册一个服务器发送到客户端的消息处理
     */
    GameSocket.prototype.registerSTCFunc = function (sysId, msgId, fun, sysClass) {
        if (!this.PACK_HANDLER[sysId]) {
            this.PACK_HANDLER[sysId] = [];
        }
        else if (this.PACK_HANDLER[sysId][msgId]) {
            DebugUtils.error("\u91CD\u590D\u6CE8\u518C\u534F\u8BAE\u63A5\u53E3" + sysId + "-" + msgId);
            return;
        }
        this.PACK_HANDLER[sysId][msgId] = [fun, sysClass];
    };
    GameSocket.prototype.setOnClose = function (ex, obj) {
        this._onClosed = ex.bind(obj);
    };
    GameSocket.prototype.setOnConnected = function (ex, obj) {
        this._onConnected = ex.bind(obj);
    };
    GameSocket.prototype.sendPack = function (pack) {
        // 初始化包头
        var headsize = GameSocket.HEAD_SIZE;
        pack.position = 2;
        pack.writeShort(pack.length - headsize);
        // 计算数据CRC
        var msgCK = Encrypt.getCRC16ByPos(pack, headsize);
        pack.position = 4;
        pack.writeShort(msgCK);
        // 计算包头CRC
        var headerCRC = Encrypt.getCRC16(pack, headsize);
        // 将计算出来的包头CRC替换默认包头CRC
        pack.position = 6;
        pack.writeShort(headerCRC);
        // 对数据CRC和包头CRC进行加密
        Encrypt.encode(pack, 4, 4);
        this.socket_.writeBytes(pack);
    };
    GameSocket.DEFAULT_TAG = 0xCCEE; // 约定的信息头
    GameSocket.DEFAULT_CRC_KEY = 0x765D; // 默认包头校验
    GameSocket.HEAD_SIZE = 8; // 最小通信封包字节长度
    /** 连接中 */
    GameSocket.STATUS_CONNECTING = 1;
    /** 检验中 */
    GameSocket.STATUS_CHECKING = 2;
    /** 连接生效 */
    GameSocket.STATUS_COMMUNICATION = 3;
    /** 关闭连接 */
    GameSocket.STATUS_DISCONNECT = 4;
    GameSocket.CLASSNAME = egret.getQualifiedClassName(GameByteArray);
    return GameSocket;
}());
__reflect(GameSocket.prototype, "GameSocket");
/**
 * 数据包编号（对应协议编辑器的大id）
 * @author
 */
var PackageID;
(function (PackageID) {
    /** 默认系统 */
    PackageID.Default = 0, 
    /** 移动系统 */
    PackageID.Move = 1;
})(PackageID || (PackageID = {}));
var CRC16 = (function () {
    function CRC16() {
    }
    CRC16.update = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        var c = 0;
        var index = 0;
        if (length == 0) {
            length = bytes.length;
        }
        bytes.position = offset;
        for (var i = offset; i < length; ++i) {
            index = (CRC16.CRCBitReflect(bytes.readByte(), 8) & 0xFF) ^ ((c >> 8) & 0xFFFFFF);
            index &= 0xFF;
            c = CRC16.CRCTable[index] ^ ((c << 8) & 0xFFFFFF00);
        }
        return (CRC16.CRCBitReflect(c, 16) ^ 0) & 0xFFFF;
    };
    CRC16.makeCRCTable = function () {
        var c = 0;
        var crcTable = new Array(256);
        for (var i = 0; i < 256; ++i) {
            c = (i << 8) & 0xFFFFFF00;
            for (var j = 0; j < 8; ++j) {
                c = (c & 0x8000) ? ((c << 1) & 0xFFFFFFFE) ^ CRC16.POLYNOMIAL : ((c << 1) & 0xFFFFFFFE);
            }
            crcTable[i] = c;
        }
        return crcTable;
    };
    CRC16.CRCBitReflect = function (input, bitCount) {
        var out = 0;
        var x = 0;
        bitCount--;
        for (var i = 0; i <= bitCount; ++i) {
            x = bitCount - i;
            if (input & 1) {
                out |= (1 << x) & CRC16.DropBits[x];
            }
            input = (input >> 1) & 0x7FFFFFFF;
        }
        return out;
    };
    CRC16.POLYNOMIAL = 0x1021; // CRC16校验方式的多项式
    CRC16.CRCTable = CRC16.makeCRCTable();
    // 反转数据的比特位, 反转后MSB为1.
    // 反转前: 1110100011101110 0010100111100000
    // 反转后: 1111001010001110 1110001011100000
    CRC16.DropBits = [
        0xFFFFFFFF, 0xFFFFFFFE, 0xFFFFFFFC, 0xFFFFFFF8,
        0xFFFFFFF0, 0xFFFFFFE0, 0xFFFFFFC0, 0xFFFFFF80,
        0xFFFFFF00, 0xFFFFFE00, 0xFFFFFC00, 0xFFFFF800,
        0xFFFFF000, 0xFFFFE000, 0xFFFFC000, 0xFFFF8000
    ];
    return CRC16;
}());
__reflect(CRC16.prototype, "CRC16");
var Encrypt = (function () {
    function Encrypt() {
    }
    Encrypt.encode = function (inBuff, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (offset >= inBuff.length)
            return 0;
        var end = length ? offset + length : inBuff.length;
        if (end > inBuff.length)
            end = inBuff.length;
        inBuff.position = offset;
        for (var i = offset; i < end; ++i) {
            var byte = inBuff.readByte();
            byte ^= Encrypt.sKeyBuff[i % 4];
            inBuff.position--;
            inBuff.writeByte(byte);
        }
        return end - offset;
    };
    Encrypt.decode = function (inBuff, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        // 当前的加密算法和解密算法是一样的，反向操作
        return Encrypt.encode(inBuff, offset, length);
    };
    Encrypt.getCRC16 = function (bytes, length) {
        if (length === void 0) { length = 0; }
        return CRC16.update(bytes, 0, length);
    };
    Encrypt.getCRC16ByPos = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        return CRC16.update(bytes, offset, length);
    };
    Encrypt.getCheckKey = function () {
        var bytes = new egret.ByteArray();
        bytes.endian = egret.Endian.LITTLE_ENDIAN;
        bytes.writeUnsignedInt(Encrypt.sKey);
        var ck = CRC16.update(bytes);
        return ck;
    };
    Encrypt.getSelfSalt = function () {
        return Encrypt.sSelfSalt;
    };
    Encrypt.getTargetSalt = function () {
        return Encrypt.sTargetSalt;
    };
    Encrypt.setTargetSalt = function (value) {
        Encrypt.sTargetSalt = value;
        Encrypt.makeKey();
    };
    Encrypt.makeSalt = function () {
        var d = new Date();
        return Math.random() * d.getTime();
    };
    Encrypt.makeKey = function () {
        Encrypt.sKey = (Encrypt.sSelfSalt ^ Encrypt.sTargetSalt) + 8254;
        for (var i = 0; i < 4; ++i) {
            Encrypt.sKeyBuff[i] = (Encrypt.sKey & (0xFF << (i << 3))) >> (i << 3);
        }
    };
    Encrypt.sSelfSalt = Encrypt.makeSalt();
    Encrypt.sKeyBuff = new Array(4);
    return Encrypt;
}());
__reflect(Encrypt.prototype, "Encrypt");
/**
 * Created by Administrator on 2016/7/18.
 */
var ReportData = (function () {
    function ReportData() {
        this.httpRequest = new egret.HttpRequest();
    }
    ReportData.getIns = function () {
        this._ins = this._ins || new ReportData();
        return this._ins;
    };
    /** 上报打点记录 */
    ReportData.prototype.report = function (str, reportType) {
        if (reportType === void 0) { reportType = "load"; }
        var roleCount = LocationProperty.roleCount;
        //不是新账号不需要上报数据
        if (reportType == "load" && (isNaN(roleCount) || roleCount != 0))
            return;
        /*
         参数说明：
         pfrom_id: 平台标识 string（16）//登陆时新增登陆参数 pfid
         server_id：区服id smallint（5）
         account: 平台帐号 string(64)
         counter: 打点标识 固定值load
         kingdom：记录打点位置 string 32
         is_new：是否新帐号 默认为 1
         exts：扩展字段 string（32） 非必要字段
         ip 登陆ip
         logdate:2016-03-07 04:23:48请求时间精确到秒
         */
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            ua = "1";
        }
        else if (/android/.test(ua)) {
            ua = "2";
        }
        else
            ua = "0";
        str = str.replace(/@/g, "");
        str = str.replace(/#/g, "");
        var data = "&data=";
        data += "1";
        data += "|" + LocationProperty.srvid;
        data += "|" + LocationProperty.openID;
        data += "|" + reportType;
        data += "|" + str;
        data += "|" + LocationProperty.isnew;
        data += "|" + ua;
        data += "|" + LocationProperty.login_ip;
        data += "|" + DateUtils.getFormatBySecond(new Date().getTime(), 2);
        data += "|" + LocationProperty.appid;
        var add = DeviceUtils.isLocation ? "192.168.201.235:81" : "report.jzsc.7yao.top";
        // let m = new md5();
        // let key = m.hex_md5(`${reportType}027a47eabf1ebcb409b7fe680ff69008`);
        // key = m.hex_md5(key);
        //
        // this.reportUrl("http://" + add + "/report?appv=1.0&counter=" + reportType + "&key=" + key + data);
    };
    /** 上报打点记录 */
    ReportData.prototype.report2 = function (str, reportType) {
        // let roleCount: number = LocationProperty.roleCount;
        // //不是新账号不需要上报数据
        // if (reportType == "load" && (isNaN(roleCount) || roleCount != 0))
        // 	return;
        if (reportType === void 0) { reportType = "load"; }
        /*
         参数说明：
         pfrom_id: 平台标识 string（16）//登陆时新增登陆参数 pfid
         server_id：区服id smallint（5）
         account: 平台帐号 string(64)
         counter: 打点标识 固定值load
         kingdom：记录打点位置 string 32
         is_new：是否新帐号 默认为 1
         exts：扩展字段 string（32） 非必要字段
         ip 登陆ip
         logdate:2016-03-07 04:23:48请求时间精确到秒
         */
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            ua = "1";
        }
        else if (/android/.test(ua)) {
            ua = "2";
        }
        else
            ua = "0";
        var data = "&data=";
        data += "1";
        data += "|" + LocationProperty.srvid;
        data += "|" + LocationProperty.openID;
        data += "|" + reportType;
        data += "|" + str;
        data += "|" + LocationProperty.isnew;
        data += "|" + ua;
        data += "|" + LocationProperty.login_ip;
        data += "|" + DateUtils.getFormatBySecond(new Date().getTime(), 2);
        data += "|" + LocationProperty.appid;
        var add = DeviceUtils.isLocation ? "192.168.201.235:81" : "report.jzsc.7yao.top";
        // let m = new md5();
        // let key = m.hex_md5(`${reportType}027a47eabf1ebcb409b7fe680ff69008`);
        // key = m.hex_md5(key);
        // this.reportUrl("http://" + add + "/report?appv=1.0&counter=" + reportType + "&key=" + key + data);
    };
    /** 上报建议 */
    ReportData.prototype.advice = function (str, func, funcThis) {
        var f = function (v) {
            this.httpRequest.removeEventListener(egret.Event.COMPLETE, f, this);
            var request = v.currentTarget;
            if (request.response == "ok") {
                TipsControl.ins().showTips("提交问题成功！");
                func.call(funcThis);
            }
            else
                TipsControl.ins().showTips("网络出故障，请重新提交问题！");
        };
        this.httpRequest.addEventListener(egret.Event.COMPLETE, f, this);
        var p;
        while (true) {
            p = str.indexOf("@");
            if (p < 0)
                break;
            str = str.replace("@", "");
        }
        var data = "&serverid=" + LocationProperty.srvid;
        // data += "&sign=" + new md5().hex_md5(`${LocationProperty.srvid || 0}${GameGlobal.actorModel.actorID}enter_reportfeedbackqiyaohudongyule!@#`);
        // data += "&actorid=" + GameGlobal.actorModel.actorID;
        // data += "&actorname=" + GameGlobal.actorModel.name;
        // data += "&feedcnt=" + str;
        // data += "&openid=" + LocationProperty.openID;
        // data += "&userlevel=" + GameGlobal.actorModel.level;
        // data += "&viplevel=" + GameGlobal.actorModel.vipLv;
        // data += "&appid=" + LocationProperty.appid;
        var add = DeviceUtils.isLocation ? "cq.api.com" : "login.jzsc.7yao.top";
        this.reportUrl("http://" + add + "/api/load?counter=enter_report" + data);
        //this.httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        //this.httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    ReportData.prototype.reportUrl = function (url, method) {
        this.httpRequest.open(url, method ? method : egret.HttpMethod.GET);
        this.httpRequest.send();
    };
    ReportData.prototype.reportSDK = function (str) {
        // window['reportSDK'](str,
        // 	LocationProperty.app_openid,
        // 	LocationProperty.srvid,
        // 	LocationProperty.openID,
        // 	LocationProperty.nickName,
        // 	GameGlobal.actorModel.level);
    };
    return ReportData;
}());
__reflect(ReportData.prototype, "ReportData");
/**
 * Created by Administrator on 2017/1/14.
 */
var RES_DIR = 'res/';
var RES_DIR_MAP = "map/";
var RES_DIR_BODY = RES_DIR + "body/";
var RES_DIR_EFF = RES_DIR + "eff/";
var RES_DIR_ITEM = RES_DIR + "item/";
var RES_DIR_MONSTER = RES_DIR + "monster/";
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        SceneManager.ins().runScene(MainScene);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
window['MessageVo'] = MessageVo;
window['TimerHandler'] = TimerHandler;
window['BaseSystem'] = BaseSystem;
window['Stone'] = Stone;
var DelayOptManager = (function (_super) {
    __extends(DelayOptManager, _super);
    function DelayOptManager() {
        var _this = _super.call(this) || this;
        //每帧运算逻辑的时间阈值，执行代码超过这个时间就跳过到下一帧继续执行，根据实际情况调整，因为每一帧除了这里的逻辑还有别的逻辑要做对吧
        _this.TIME_THRESHOLD = 2;
        _this._delayOpts = [];
        egret.startTick(_this.runCachedFun, _this);
        return _this;
    }
    DelayOptManager.ins = function () {
        return _super.ins.call(this);
    };
    DelayOptManager.prototype.addDelayOptFunction = function (thisObj, fun, funPara, callBack, para) {
        this._delayOpts.push({ "fun": fun, "funPara": funPara, "thisObj": thisObj, "callBack": callBack, "para": para });
    };
    DelayOptManager.prototype.clear = function () {
        this._delayOpts.length = 0;
    };
    // public stop(): void {
    // 	TimerManager.ins().remove(this.runCachedFun, this);
    // }
    DelayOptManager.prototype.runCachedFun = function (time) {
        if (this._delayOpts.length == 0) {
            return false;
        }
        var timeFlag = egret.getTimer();
        var funObj;
        while (this._delayOpts.length) {
            funObj = this._delayOpts.shift();
            if (funObj.funPara)
                funObj.fun.call(funObj.thisObj, funObj.funPara);
            else
                funObj.fun.call(funObj.thisObj);
            if (funObj.callBack) {
                if (funObj.para != undefined)
                    funObj.callBack.call(funObj.thisObj, funObj.para);
                else
                    funObj.callBack();
            }
            if (egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
                break;
        }
        return false;
    };
    return DelayOptManager;
}(BaseClass));
__reflect(DelayOptManager.prototype, "DelayOptManager");
var FrameTick = (function () {
    function FrameTick() {
        this.list = [];
    }
    FrameTick.prototype.tick = function (idx) {
        this.list[idx] = TimerManager.ins().getFrameId();
    };
    FrameTick.prototype.isTick = function (idx) {
        return this.list[idx] == TimerManager.ins().getFrameId();
    };
    FrameTick.prototype.checkAndTick = function (idx) {
        if (this.isTick(idx)) {
            return true;
        }
        else {
            this.tick(idx);
            return false;
        }
    };
    return FrameTick;
}());
__reflect(FrameTick.prototype, "FrameTick");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    /**
     * 构造函数
     */
    function SceneManager() {
        return _super.call(this) || this;
    }
    SceneManager.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 清空处理
     */
    SceneManager.prototype.clear = function () {
        var nowScene = this._currScene;
        if (nowScene) {
            nowScene.onExit();
            this._currScene = undefined;
        }
    };
    /**
     * 切换场景
     * @param key 场景唯一标识
     */
    SceneManager.prototype.runScene = function (SceneClass) {
        if (SceneClass == null) {
            Debug.log("runScene:scene is null");
            return;
        }
        var oldScene = this._currScene;
        if (oldScene) {
            oldScene.onExit();
            oldScene = undefined;
        }
        var s = new SceneClass();
        s.onEnter();
        this._currScene = s;
    };
    /**
     * 获取当前Scene
     * @returns {number}
     */
    SceneManager.prototype.getCurrScene = function () {
        return this._currScene;
    };
    return SceneManager;
}(BaseClass));
__reflect(SceneManager.prototype, "SceneManager");
var ObjectPool = (function () {
    /**
     * 构造函数
     */
    function ObjectPool() {
        this._objs = [];
    }
    /**
     * 放回一个对象
     * @param obj
     */
    ObjectPool.prototype.pushObj = function (obj) {
        this._objs.push(obj);
    };
    /**
     * 取出一个对象
     * @returns {*}
     */
    ObjectPool.prototype.popObj = function () {
        if (this._objs.length > 0) {
            return this._objs.pop();
        }
        else {
            return null;
        }
    };
    /**
     * 清除所有缓存对象
     */
    ObjectPool.prototype.clear = function () {
        while (this._objs.length > 0) {
            this._objs.pop();
        }
    };
    /**
     * 取出一个对象
     * @param classZ Class
     * @return Object
     *
     */
    ObjectPool.pop = function (refKey) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }
        var list = ObjectPool._content[refKey];
        if (list.length) {
            var i = list.pop();
            return i;
        }
        else {
            var classZ = egret.getDefinitionByName(refKey);
            console.log(refKey);
            var argsLen = args.length;
            var obj = void 0;
            obj = new (classZ.bind.apply(classZ, [void 0].concat(args)))();
            obj.ObjectPoolKey = refKey;
            return obj;
        }
    };
    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @returns {any}
     */
    ObjectPool.popWithExtraKey = function (refKey, extraKey) {
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }
        var obj;
        var list = ObjectPool._content[refKey];
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].extraKey == extraKey) {
                    obj = list[i];
                    list.splice(i, 1);
                    break;
                }
            }
        }
        if (!obj) {
            var classZ = egret.getDefinitionByName(refKey);
            window["" + classZ] = classZ;
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        }
        return obj;
    };
    /**
     * 放入一个对象
     * @param obj
     *
     */
    ObjectPool.push = function (obj) {
        if (obj == null) {
            return false;
        }
        var refKey = obj.ObjectPoolKey;
        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        if (!refKey || !ObjectPool._content[refKey] ||
            ObjectPool._content[refKey].indexOf(obj) > -1) {
            return false;
        }
        ObjectPool._content[refKey].push(obj);
        return true;
    };
    /**
     * 清除所有对象
     */
    ObjectPool.clear = function () {
        ObjectPool._content = {};
    };
    /**
     * 清除某一类对象
     * @param classZ Class
     * @param clearFuncName 清除对象需要执行的函数
     */
    ObjectPool.clearClass = function (refKey, clearFuncName) {
        if (clearFuncName === void 0) { clearFuncName = null; }
        var list = ObjectPool._content[refKey];
        while (list && list.length) {
            var obj = list.pop();
            if (clearFuncName) {
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[refKey] = null;
        delete ObjectPool._content[refKey];
    };
    /**
     * 缓存中对象统一执行一个函数
     * @param classZ Class
     * @param dealFuncName 要执行的函数名称
     */
    ObjectPool.dealFunc = function (refKey, dealFuncName) {
        var list = ObjectPool._content[refKey];
        if (list == null) {
            return;
        }
        var i = 0;
        var len = list.length;
        for (i; i < len; i++) {
            list[i][dealFuncName]();
        }
    };
    ObjectPool._content = {};
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
var SoundBg = (function (_super) {
    __extends(SoundBg, _super);
    /**
     * 构造函数
     */
    function SoundBg() {
        var _this = _super.call(this) || this;
        _this._currBg = "";
        return _this;
    }
    /**
     * 停止当前音乐
     */
    SoundBg.prototype.stop = function () {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    /**
     * 播放某个音乐
     * @param effectName
     */
    SoundBg.prototype.play = function (effectName) {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundBg.prototype.playSound = function (sound) {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, 0);
        this._currSoundChannel.volume = this._volume;
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundBg.prototype.setVolume = function (volume) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundBg.prototype.loadedPlay = function (key) {
        if (this._currBg == key) {
            this.playSound(RES.getRes(key));
        }
    };
    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    SoundBg.prototype.checkCanClear = function (key) {
        return this._currBg != key;
    };
    return SoundBg;
}(BaseSound));
__reflect(SoundBg.prototype, "SoundBg");
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    /**
     * 构造函数
     */
    function SoundEffects() {
        return _super.call(this) || this;
    }
    /**
     * 播放一个音效
     * @param effectName
     */
    SoundEffects.prototype.play = function (effectName) {
        var sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundEffects.prototype.playSound = function (sound) {
        var channel = sound.play(0, 1);
        channel.volume = this._volume;
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundEffects.prototype.loadedPlay = function (key) {
        this.playSound(RES.getRes(key));
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    /**
     * 构造函数
     */
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.bgOn = true;
        _this.effectOn = true;
        _this.bgVolume = 0.5;
        _this.effectVolume = 0.5;
        _this.bg = new SoundBg();
        _this.bg.setVolume(_this.bgVolume);
        _this.effect = new SoundEffects();
        _this.effect.setVolume(_this.effectVolume);
        return _this;
    }
    SoundManager.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 播放音效
     * @param effectName
     */
    SoundManager.prototype.playEffect = function (effectName) {
        if (!this.effectOn)
            return;
        this.effect.play(effectName);
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundManager.prototype.playBg = function (bgName) {
        this.currBg = bgName;
        if (!this.bgOn)
            return;
        this.bg.play(bgName);
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBg = function () {
        this.bg.stop();
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    SoundManager.prototype.setEffectOn = function ($isOn) {
        this.effectOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    SoundManager.prototype.setBgOn = function ($isOn) {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        }
        else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    SoundManager.prototype.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundManager.prototype.getBgVolume = function () {
        return this.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    SoundManager.prototype.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    SoundManager.prototype.getEffectVolume = function () {
        return this.effectVolume;
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    SoundManager.CLEAR_TIME = 3 * 60 * 1000;
    return SoundManager;
}(BaseClass));
__reflect(SoundManager.prototype, "SoundManager");
var AlgorithmSorting;
(function (AlgorithmSorting) {
    /** 升序 */
    AlgorithmSorting[AlgorithmSorting["ascending"] = 0] = "ascending";
    /** 降序 */
    AlgorithmSorting[AlgorithmSorting["descending"] = 1] = "descending";
})(AlgorithmSorting || (AlgorithmSorting = {}));
var Algorithm = (function () {
    function Algorithm() {
    }
    Algorithm.sortOn = function (t, property, type) {
        var _this = this;
        if (type === void 0) { type = null; }
        t.sort(function (a, b) {
            var as = 0;
            var bs = 0;
            var len = property.length;
            for (var i = 0; i < len; i++) {
                var key = property[i];
                if (type && type[i] == AlgorithmSorting.descending) {
                    if (a[key] > b[key])
                        as = as | (1 << (len - 1 - i));
                    if (a[key] < b[key])
                        bs = bs | (1 << (len - 1 - i));
                }
                else {
                    if (a[key] < b[key])
                        as = as | (1 << (len - 1 - i));
                    if (a[key] > b[key])
                        bs = bs | (1 << (len - 1 - i));
                }
                // DebugUtils.log(`a[${key}]=${a[key]}`, `b[${key}]=${b[key]}`);
            }
            // DebugUtils.log(`as=${as}`, `bs=${bs}`);
            return _this.sortDesc(as, bs);
        });
    };
    /**升序 */
    Algorithm.sortAsc = function (b1, b2) {
        if (b1 < b2)
            return -1;
        else if (b1 > b2)
            return 1;
        else
            return 0;
    };
    /**降序 */
    Algorithm.sortDesc = function (b1, b2) {
        if (b1 > b2)
            return -1;
        else if (b1 < b2)
            return 1;
        else
            return 0;
    };
    //二分查找
    //tab 要检索的表
    // item 要搜索的玩意儿
    // binFunc 用于比较的函数，当纯数字tab时该参数可以为空，默认检索到的位置是最后的插入位置
    Algorithm.binSearch = function (tab, item, binFunc) {
        if (binFunc === void 0) { binFunc = null; }
        if (!tab || tab.length == 0)
            return 0;
        if (!binFunc)
            binFunc = Algorithm.sortAsc;
        var low = 0;
        var high = tab.length - 1;
        while (low <= high) {
            var mid = (high + low) >> 1;
            var val = tab[mid];
            if (binFunc(val, item) <= 0) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return low;
    };
    Algorithm.test = function () {
        var arr = [];
        var MAX = 10;
        for (var i = 0; i < MAX; i++) {
            var r = Math.floor(Math.random() * 100000);
            var index = Algorithm.binSearch(arr, r);
            arr.splice(index, 0, r);
        }
        if (arr.length != MAX)
            DebugUtils.log("test fail!count is " + arr.length + ", except:" + MAX);
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var val = arr_2[_i];
            DebugUtils.log(val);
        }
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                DebugUtils.log("test fail!index:" + i);
                break;
            }
        }
    };
    return Algorithm;
}());
__reflect(Algorithm.prototype, "Algorithm");
var AverageUtils = (function () {
    /**
     * 构造函数
     * @param $maxNum 参与计算的最大值
     */
    function AverageUtils($maxNum) {
        if ($maxNum === void 0) { $maxNum = 10; }
        this.nums = [];
        this.numsLen = 0;
        this.numSum = 0;
        this.maxNum = $maxNum;
    }
    /**
     * 加入一个值
     * @param value
     */
    AverageUtils.prototype.push = function (value) {
        if (this.numsLen > this.maxNum) {
            this.numsLen--;
            this.numSum -= this.nums.shift();
        }
        this.nums.push(value);
        this.numSum += value;
        this.numsLen++;
    };
    /**
     * 获取平均值
     * @returns {number}
     */
    AverageUtils.prototype.getValue = function () {
        return this.numSum / this.numsLen;
    };
    /**
     * 清空
     */
    AverageUtils.prototype.clear = function () {
        this.nums.splice(0);
        this.numsLen = 0;
        this.numSum = 0;
    };
    return AverageUtils;
}());
__reflect(AverageUtils.prototype, "AverageUtils");
function bezierAbs(e, t, tt, time, changeCB) {
    egret.Tween.removeTweens(e);
    var factor = "$factor";
    e[factor] = 0;
    var ex = e.x;
    var ey = e.y;
    var tween = egret.Tween.get(e, {
        onChange: function () {
            var value = e[factor];
            if (value == 0) {
                return;
            }
            e.x = (1 - value) * (1 - value) * ex + 2 * value * (1 - value) * t.x + value * value * tt.x;
            e.y = (1 - value) * (1 - value) * ey + 2 * value * (1 - value) * t.y + value * value * tt.y;
            if (changeCB) {
                changeCB();
            }
        },
        onChangeObj: e
    });
    tween.to({ $factor: 1 }, time);
    return tween;
}
function bezier(e, t, tt, time, changeCB) {
    var ex = e.x;
    var ey = e.y;
    t.x += ex;
    t.y += ey;
    tt.x += ex;
    tt.y += ey;
    return bezierAbs(e, t, tt, time, changeCB);
}
/**获取贝塞尔曲线的p1点 */
function getP1ByP0P2(p0, p2, minDis) {
    var p1 = new egret.Point;
    p1.x = Math.min(p0.x + (p2.x - p0.x) * 3 / 5);
    p1.y = Math.min(p2.y, p0.y - minDis);
    return p1;
}
/**
 * 颜色相关处理工具
 */
var ColorUtil = (function () {
    function ColorUtil() {
    }
    /**
     * 合并颜色值
     */
    ColorUtil.mergeARGB = function ($a, $r, $g, $b) {
        return ($a << 24) | ($r << 16) | ($g << 8) | $b;
    };
    /**
     * 获取单个通道的颜色值
     * @param $argb 颜色值
     * @param $channel 要获取的颜色通道常量
     */
    ColorUtil.getChannel = function ($argb, $channel) {
        switch ($channel) {
            case this.ALPHA:
                return ($argb >> 24) & 0xff;
            case this.RED:
                return ($argb >> 16) & 0xff;
            case this.GREEN:
                return ($argb >> 8) & 0xff;
            case this.BLUE:
                return $argb & 0xff;
        }
        return 0;
    };
    /**
     * 颜色值表示法转换number转String
     * @param $number 需要转换的number值
     * @param $prefix 字符串前缀
     */
    ColorUtil.numberToString = function ($number, $prefix) {
        if ($prefix === void 0) { $prefix = "#"; }
        return $prefix + $number.toString(16);
    };
    ColorUtil.ALPHA = 0xFF000000;
    ColorUtil.RED = 0xdc3819;
    ColorUtil.GREEN = 0x28e528;
    ColorUtil.BLUE = 0x1ec7ff;
    ColorUtil.ORANGE = 0xfe9315;
    ColorUtil.PURPLE = 0xdc3819;
    ColorUtil.WHITE = 0xf6f2ea;
    /**
     * 品质颜色数组
     * 白 绿 蓝 紫 橙 红
     */
    ColorUtil.QUALITY_COLOR = [0xeedac3, 0x17f5b0, 0x27d5ff, 0xf322ed, 0xe0a01e, 0xee1c30];
    ColorUtil.GREEN2 = 0x26B411;
    ColorUtil.RED2 = 0xbd1d1d;
    ColorUtil.ORANGE2 = 0xE0A01E;
    ColorUtil.GREEN3 = 0x32d916;
    ColorUtil.RED3 = 0xee1c30;
    /**灰色滤镜 */
    ColorUtil.GRAY_FILTERS = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        /**格式 */
        _this.format = [];
        /** 起始精确度*/
        _this.from = 0;
        /**结束精确度 */
        _this.to = 0;
        /**是否补齐0 */
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * @param minSecond 毫秒数
     * @param str 目标字符串
     * @param fill 是否需要补齐位数
     */
    DateUtils.fillTimeToStr = function (minSecond, str, fill) {
        if (fill === void 0) { fill = true; }
        var vList = [1, DateUtils.MS_PER_SECOND, DateUtils.MS_PER_MINUTE, DateUtils.MS_PER_HOUR, DateUtils.MS_PER_DAY];
        for (var i = vList.length - 1; i >= 0; i--) {
            var searchStr = "{" + i + "}";
            var index = str.indexOf(searchStr);
            if (index >= 0) {
                var value = minSecond / vList[i] >> 0;
                minSecond -= value * vList[i];
                var replaceStr = value + "";
                //从小时开始需做补位处理
                if (fill && replaceStr.length < 2 && i <= 3) {
                    replaceStr = 0 + replaceStr;
                }
                str = str.replace(searchStr, replaceStr);
            }
        }
        return str;
    };
    /**
     * 获取时间格式化的字符串
     * @second 秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle = function (second, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        if (second < 0) {
            second = 0;
            DebugUtils.log("输入参数有误!时间为负数:" + second);
        }
        if (style.from > style.to) {
            DebugUtils.log("输入参数有误!to参数必须大于等于from参数,请检查style参数的值");
            return "";
        }
        second = second >> 0;
        var result = "";
        for (var i = style.to; i >= style.from; i--) {
            var time = second / this.mul[i]; //总共
            var timeStr = "";
            if (i != style.to)
                time = time % this.mod[i]; //剩余
            if (style.isFormatNum && time < 10)
                timeStr = "0" + (time >> 0).toString(); //补0
            else
                timeStr = (time >> 0).toString();
            //格式 00:00:00 处理
            if (style == this.STYLE_3 && i == style.from) {
                result += timeStr;
            }
            else {
                result += (timeStr + style.format[i]);
            }
        }
        return result;
    };
    /**
     * 获取时间格式化的字符串
     * @ms 毫秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle1 = function (ms, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND, style);
    };
    /**
     * 把MiniDateTime转化为距离1970-01-01的毫秒数
     * @param mdt 从2010年开始算起的秒数
     * @return 从1970年开始算起的毫秒数
     */
    DateUtils.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    /**转成服务器要用的时间***/
    DateUtils.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    /**获取当前时间是指定时间的第几天 */
    DateUtils.getDayIndex = function (startTime, nowTime) {
        var nowDate = new Date();
        nowDate.setTime(nowTime);
        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setSeconds(0);
        nowDate.setMilliseconds(0);
        var startDate = new Date();
        startDate.setTime(startTime);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        var day = (nowDate.getTime() - startDate.getTime()) / (60 * 60 * 1000 * 24) + 1;
        return day;
    };
    /**获取当前时间凌晨时间节点第几天 如：10点创角，凌晨12过后 是第二天*/
    DateUtils.getLingshiDayIndex = function (startTime, nowTime) {
        var serverStartTime = DateUtils.formatServerTime(startTime);
        var RecordFlag = 0x80000000;
        var SecOfDay = 60 * 60 * 24;
        var v = serverStartTime & (~RecordFlag);
        v = v / SecOfDay * SecOfDay;
        var lingshi = (serverStartTime & RecordFlag) | v;
        var sTime = DateUtils.formatMiniDateTime(lingshi);
        var day = this.getDayIndex(sTime, nowTime);
        return day;
    };
    /**
     * 根据秒数格式化字符串
     * @param  {number} second			秒数
     * @param  {number=1} type			时间格式类型（参考DateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
     * @param  {showLength}	showLength	显示长度（一个时间单位为一个长度，且仅在type为DateUtils.TIME_FORMAT_5的情况下有效）
     * @returns string
     */
    DateUtils.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 2; }
        var str = "";
        var ms = second * 1000;
        switch (type) {
            case this.TIME_FORMAT_1:
                str = this.format_1(ms);
                break;
            case this.TIME_FORMAT_2:
                str = this.format_2(ms);
                break;
            case this.TIME_FORMAT_3:
                str = this.format_3(ms);
                break;
            case this.TIME_FORMAT_4:
                str = this.format_4(ms);
                break;
            case this.TIME_FORMAT_5:
                str = this.format_5(ms, showLength);
                break;
            case this.TIME_FORMAT_6:
                str = this.format_6(ms);
                break;
            case this.TIME_FORMAT_7:
                str = this.format_7(ms);
                break;
            case this.TIME_FORMAT_8:
                str = this.format_8(ms);
                break;
            case this.TIME_FORMAT_9:
                str = this.format_9(ms);
                break;
        }
        return str;
    };
    /**
     * 格式1  00:00:00
     * @param  {number} sec 毫秒数
     * @returns string
     */
    DateUtils.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        return result;
    };
    /**
     * 格式2  yyyy-mm-dd h:m:s
     * @param  {number} ms		毫秒数
     * @returns string			返回自1970年1月1号0点开始的对应的时间点
     */
    DateUtils.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    /**
     * 格式3  00:00
     * @param  {number} ms		毫秒数
     * @returns string			分:秒
     */
    DateUtils.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    /**
     * 格式4  xx天前，xx小时前，xx分钟前
     * @param  {number} ms		毫秒
     * @returns string
     */
    DateUtils.format_4 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return Math.floor(ms / this.MS_PER_MINUTE) + "分钟前";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时前";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天前";
        }
    };
    /**
     * 格式5 X天X小时X分X秒
     * @param  {number} ms				毫秒
     * @param  {number=2} showLength	显示长度（一个时间单位为一个长度）
     * @returns string
     */
    DateUtils.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["天", "小时", "分", "秒"];
        var arr = [];
        var d = Math.floor(ms / this.MS_PER_DAY);
        arr.push(d);
        ms -= d * this.MS_PER_DAY;
        var h = Math.floor(ms / this.MS_PER_HOUR);
        arr.push(h);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k]) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    /**
 * 格式6  h:m:s
 * @param  {number} ms		毫秒
 * @returns string			返回自1970年1月1号0点开始的对应的时间点（不包含年月日）
 */
    DateUtils.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    /**
 * 格式7  X天/X小时/<1小时
 * @param  {number} ms		毫秒
 * @returns string
 */
    DateUtils.format_7 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return "<1小时";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天";
        }
    };
    //8:yyyy-mm-dd h:m
    DateUtils.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    /**
     * 格式9  x小时x分钟x秒
     * @param  {number} ms		毫秒
     * @returns string
     */
    DateUtils.format_9 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "小时" + m + "分钟" + s + "秒";
    };
    /**
 * 格式10  x分x秒
 * @param  {number} ms		毫秒
 * @returns string
 */
    DateUtils.format_10 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return m + "分钟" + s + "秒";
    };
    /**
     * 格式化时间数为两位数
     * @param  {number} t 时间数
     * @returns String
     */
    DateUtils.formatTimeNum = function (t) {
        return t >= 10 ? t.toString() : "0" + t;
    };
    /**
     * 将指定日期时间戳转为指定格式字符串
     * @param time 时间戳（毫秒）
     * @param fmt 格式模板（yyyy MM dd hh:mm:ss）
     * @returns {string}
     */
    DateUtils.formatDateTime = function (time, fmt) {
        var date = new Date();
        date.setTime(time);
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    /**时间格式1 00:00:00 */
    DateUtils.TIME_FORMAT_1 = 1;
    /**时间格式2 yyyy-mm-dd h:m:s */
    DateUtils.TIME_FORMAT_2 = 2;
    /**时间格式3 00:00 */
    DateUtils.TIME_FORMAT_3 = 3;
    /**时间格式4 xx天前/xx小时前/xx分钟前 */
    DateUtils.TIME_FORMAT_4 = 4;
    /**时间格式5 x天x小时x分x秒 */
    DateUtils.TIME_FORMAT_5 = 5;
    /**时间格式6 h:m:s */
    DateUtils.TIME_FORMAT_6 = 6;
    /**时间格式7 xx天/xx小时/<1小时 */
    DateUtils.TIME_FORMAT_7 = 7;
    /**时间格式8 yyyy-mm-dd h:m */
    DateUtils.TIME_FORMAT_8 = 8;
    /**时间格式9 x小时x分钟x秒 */
    DateUtils.TIME_FORMAT_9 = 9;
    /**一秒的毫秒数 */
    DateUtils.MS_PER_SECOND = 1000;
    /**一分钟的毫秒数 */
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    /**一小时的毫秒数 */
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    /**一天的毫秒数 */
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600; //一小时的秒数
    DateUtils.SECOND_PER_DAY = 86400; //一天的秒数
    DateUtils.SECOND_PER_MONTH = 2592000; //一个月(30天)的秒数
    DateUtils.SECOND_PER_YEAR = 31104000; //一年(360天)的秒数
    DateUtils.DAYS_PER_WEEK = 7; //一周的天数
    DateUtils.YEAR_PER_YEAR = 1; //每年的年数
    DateUtils.MONTH_PER_YEAR = 12; //每年的月数
    DateUtils.DAYS_PER_MONTH = 30; //每月的天数
    DateUtils.HOURS_PER_DAY = 24; //每天的小时数
    DateUtils.MUNITE_PER_HOUR = 60; //每小时的分钟数
    DateUtils.SECOND_PER_MUNITE = 60; //每分钟的秒数
    DateUtils.SECOND_PER_SECOND = 1; //每秒的秒数字
    /**余数 ,用来计算时间*/
    DateUtils.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
    /**除数 用来计算用来计算时间*/
    DateUtils.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
    /**一周的天数 */
    /**一天的小时数 */
    /** 本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒） */
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    /**
     * 时区偏移（毫秒数）<BR>
     * 目前中国采用东八区，即比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区 */
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    /**精确度 */
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    /** n年n月n日n时n分n秒 */
    DateUtils.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"];
    /** xx:xx:xx */
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    /**x小时x分x秒 */
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    /** x天x小时x分钟x秒 */
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    /** 00:00:00 */
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    /** x分x秒 */
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}());
__reflect(DateUtils.prototype, "DateUtils");
var Debug = (function () {
    function Debug() {
    }
    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    Debug.isOpen = function (flag) {
        this._isOpen = flag;
    };
    Object.defineProperty(Debug, "isDebug", {
        /**
         * 是否是调试模式
         * @returns {boolean}
         */
        get: function () {
            return window['isDebug'] ? window['isDebug'] : false;
        },
        enumerable: true,
        configurable: true
    });
    Debug.log = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (Debug.isDebug) {
            egret.log(msg, param);
        }
    };
    Debug.warn = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (Debug.isDebug) {
            egret.warn(msg, param);
        }
    };
    Debug.error = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        egret.error(msg, param);
    };
    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    Debug.start = function (key) {
        if (!this._isOpen) {
            return;
        }
        this._startTimes[key] = egret.getTimer();
    };
    /**
     * 停止
     *
     */
    Debug.stop = function (key) {
        if (!this._isOpen) {
            return 0;
        }
        if (!this._startTimes[key]) {
            return 0;
        }
        var cha = egret.getTimer() - this._startTimes[key];
        if (cha > this._threshold) {
            Debug.log(key + ": " + cha);
        }
        return cha;
    };
    /**
     * 设置时间间隔阈值
     * @param value
     */
    Debug.setThreshold = function (value) {
        this._threshold = value;
    };
    Debug._startTimes = {};
    Debug._threshold = 3;
    return Debug;
}());
__reflect(Debug.prototype, "Debug");
var DebugUtils = (function () {
    function DebugUtils() {
    }
    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    DebugUtils.isOpen = function (flag) {
        this._isOpen = flag;
    };
    Object.defineProperty(DebugUtils, "isDebug", {
        /**
         * 是否是调试模式
         * @returns {boolean}
         */
        get: function () {
            return window['isDebug'] ? window['isDebug'] : false;
        },
        /**
         * 是否是调试模式
         * @returns {boolean}
         */
        set: function (value) {
            window['isDebug'] = value;
        },
        enumerable: true,
        configurable: true
    });
    DebugUtils.log = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug)
            console.log.apply(console, [msg].concat(param));
    };
    DebugUtils.warn = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug)
            console.warn.apply(console, [msg].concat(param));
    };
    DebugUtils.error = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug)
            console.error.apply(console, [msg].concat(param));
    };
    DebugUtils.info = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug)
            console.info.apply(console, [msg].concat(param));
    };
    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    DebugUtils.start = function (key) {
        if (!this._isOpen) {
            return;
        }
        this._startTimes[key] = egret.getTimer();
    };
    /**
     * 停止
     *
     */
    DebugUtils.stop = function (key) {
        if (!this._isOpen) {
            return 0;
        }
        if (!this._startTimes[key]) {
            return 0;
        }
        var cha = egret.getTimer() - this._startTimes[key];
        if (cha > this._threshold) {
            console.log(key + ": " + cha);
        }
        return cha;
    };
    /**
     * 设置时间间隔阈值
     * @param value
     */
    DebugUtils.setThreshold = function (value) {
        this._threshold = value;
    };
    DebugUtils._startTimes = {};
    DebugUtils._threshold = 3;
    return DebugUtils;
}());
__reflect(DebugUtils.prototype, "DebugUtils");
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    Object.defineProperty(DeviceUtils, "IsHtml5", {
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsNative", {
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsMobile", {
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsPC", {
        /**
         * 是否是在PC上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return !egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsQQBrowser", {
        /**
         * 是否是QQ浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsIEBrowser", {
        /**
         * 是否是IE浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsFirefoxBrowser", {
        /**
         * 是否是Firefox浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsChromeBrowser", {
        /**
         * 是否是Chrome浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsSafariBrowser", {
        /**
         * 是否是Safari浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsOperaBrowser", {
        /**
         * 是否是Opera浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "isLocation", {
        /**
         * 是否内网
         */
        get: function () {
            return location.href.indexOf("192.168.201") >= 0
                || location.href.indexOf("127.0.0.1") >= 0
                || location.href.indexOf("localhost") >= 0
                || location.href.indexOf("cq.api.com") >= 0;
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
var DisplayObject = egret.DisplayObject;
/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
var DisplayUtils = (function () {
    function DisplayUtils() {
    }
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createBitmap = function (resName) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    };
    /**
     * 创建一个ToggleButton
     * @param skinName 皮肤名称
    */
    DisplayUtils.createToggleButton = function (parent, skinName) {
        var result = new eui.ToggleButton();
        result.skinName = skinName;
        parent.addChild(result);
        return result;
    };
    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {eui.Image}
     */
    DisplayUtils.createEuiImage = function (parent, resName, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var result = new eui.Image();
        result.x = x;
        result.y = y;
        result.source = resName;
        parent.addChild(result);
        return result;
    };
    /**
     * 从父级移除child
     * @param child
     */
    DisplayUtils.removeFromParent = function (child) {
        if (!child || child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    /**
     * 创建Label
     * @param 内容
     * @returns {egret.Label}
     */
    DisplayUtils.createEuiLabelText = function (parent, value, x, y, size) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var result = new eui.Label();
        result.x = x;
        result.y = y;
        result.text = value;
        result.size = size;
        result.fontFamily = "黑体";
        parent.addChild(result);
        return result;
    };
    /**
     * 创建Label 富文本
     * @param 内容
     * @returns {egret.Label}
     */
    DisplayUtils.createEuiLabelTextFlow = function (parent, value, x, y, size, fontFamily) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (size === void 0) { size = 22; }
        if (fontFamily === void 0) { fontFamily = "黑体"; }
        var result = new eui.Label();
        result.x = x;
        result.y = y;
        result.textFlow = new egret.HtmlTextParser().parser(value);
        result.size = size;
        result.fontFamily = fontFamily;
        parent.addChild(result);
        return result;
    };
    /**
     * 创建Label
     * @param 内容
     * @x
     * @p
     * @returns {egret.Label}
     */
    DisplayUtils.createEuiLabelXY = function (parent, value, x, y) {
        var result = new eui.Label();
        result.text = value;
        result.x = x;
        result.y = y;
        parent.addChild(result);
        return result;
    };
    /**
     * 震动指定的显示对象
     * @param target 震动的对象
     * @param range 震动幅度 单位像素
     * @param duration 一组震动（四方向）持续的时间
     * @param times 震动的次数 （4方向为一次）
     * @param condition 条件 传入判断的方法 执行返回false则不执行震动
     */
    DisplayUtils.shakeIt = function (target, range, duration, times, condition) {
        if (times === void 0) { times = 1; }
        if (condition === void 0) { condition = function () {
            return true;
        }; }
        if (!target || times < 1 || !condition())
            return;
        var isShaking = DisplayUtils.shakingList[target.hashCode];
        if (isShaking) {
            // DebugUtils.warn("shake twice");
            return;
        }
        DisplayUtils.shakingList[target.hashCode] = true;
        var shakeSet = [
            { anchorOffsetX: 0, anchorOffsetY: -range },
            { anchorOffsetX: -range, anchorOffsetY: 0 },
            { anchorOffsetX: range, anchorOffsetY: 0 },
            { anchorOffsetX: 0, anchorOffsetY: range },
            { anchorOffsetX: 0, anchorOffsetY: 0 },
        ];
        egret.Tween.removeTweens(target);
        var delay = duration / 5;
        egret.Tween.get(target).to(shakeSet[0], delay).to(shakeSet[1], delay).to(shakeSet[2], delay).to(shakeSet[3], delay).to(shakeSet[4], delay).call(function () {
            delete DisplayUtils.shakingList[target.hashCode];
            DisplayUtils.shakeIt(target, range, duration, --times);
        }, this);
    };
    /**
     * 闪动一个对象
     * @params  {any} obj 需要闪动的对象
     * @params  {boolean} isFlash 是否闪动
     * @params  {number} t 闪动间隔
     * @returns void
     */
    DisplayUtils.flashingObj = function (obj, isFlash, t) {
        if (t === void 0) { t = 300; }
        var flash = function () {
            if (isFlash) {
                obj.visible = true;
                var a = obj.alpha == 1 ? 0 : 1;
                egret.Tween.removeTweens(obj);
                egret.Tween.get(obj).to({ alpha: a }, t).call(flash);
            }
            else {
                egret.Tween.removeTweens(obj);
                obj.alpha = 1;
                obj.visible = false;
            }
        };
        flash();
    };
    /**
     * 设置属性名字与值的显示
     * labs: 目标修改的文本列表. 按从左到右顺序依次设置。
     * idValues: 属性id-值 列表
     * styles: { nameStyle, valueStyle: }
     * showName: 显示属性名字
     * focusValue: 将属性值设定为该值
     */
    DisplayUtils.showAttribute = function (labs, idValues, styles, showName, concatChar, focusValue) {
        if (styles === void 0) { styles = {}; }
        if (showName === void 0) { showName = true; }
        if (concatChar === void 0) { concatChar = " : "; }
        if (focusValue === void 0) { focusValue = null; }
        var labCount = labs.length;
        var textFlow = [];
        var name;
        var nameStyle = styles.nameStyle || {};
        var valueStyle = styles.valueStyle || { "textColor": 0xffbe3f };
        var index;
        for (var i = 0; i < idValues.length; i++) {
            index = i % labCount;
            textFlow[index] = textFlow[index] || [];
            if (idValues[i] && (idValues[i].value != null)) {
                if (textFlow[index].length > 0) {
                    textFlow[index].push({ text: "\n" });
                }
                if (showName) {
                    name = Lang.itemComAttrName1[idValues[i].type];
                    textFlow[index].push({ text: "" + name + concatChar, style: nameStyle });
                }
                var value = "" + idValues[i].value;
                if (focusValue != null) {
                    value = focusValue;
                }
                textFlow[index].push({ text: "" + value, style: valueStyle });
            }
        }
        for (var i = 0; i < labCount; i++) {
            labs[i].textFlow = textFlow[i];
        }
    };
    DisplayUtils.destroyDisplayObject = function (target) {
        if (!target) {
            return;
        }
        if (target instanceof BaseView) {
            target.$onClose();
        }
        else if (target instanceof egret.DisplayObjectContainer) {
            for (var i = 0; i < target.numChildren; i++) {
                var obj = target.getChildAt(i);
                if (obj instanceof BaseView) {
                    obj.$onClose();
                }
                else if (obj instanceof egret.DisplayObjectContainer) {
                    arguments.callee(obj);
                }
                else if (obj["$onClose"]) {
                    obj["$onClose"]();
                }
            }
        }
        if (target instanceof DisplayObject) {
            DisplayUtils.removeFromParent(target);
        }
    };
    DisplayUtils.shakingList = {};
    return DisplayUtils;
}());
__reflect(DisplayUtils.prototype, "DisplayUtils");
var ErrorLog = (function () {
    function ErrorLog() {
        //异常抛出
        // window.onerror = this.show;
    }
    ErrorLog.ins = function () {
        this._ins = this._ins || new ErrorLog();
        return this._ins;
    };
    ErrorLog.prototype.show = function (str) {
        // ViewManager.ins().open(ErrorLogWin, str);
    };
    ErrorLog.Assert = function (expr, msg) {
        if (expr)
            return false;
        if (DeviceUtils.isLocation) {
            ErrorLog.ins().show(msg);
        }
        if (ErrorLog.httpLog) {
            // post to http server
        }
        return true;
    };
    ErrorLog.httpLog = true;
    return ErrorLog;
}());
__reflect(ErrorLog.prototype, "ErrorLog");
var Assert = ErrorLog.Assert;
// ErrorLog.ins();
/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI	  出错的文件
 * @param {Long}	lineNumber	 出错代码的行号
 * @param {Long}	columnNumber   出错代码的列号
 * @param {Object}  errorObj	   错误的详细信息，Anything
 */
window.onerror = function () {
    var info = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        info[_i] = arguments[_i];
    }
    //跨域实例
    //<script type="text/javascript" src="//doitbegin.duapp.com/error.js" crossorigin></script>
    var funName = '';
    var callPos = '';
    if (info[4] && info[4].stack) {
        var list = info[4].stack.split("at ");
        funName = list[1].split(" ")[0];
        for (var i = 2; i < list.length; i++) {
            var arr = list[i].split("/");
            callPos += arr[arr.length - 1];
        }
    }
    var str = "\u517C\u5BB9\u95EE\u9898\u65E0\u6CD5\u83B7\u53D6\u503C";
    var resultStr = "\u9519\u8BEF\u4FE1\u606F\uFF1A" + info[0] + "\n" +
        ("\u51FA\u9519\u4F4D\u7F6E\uFF1A" + info[2] + "\u884C" + (info[3] ? info[3] + "列" : str) + "\n") +
        ("\u51FA\u9519\u51FD\u6570\uFF1A" + funName + "\n") +
        ("\u51FD\u6570\u8C03\u7528\uFF1A" + callPos);
    if (resultStr.indexOf(str) >= 0)
        return;
    alert(resultStr);
};
var KeyboardUtils = (function (_super) {
    __extends(KeyboardUtils, _super);
    /**
     * 构造函数
     */
    function KeyboardUtils() {
        var _this = _super.call(this) || this;
        _this.key_ups = new Array();
        _this.key_downs = new Array();
        if (DeviceUtils.IsHtml5) {
            var self_1 = _this;
            document.addEventListener("keyup", function (e) {
                for (var i = 0, len = self_1.key_ups.length; i < len; i++) {
                    var func = self_1.key_ups[i][0];
                    var target = self_1.key_ups[i][1];
                    if (target) {
                        func.call(target, e["keyCode"]);
                    }
                    else {
                        func(e["keyCode"]);
                    }
                }
            });
            document.addEventListener("keydown", function (e) {
                for (var i = 0, len = self_1.key_downs.length; i < len; i++) {
                    var func = self_1.key_downs[i][0];
                    var target = self_1.key_downs[i][1];
                    if (target) {
                        func.call(target, e["keyCode"]);
                    }
                    else {
                        func(e["keyCode"]);
                    }
                }
            });
        }
        return _this;
    }
    KeyboardUtils.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 添加KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    KeyboardUtils.prototype.addKeyUp = function (callback, target) {
        this.key_ups.push([callback, target]);
    };
    /**
     * 添加KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    KeyboardUtils.prototype.addKeyDown = function (callback, target) {
        this.key_downs.push([callback, target]);
    };
    /**
     * 移除KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    KeyboardUtils.prototype.removeKeyUp = function (callback, target) {
        for (var i = 0; i < this.key_ups.length; i++) {
            if (this.key_ups[i][0] == callback && this.key_ups[i][1] == target) {
                this.key_ups.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * 移除KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    KeyboardUtils.prototype.removeKeyDown = function (callback, target) {
        for (var i = 0; i < this.key_downs.length; i++) {
            if (this.key_downs[i][0] == callback && this.key_downs[i][1] == target) {
                this.key_downs.splice(i, 1);
                i--;
            }
        }
    };
    return KeyboardUtils;
}(BaseClass));
__reflect(KeyboardUtils.prototype, "KeyboardUtils");
var KeyCode = (function () {
    function KeyCode() {
    }
    /* 主键盘区的数字 */
    KeyCode.KC_1 = 49;
    KeyCode.KC_2 = 50;
    KeyCode.KC_3 = 51;
    KeyCode.KC_4 = 52;
    KeyCode.KC_5 = 53;
    KeyCode.KC_6 = 54;
    KeyCode.KC_7 = 55;
    KeyCode.KC_8 = 56;
    KeyCode.KC_9 = 57;
    KeyCode.KC_0 = 48;
    /* 字母键 */
    KeyCode.KC_A = 65;
    KeyCode.KC_B = 66;
    KeyCode.KC_C = 67;
    KeyCode.KC_D = 68;
    KeyCode.KC_E = 69;
    KeyCode.KC_F = 70;
    KeyCode.KC_G = 71;
    KeyCode.KC_H = 72;
    KeyCode.KC_I = 73;
    KeyCode.KC_J = 74;
    KeyCode.KC_K = 75;
    KeyCode.KC_L = 76;
    KeyCode.KC_M = 77;
    KeyCode.KC_N = 78;
    KeyCode.KC_O = 79;
    KeyCode.KC_P = 80;
    KeyCode.KC_Q = 81;
    KeyCode.KC_R = 82;
    KeyCode.KC_S = 83;
    KeyCode.KC_T = 84;
    KeyCode.KC_U = 85;
    KeyCode.KC_V = 86;
    KeyCode.KC_W = 87;
    KeyCode.KC_X = 88;
    KeyCode.KC_Y = 89;
    KeyCode.KC_Z = 90;
    /* F功能区 */
    KeyCode.KC_F1 = 112;
    KeyCode.KC_F2 = 113;
    KeyCode.KC_F3 = 114;
    KeyCode.KC_F4 = 115;
    KeyCode.KC_F5 = 116;
    KeyCode.KC_F6 = 117;
    KeyCode.KC_F7 = 118;
    KeyCode.KC_F8 = 119;
    KeyCode.KC_F9 = 120;
    KeyCode.KC_F10 = 121;
    KeyCode.KC_F11 = 122;
    KeyCode.KC_F12 = 123;
    KeyCode.KC_F13 = 124;
    KeyCode.KC_F14 = 125;
    KeyCode.KC_F15 = 126;
    /* 数字小键盘区 */
    KeyCode.KC_NUMPAD_0 = 96;
    KeyCode.KC_NUMPAD_1 = 97;
    KeyCode.KC_NUMPAD_2 = 98;
    KeyCode.KC_NUMPAD_3 = 99;
    KeyCode.KC_NUMPAD_4 = 100;
    KeyCode.KC_NUMPAD_5 = 101;
    KeyCode.KC_NUMPAD_6 = 102;
    KeyCode.KC_NUMPAD_7 = 103;
    KeyCode.KC_NUMPAD_8 = 104;
    KeyCode.KC_NUMPAD_9 = 105;
    KeyCode.KC_NUMPAD_MULTIPLY = 106; //*
    KeyCode.KC_NUMPAD_ADD = 107; //+
    KeyCode.KC_NUMPAD_ENTER = 108; //enter
    KeyCode.KC_NUMPAD_SUBTRACT = 109; //-
    KeyCode.KC_NUMPAD_DECIMAL = 110; //.
    KeyCode.KC_NUMPAD_DIVIDE = 111; ///
    /* 主键盘功能键 */
    KeyCode.KC_BACKSPACE = 8; //backspace 退格键
    KeyCode.KC_TAB = 9; //tab 换行键
    KeyCode.KC_ENTER = 13; //main ENTER 回车键（主键盘区）
    KeyCode.KC_SHIFT = 16; //shift
    KeyCode.KC_CONTROL = 17; //ctrl
    KeyCode.KC_ESCAPE = 27; //esc
    KeyCode.KC_SPACE = 32; //space 空格键
    KeyCode.KC_WINDOWS = 91; //windows
    KeyCode.KC_MENU = 93; //menu
    /* 三个锁定键 */
    KeyCode.KC_CAPS_LOCK = 20; //caps lock
    KeyCode.KC_NUM_LOCK = 144; //num lock
    KeyCode.KC_SCROLL_LOCK = 145; //scroll lock
    /* 功能键 */
    KeyCode.KC_PAUSE = 19; //pause / break
    KeyCode.KC_PAGE_UP = 33; //page up
    KeyCode.KC_PAGE_DOWN = 34; //page down
    KeyCode.KC_END = 35; //end
    KeyCode.KC_HOME = 36; //home
    KeyCode.KC_INSERT = 45; //insert
    KeyCode.KC_DELETE = 46; //delete
    /* 方向键 */
    KeyCode.KC_LEFT = 37; //left arrow
    KeyCode.KC_UP = 38; //up arrow
    KeyCode.KC_RIGHT = 39; //right arrow
    KeyCode.KC_DOWN = 40; //down arrow
    /* 标点符号 */
    KeyCode.KC_SEMICOLON_COLON = 186; //;:
    KeyCode.KC_EQUAL_PLUS = 187; //=+
    KeyCode.KC_MINUS_UNDERLINE = 189; //-_
    KeyCode.KC_SLASH_QUESTIONMARK = 191; // /?
    KeyCode.KC_SPECIALCOMMA_EARTHWORM = 192; //`~
    KeyCode.KC_LEFT_BRACKET_BRACE = 219; //[{
    KeyCode.KC_BACKSLASH_VERTICALBAR = 220; //\|
    KeyCode.KC_RIGHT_BRACKET_BRACE = 221; //]}
    KeyCode.KC_QUOTE = 222; //'"
    KeyCode.KC_COMMA = 188; //,<
    KeyCode.KC_PERIOD = 190; //.>
    return KeyCode;
}());
__reflect(KeyCode.prototype, "KeyCode");
var LocationProperty = (function () {
    function LocationProperty() {
    }
    LocationProperty.init = function () {
        this.urlParam = {};
        var str = window['paraUrl'];
        if (str) {
            var whIndex = str.indexOf("?");
            if (whIndex != -1) {
                var param = str.slice(whIndex + 1).split("&");
                var strArr = void 0;
                for (var i = 0; i < param.length; i++) {
                    strArr = param[i].split("=");
                    this.urlParam[strArr[0]] = strArr[1];
                }
            }
        }
    };
    Object.defineProperty(LocationProperty, "resAdd", {
        get: function () {
            return this.urlParam['hosts'] || "";
        },
        set: function (str) {
            this.urlParam['hosts'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "openID", {
        get: function () {
            return this.urlParam['user'];
        },
        set: function (str) {
            this.urlParam['user'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "srvid", {
        get: function () {
            return this.urlParam['srvid'];
        },
        set: function (v) {
            this.urlParam['srvid'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverIP", {
        get: function () {
            return this.urlParam['srvaddr'];
        },
        set: function (str) {
            this.urlParam['srvaddr'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverPort", {
        get: function () {
            return this.urlParam['srvport'] || 9001;
        },
        set: function (v) {
            this.urlParam['srvport'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "password", {
        get: function () {
            return this.urlParam['spverify'] || "e10adc3949ba59abbe56e057f20f883e";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "openKey", {
        get: function () {
            return this.urlParam['openkey'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverID", {
        //srvid和服后的id
        //serverid和服前的id
        get: function () {
            return this.urlParam['serverid'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "appid", {
        get: function () {
            return this.urlParam['appid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "app_openid", {
        get: function () {
            return this.urlParam['app_openid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isSubscribe", {
        get: function () {
            return this.urlParam['isSubscribe'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "nickName", {
        get: function () {
            var str = this.urlParam['nickName'] || "";
            try {
                return str.length ? decodeURIComponent(str) : str;
            }
            catch (e) {
                return str;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "callUrl", {
        get: function () {
            var str = this.urlParam['callUrl'] || "";
            return str.length ? decodeURIComponent(str) : str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "gifi", {
        get: function () {
            return this.urlParam['gifi'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "roleCount", {
        get: function () {
            return parseInt(this.urlParam['roleCount']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isnew", {
        get: function () {
            return parseInt(this.urlParam['isnew']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "login_ip", {
        get: function () {
            return this.urlParam['login_ip'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "is_attention", {
        get: function () {
            return this.urlParam['is_attention'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isShowShare", {
        get: function () {
            return window['isShowShare'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "v", {
        get: function () {
            return parseInt(this.urlParam['v']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloVip']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloYearVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloYearVip']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "yelloVipLevel", {
        get: function () {
            return parseInt(this.urlParam['yelloVipLevel']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isYelloHighVip", {
        get: function () {
            return parseInt(this.urlParam['isYelloHighVip']);
        },
        enumerable: true,
        configurable: true
    });
    LocationProperty.isCanLogin = function () {
        return this.openID != null &&
            this.password != null &&
            this.srvid != null &&
            this.serverIP != null &&
            this.serverPort != null;
    };
    Object.defineProperty(LocationProperty, "isWaiWang", {
        get: function () {
            //内网登录没有roleCount参数
            return !isNaN(LocationProperty.roleCount);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "isFirstLoad", {
        get: function () {
            return LocationProperty.isWaiWang && !LocationProperty.roleCount;
            //test
            // return !LocationProperty.roleCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置加载进度 & 描述
     */
    LocationProperty.setLoadProgress = function (n, str) {
        window['showLoadProgress'](n, str);
    };
    return LocationProperty;
}());
__reflect(LocationProperty.prototype, "LocationProperty");
var XY = (function () {
    function XY() {
        this.x = 0;
        this.y = 0;
    }
    return XY;
}());
__reflect(XY.prototype, "XY");
/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    MathUtils.getAngle = function (radian) {
        return 180 * radian / Math.PI;
    };
    /**
     * 角度值转换为弧度制
     * @param angle
     */
    MathUtils.getRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    };
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    };
    MathUtils.getDistanceByObject = function (s, t) {
        return this.getDistance(s.x, s.y, t.x, t.y);
    };
    /**获取两个点的距离的平方 */
    MathUtils.getDistanceX2ByObject = function (s, t) {
        var disX = s.x - t.x;
        var disY = s.y - t.y;
        return disX * disX + disY * disY;
    };
    /** 角度移动点 */
    MathUtils.getDirMove = function (angle, distance, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var radian = this.getRadian(angle);
        var p = { x: 0, y: 0 };
        p.x = Math.cos(radian) * distance + offsetX;
        p.y = Math.sin(radian) * distance + offsetY;
        return p;
    };
    /**
     * 获取两个点延长线上某个距离的点
     * @param p1:起始点
     * @param p2:结束点
     */
    MathUtils.getPByDistance = function (p1, p2, disance) {
        var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var p = new egret.Point;
        p.x = p2.x + disance * Math.cos(angle);
        p.y = p2.y + disance * Math.sin(angle);
        return p;
    };
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limitInteger = function ($from, $end) {
        return Math.round(this.limit($from, $end));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    MathUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    /**取整 */
    MathUtils.toInteger = function (value) {
        return value >> 0;
    };
    /**
     * vertx, verty: 顶点X坐标和Y坐标分别组成的数组
     * testx, testy: 需要测试的点的X坐标和Y坐标
     */
    MathUtils.testInRect = function (vertx, verty, testx, testy) {
        var i, j = 0;
        var result = false;
        var count = vertx.length;
        for (i = 0, j = count - 1; i < count; j = i++) {
            if (((verty[i] > testy) != (verty[j] > testy)) &&
                (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
                result = !result;
        }
        return result;
    };
    /**
     * 计算得到矩形范围内的单位
     */
    MathUtils.getInRectList = function (sender, target, range, width, enemys, affectCount) {
        if (affectCount === void 0) { affectCount = Number.MAX_VALUE; }
        var dx = target.x - sender.x;
        var dy = target.y - sender.y;
        var radian = Math.atan2(dy, dx);
        var lx = width * Math.cos(radian);
        var ly = range * Math.sin(radian);
        var cv = Math.cos(radian);
        var sv = Math.sin(radian);
        var sl = range * Math.sin(radian);
        var cl = range * Math.cos(radian);
        var sw = width * Math.sin(radian);
        var cw = width * Math.cos(radian);
        var x3 = target.x + cl;
        var y3 = target.y + sl;
        var xVec = new Array();
        var yVec = new Array();
        xVec[0] = target.x + sw;
        yVec[0] = target.y - cw;
        xVec[1] = target.x - sw;
        yVec[1] = target.y + cw;
        xVec[3] = x3 + sw;
        yVec[3] = y3 - cw;
        xVec[2] = x3 - sw;
        yVec[2] = y3 + cw;
        var list = [];
        list.push(target);
        for (var _i = 0, enemys_1 = enemys; _i < enemys_1.length; _i++) {
            var enemy = enemys_1[_i];
            if (enemy == target) {
                continue;
            }
            if (list.length >= affectCount) {
                break;
            }
            if (this.testInRect(xVec, yVec, enemy.x, enemy.y)) {
                list.push(enemy);
            }
        }
        return list;
    };
    /**
     * 获取圆形区域内的单位
     */
    MathUtils.getInCircleList = function (target, range, enemys, affectCount) {
        if (affectCount === void 0) { affectCount = Number.MAX_VALUE; }
        var list = [];
        for (var _i = 0, enemys_2 = enemys; _i < enemys_2.length; _i++) {
            var enemy = enemys_2[_i];
            if (list.length >= affectCount) {
                break;
            }
            if (this.getDistance(target.x, target.y, enemy.x, enemy.y) <= range) {
                list.push(enemy);
            }
        }
        return list;
    };
    /**
     * 获取最近的目标点
     * @param s
     * @param ts
     * @param count
     */
    MathUtils.getClosest = function (s, ts, count) {
        if (count === void 0) { count = 1; }
        var result = [];
        var _tDis = '_tDis';
        var tsLen = ts.length;
        for (var i = 0; i < tsLen; i++) {
            var tDis = this.getDistanceByObject(s, ts[i]);
            ts[i][_tDis] = tDis;
            result.push(ts[i]);
        }
        result.sort(function (a, b) {
            return Algorithm.sortAsc(a[_tDis], b[_tDis]);
        });
        if (result.length > count)
            result.length = count;
        return result;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/*
 * Configurable letiables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var md5 = (function () {
    function md5() {
    }
    /* base-64 pad character. "=" for strict RFC compliance   */
    /*
     * These are the privates you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    md5.hex_md5 = function (s) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    md5.b64_md5 = function (s) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    md5.any_md5 = function (s, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
    };
    md5.hex_hmac_md5 = function (k, d) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    md5.b64_hmac_md5 = function (k, d) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    md5.any_hmac_md5 = function (k, d, e) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
    };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    md5.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    md5.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    md5.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    md5.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    md5.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    md5.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    md5.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    md5.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    md5.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    md5.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    md5.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    md5.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    md5.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    md5.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    md5.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    md5.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    md5.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    md5.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    md5.hexcase = 0;
    /* hex output format. 0 - lowercase; 1 - uppercase		*/
    md5.b64pad = "";
    return md5;
}());
__reflect(md5.prototype, "md5");
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.init = function (data) {
        var _loop_1 = function (key) {
            var value = data[key];
            var objCls = egret.getDefinitionByName(key);
            window["" + objCls] = objCls;
            if (objCls) {
                var objKey_1 = "_obj" + key;
                this_1[objKey_1] = new objCls();
                var boolKey_1 = "_bool" + key;
                this_1[boolKey_1] = false;
                var newKey_1 = "_" + key + "_";
                Object.defineProperty(this_1, key, {
                    get: function () {
                        var obj = this[newKey_1];
                        if (this[boolKey_1]) {
                            return obj;
                        }
                        var parent = this[objKey_1];
                        for (var i in obj) {
                            obj[i].__proto__ = parent;
                        }
                        this[boolKey_1] = true;
                        return obj;
                    },
                    set: function (val) {
                        this[newKey_1] = val;
                    }
                });
            }
            this_1[key] = value;
        };
        var this_1 = this;
        for (var key in data) {
            _loop_1(key);
        }
    };
    return ObjectUtils;
}());
__reflect(ObjectUtils.prototype, "ObjectUtils");
var PointUtils = (function () {
    function PointUtils() {
    }
    PointUtils.getExtendPoint2 = function (ax, ay, bx, by, distance, extend) {
        if (extend === void 0) { extend = true; }
        var dx = ax - bx;
        var dy = ay - by;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var out = new egret.Point();
        if (extend) {
            out.x = bx + (bx - ax) / dist * distance;
            out.y = by + (by - ay) / dist * distance;
        }
        else {
            if (distance > dist) {
                distance = dist;
            }
            out.x = bx - (bx - ax) / dist * distance;
            out.y = by - (by - ay) / dist * distance;
        }
        return out;
    };
    /**检测指定点是否在指定的多边形内 */
    PointUtils.checkPointInArea = function (area, point) {
        var i, j = 0;
        var result = false;
        for (i = 0, j = area.length - 1; i < area.length; j = i++) {
            if (((area[i].y > point.y) != (area[j].y > point.y)) &&
                (point.x < (area[j].x - area[i].x) * (point.y - area[i].y) / (area[j].y - area[i].y) + area[i].x)) {
                result = !result;
            }
        }
        return result;
    };
    return PointUtils;
}());
__reflect(PointUtils.prototype, "PointUtils");
/**
 * 游戏里使用到的正则
 * @author WynnLam
 *
 */
var RegExpUtil = (function () {
    function RegExpUtil() {
    }
    //换行符\r
    RegExpUtil.LINE_BREAK = /\r+/g;
    //空白字符和“\”号的正则
    RegExpUtil.BLANK_REG = /[\s\\]/g;
    //8位ARGB颜色
    RegExpUtil.ARGB_COLOR = /[a-fA-F0-9]{8}/;
    //html正则
    RegExpUtil.HTML = /<[^>]+>/g;
    //去除空格的正则表达式
    RegExpUtil.DELETE_SPACE = /\s/g; //去除空格字符
    RegExpUtil.DOT_NUMBER = /\.\d+/;
    RegExpUtil.NumericExp = /^\d+$/;
    RegExpUtil.NonNumericExp = /\D/;
    RegExpUtil.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;
    return RegExpUtil;
}());
__reflect(RegExpUtil.prototype, "RegExpUtil");
var ResourceUtils = (function (_super) {
    __extends(ResourceUtils, _super);
    /**
     * 构造函数
     */
    function ResourceUtils() {
        var _this = _super.call(this) || this;
        _this._groupIndex = 0;
        _this._configs = new Array();
        _this._groups = {};
        _this._urlResorce = {};
        RES.setMaxLoadingThread(4);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceLoadProgress, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        return _this;
    }
    ResourceUtils.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    ResourceUtils.prototype.addConfig = function (jsonPath, filePath) {
        this._configs.push([jsonPath, filePath]);
    };
    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    ResourceUtils.prototype.loadConfig = function ($onConfigComplete, $onConfigCompleteTarget) {
        this._onConfigComplete = $onConfigComplete;
        this._onConfigCompleteTarget = $onConfigCompleteTarget;
        this.loadNextConfig();
    };
    /**
     * 加载
     */
    ResourceUtils.prototype.loadNextConfig = function () {
        //加载完成
        if (this._configs.length == 0) {
            this._onConfigComplete.call(this._onConfigCompleteTarget);
            this._onConfigComplete = null;
            this._onConfigCompleteTarget = null;
            return;
        }
        var arr = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    };
    /**
     * 加载完成
     * @param event
     */
    ResourceUtils.prototype.onConfigCompleteHandle = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    };
    /**
     * 加载资源组
     * @param $groupName 资源组名称
     * @param $onResourceLoadComplete 资源加载完成执行函数
     * @param $onResourceLoadProgress 资源加载进度监听函数
     * @param $onResourceLoadTarget 资源加载监听函数所属对象
     */
    ResourceUtils.prototype.loadGroup = function ($groupName, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        this._groups[$groupName] = [$onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget];
        RES.loadGroup($groupName);
    };
    /**
     * 同时加载多个组
     * @param $groupName 自定义的组名称
     * @param $subGroups 所包含的组名称或者key名称数组
     * @param $onResourceLoadComplete 资源加载完成执行函数
     * @param $onResourceLoadProgress 资源加载进度监听函数
     * @param $onResourceLoadTarget 资源加载监听函数所属对象
     */
    ResourceUtils.prototype.loadGroups = function ($groupName, $subGroups, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        RES.createGroup($groupName, $subGroups, true);
        this.loadGroup($groupName, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget);
    };
    /**
     * 静默加载
     * @param $groupName 资源组名称
     * @param $groupName 所包含的组名称或者key名称数组
     */
    ResourceUtils.prototype.pilfererLoadGroup = function ($groupName, $subGroups) {
        if ($subGroups === void 0) { $subGroups = null; }
        //添加前缀，防止与正常加载组名重复
        var useGroupName = "pilferer_" + $groupName;
        if (!$subGroups) {
            $subGroups = [$groupName];
        }
        RES.createGroup(useGroupName, $subGroups, true);
        RES.loadGroup(useGroupName, -1);
    };
    /**
     * 资源组加载完成
     */
    ResourceUtils.prototype.onResourceLoadComplete = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadComplete = this._groups[groupName][0];
            var loadCompleteTarget = this._groups[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }
            this._groups[groupName] = null;
            delete this._groups[groupName];
        }
    };
    /**
     * 资源组加载进度
     */
    ResourceUtils.prototype.onResourceLoadProgress = function (event) {
        var groupName = event.groupName;
        if (this._groups[groupName]) {
            var loadProgress = this._groups[groupName][1];
            var loadProgressTarget = this._groups[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
            }
        }
    };
    /**
     * 资源组加载失败
     * @param event
     */
    ResourceUtils.prototype.onResourceLoadError = function (event) {
        Debug.log(event.groupName + "资源组有资源加载失败");
        this.onResourceLoadComplete(event);
    };
    /**
     * 混合加载资源组
     * @param $resources 资源数组
     * @param $groups 资源组数组
     * @param $onResourceLoadComplete 资源加载完成执行函数
     * @param $onResourceLoadProgress 资源加载进度监听函数
     * @param $onResourceLoadTarget 资源加载监听函数所属对象
     */
    ResourceUtils.prototype.loadResource = function ($resources, $groups, $onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget) {
        if ($resources === void 0) { $resources = []; }
        if ($groups === void 0) { $groups = []; }
        if ($onResourceLoadComplete === void 0) { $onResourceLoadComplete = null; }
        if ($onResourceLoadProgress === void 0) { $onResourceLoadProgress = null; }
        if ($onResourceLoadTarget === void 0) { $onResourceLoadTarget = null; }
        var needLoadArr = $resources.concat($groups);
        var groupName = "loadGroup" + this._groupIndex++;
        RES.createGroup(groupName, needLoadArr, true);
        this._groups[groupName] = [$onResourceLoadComplete, $onResourceLoadProgress, $onResourceLoadTarget];
        RES.loadGroup(groupName);
    };
    /**
     * 动态加载资源
     * @param url
     */
    ResourceUtils.prototype.loadUrlResource = function (url, type, compFun, thisObj) {
        var _this = this;
        if (this._urlResorce[url] == null) {
            this._urlResorce[url] = {
                "data": null,
                "compFun": compFun,
                "thisObj": thisObj
            };
            RES.getResByUrl(url, function (data) {
                _this._urlResorce[url]["data"] = data;
                if (compFun != null)
                    compFun.apply(_this._urlResorce[url]["thisObj"]);
            }, this, type);
        }
        else if (compFun != null)
            compFun.apply(thisObj);
    };
    ResourceUtils.prototype.getUrlResource = function (url) {
        if (this._urlResorce[url] == null) {
            DebugUtils.log("资源未加载");
            return null;
        }
        return this._urlResorce[url]["data"];
    };
    return ResourceUtils;
}(BaseClass));
__reflect(ResourceUtils.prototype, "ResourceUtils");
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    /**
     * 构造函数
     */
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (StageUtils._uiStage == null) {
            StageUtils._uiStage = new eui.UILayer();
            StageUtils._uiStage.touchEnabled = false;
            StageUtils._uiStage.percentHeight = 100;
            StageUtils._uiStage.percentWidth = 100;
            _this.getStage().addChild(StageUtils._uiStage);
        }
        return _this;
    }
    StageUtils.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 获取游戏的高度
     * @returns {number}
     */
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    /**
     * 获取游戏宽度
     * @returns {number}
     */
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    /**
     * 设置帧频
     * @param value
     */
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取唯一UIStage
     * @returns {eui.UILayer}
     */
    StageUtils.prototype.getUIStage = function () {
        return StageUtils._uiStage;
    };
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isHtmlText = function (str) {
        return this.HTML.test(str);
    };
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    StringUtils.isChinese = function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    /**
     * 获取字符串的字节长度
     * 一个中文算2两个字节
     * @param str
     * @return
     */
    StringUtils.strByteLen = function (str) {
        var byteLen = 0;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    };
    /**
     * 补齐字符串
     * 因为这里使用的是字节长度（一个中文算2个字节）
     * 所以指定的长度是指字节长度，用来填补的字符按一个字节算
     * 如果填补的字符使用中文那么会导致结果不正确，但这里没有对填补字符做检测
     * @param str 源字符串
     * @param length 指定的字节长度
     * @param char 填补的字符
     * @param ignoreHtml 是否忽略HTML代码，默认为true
     * @return
     *
     */
    StringUtils.complementByChar = function (str, length, char, ignoreHtml) {
        if (char === void 0) { char = " "; }
        if (ignoreHtml === void 0) { ignoreHtml = true; }
        var byteLen = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
        return str + this.repeatStr(char, length - byteLen);
    };
    /**
     * 重复指定字符串count次
     * @param str
     * @param count
     * @return
     *
     */
    StringUtils.repeatStr = function (str, count) {
        var s = "";
        for (var i = 0; i < count; i++) {
            s += str;
        }
        return s;
    };
    /**
     * 为文字添加颜色
     * */
    StringUtils.addColor = function (content, color) {
        var colorStr;
        if (typeof (color) == "string")
            colorStr = String(color);
        else if (typeof (color) == "number")
            colorStr = Number(color).toString(10);
        return "<font color=\"" + colorStr + "\">" + content + "</font>";
    };
    /**将htmltext转为egret.ITextElement[]*/
    StringUtils.parseHtmlText = function (htmlText) {
        return this.htmlParser.parse(htmlText);
    };
    /**
     * 这个函数还没改完,用来替代addColor
     */
    StringUtils.addColor1 = function (content, color) {
        if (color === void 0) { color = undefined; }
        if (color)
            return this.htmlParser.parser((StringUtils.addColor(content.toString(), color)));
        else
            return this.htmlParser.parser(content.toString());
    };
    /**加粗 */
    StringUtils.addBold = function (content) {
        return "<b>" + content + "</b>";
    };
    /**加下划线 */
    StringUtils.addUnderLine = function (content) {
        return "<u>" + content + "</u>";
    };
    /**大于1w  */
    StringUtils.formatNum = function (num, d) {
        if (d === void 0) { d = 0; }
        if (num < 10000) {
            return num + "";
        }
        var base = 10000;
        var str = "万";
        /**大于1亿，以亿为单位 */
        if (num >= 100000000) {
            base = 100000000;
            str = "亿";
            num = num / 100000000 * Math.pow(10, d);
            num = Math.floor(num);
            num = num / Math.pow(10, d);
            return num + "";
        }
        num = num / base * Math.pow(10, d);
        num = Math.floor(num);
        num = num / Math.pow(10, d);
        return num + str;
    };
    /**
     * 使用传入的各个参数替换指定的字符串内的“${n}”标记。
     * @param str
     * @param rest
     * @return
     *
     */
    StringUtils.substitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return this.replace(str, rest, "{", "}");
    };
    /**
     * 将字符串模板的指定部分替换为数组内容（替换部分：prefix+第N个+suffix）
     * @param sample 字符串模板
     * @param arr 对应替换数组
     * @param prefix 替换部分的前缀
     * @param suffix 替换部分的后缀
     * @return
     *
     */
    StringUtils.replace = function (sample, arr, prefix, suffix) {
        if (prefix === void 0) { prefix = "$"; }
        if (suffix === void 0) { suffix = "$"; }
        if (arr != null && sample) {
            var count = arr.length;
            for (var n = 0; n < count; ++n) {
                var temp = null;
                while (temp != sample) {
                    temp = sample;
                    sample = temp.replace("$" + prefix + n + suffix, arr[n]);
                }
            }
        }
        return sample;
    };
    StringUtils.HTML = /<[^>]+>/g;
    StringUtils.htmlParser = new egret.HtmlTextParser();
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    /**
     * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体";
     * @param sourceText
     * @returns {Array}
     */
    TextFlowMaker.generateTextFlow = function (sourceText) {
        var textArr = sourceText.split("|");
        var str = "";
        for (var i = 0, len = textArr.length; i < len; i++) {
            str += this.getSingleTextFlow1(textArr[i]);
        }
        return new egret.HtmlTextParser().parser(str);
    };
    TextFlowMaker.generateTextFlow1 = function (sourceText) {
        var textArr = sourceText.split("|");
        var result = [];
        for (var i = 0, len = textArr.length; i < len; i++) {
            result.push(this.getSingleTextFlow(textArr[i]));
        }
        return result;
    };
    TextFlowMaker.getSingleTextFlow1 = function (text) {
        var str = "<font";
        var textArr = text.split("&");
        var tempArr;
        var t;
        for (var i = 0, len = textArr.length; i < len; i++) {
            tempArr = textArr[i].split(":");
            if (tempArr[0] == this.PROP_TEXT) {
                t = tempArr[1];
            }
            else if (tempArr[0] == this.STYLE_SIZE) {
                str += " size=\"" + parseInt(tempArr[1]) + "\"";
            }
            else if (tempArr[0] == this.STYLE_COLOR) {
                str += " color=\"" + parseInt(tempArr[1]) + "\"";
            }
            else {
                t = tempArr[0];
            }
        }
        str += ">" + t + "</font>";
        return str;
    };
    TextFlowMaker.getSingleTextFlow = function (text) {
        var textArr = text.split("&");
        var tempArr;
        var textFlow = { "style": {} };
        for (var i = 0, len = textArr.length; i < len; i++) {
            tempArr = textArr[i].split(":");
            if (tempArr[0] == this.PROP_TEXT) {
                textFlow.text = tempArr[1];
            }
            else if (tempArr[0] == this.STYLE_SIZE) {
                textFlow.style.size = parseInt(tempArr[1]);
            }
            else if (tempArr[0] == this.STYLE_COLOR) {
                textFlow.style.textColor = parseInt(tempArr[1]);
            }
            else {
                textFlow.text = tempArr[0];
            }
        }
        return textFlow;
    };
    TextFlowMaker.STYLE_COLOR = "C";
    TextFlowMaker.STYLE_SIZE = "S";
    TextFlowMaker.PROP_TEXT = "T";
    return TextFlowMaker;
}());
__reflect(TextFlowMaker.prototype, "TextFlowMaker");
var uint64 = (function () {
    function uint64(v) {
        this._lowUint = 0;
        this._highUint = 0;
        this.value = v;
    }
    uint64.prototype.isEqual = function (target) {
        if (!target)
            return false;
        return this._lowUint == target._lowUint && this._highUint == target._highUint;
    };
    uint64.prototype.isGreaterThan = function (target) {
        if (target instanceof uint64)
            return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint > target._lowUint);
        else {
            var u64 = new uint64();
            if (typeof target == 'string') {
                u64.value = target;
                return this.isGreaterThanOrEqual(u64);
            }
            if (typeof target == 'number') {
                u64.value = target.toString();
                return this.isGreaterThanOrEqual(u64);
            }
        }
    };
    uint64.prototype.isGreaterThanOrEqual = function (target) {
        if (target instanceof uint64)
            return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint >= target._lowUint);
        else {
            var u64 = new uint64();
            if (typeof target == 'string') {
                u64.value = target;
                return this.isGreaterThanOrEqual(u64);
            }
            if (typeof target == 'number') {
                u64.value = target.toString();
                return this.isGreaterThanOrEqual(u64);
            }
        }
    };
    Object.defineProperty(uint64.prototype, "isZero", {
        get: function () {
            return this._lowUint == 0 && this._highUint == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uint64.prototype, "isGreaterThanZero", {
        /** 是否大于0 */
        get: function () {
            return this._lowUint > 0 || this._highUint > 0;
        },
        enumerable: true,
        configurable: true
    });
    uint64.prototype.writeByte = function (b) {
        b.writeUnsignedInt(this._lowUint);
        b.writeUnsignedInt(this._highUint);
    };
    uint64.prototype.setValue = function (lowerUint, higherUint) {
        if (lowerUint === void 0) { lowerUint = 0; }
        if (higherUint === void 0) { higherUint = 0; }
        this._lowUint = lowerUint;
        this._highUint = higherUint;
    };
    Object.defineProperty(uint64.prototype, "value", {
        set: function (v) {
            if (v instanceof egret.ByteArray) {
                this._lowUint = v.readUnsignedInt();
                this._highUint = v.readUnsignedInt();
            }
            else if (typeof v == 'string') {
                uint64.stringToUint64(v, 10, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uint64.prototype, "valueByString", {
        set: function (value) {
            var num = 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 左移运算
     * @param num
     * @return
     */
    uint64.prototype.leftMove = function (num, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var bitMask = uint64.LeftMoveMask[num];
        var lowUintMaskNum = bitMask & this._lowUint;
        lowUintMaskNum = lowUintMaskNum >>> (32 - num);
        result._lowUint = this._lowUint << num;
        result._highUint = this._highUint << num;
        result._highUint = result._highUint | lowUintMaskNum;
    };
    /**
     *加法
     * @param value
     * @param result
     */
    uint64.prototype.add = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint + value._lowUint;
        result._highUint = this._highUint + value._highUint;
        if (num >= uint64.MaxLowUint) {
            result._highUint++;
            result._lowUint = num - uint64.MaxLowUint;
        }
        else {
            result._lowUint = num;
        }
    };
    /** 减法 */
    uint64.prototype.subtraction = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint - value._lowUint;
        result._highUint = this._highUint - value._highUint;
        if (num < 0) {
            result._highUint--;
            result._lowUint = num + uint64.MaxLowUint;
        }
        else {
            result._lowUint = num;
        }
    };
    /**
     * @param value
     * 注意value值不可过大，否则会计算错误
     */
    uint64.prototype.scale = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint * value;
        result._highUint = this._highUint * value;
        result._highUint += Math.floor(Math.abs(num / uint64.MaxLowUint));
        result._lowUint = num % uint64.MaxLowUint;
    };
    uint64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        var result = "";
        var lowUint = this._lowUint;
        var highUint = this._highUint;
        var highRemain;
        var lowRemain;
        var tempNum;
        while (highUint != 0 || lowUint != 0) {
            highRemain = (highUint % radix);
            tempNum = highRemain * uint64.MaxLowUint + lowUint;
            lowRemain = tempNum % radix;
            result = lowRemain + result;
            highUint = (highUint - highRemain) / radix;
            lowUint = (tempNum - lowRemain) / radix;
        }
        return result.length ? result : "0";
    };
    /**
     *根据字符串导出成64位数据结构
     * @param value
     * @return
     */
    uint64.stringToUint64 = function (value, radix, result) {
        if (radix === void 0) { radix = 10; }
        if (result === void 0) { result = null; }
        result = result || new uint64;
        var lowUint = 0;
        var highUint = 0;
        var tempNum;
        var len = value.length;
        var char;
        for (var i = 0; i < len; i++) {
            char = parseInt(value.charAt(i));
            tempNum = lowUint * radix + char;
            highUint = highUint * radix + Math.floor(tempNum / uint64.MaxLowUint);
            lowUint = tempNum % uint64.MaxLowUint;
        }
        result.setValue(lowUint, highUint);
        return result;
    };
    uint64.LeftMoveMask = [0,
        0x80000000, 0x40000000, 0x20000000, 0x10000000,
        0x08000000, 0x04000000, 0x02000000, 0x01000000,
        0x00800000, 0x00400000, 0x00200000, 0x00100000,
        0x00080000, 0x00040000, 0x00020000, 0x00010000,
        0x00008000, 0x00004000, 0x00002000, 0x00001000,
        0x00000800, 0x00000400, 0x00000200, 0x00000100,
        0x00000080, 0x00000040, 0x00000020, 0x00000010,
        0x00000008, 0x00000004, 0x00000002, 0x00000001,
    ];
    uint64.MaxLowUint = 0xffffffff + 1;
    return uint64;
}());
__reflect(uint64.prototype, "uint64");
var WatcherUtils = (function () {
    function WatcherUtils() {
    }
    WatcherUtils.removeFromArrayCollection = function (dataPro) {
        if (dataPro && dataPro.source && dataPro.source.length) {
            for (var _i = 0, _a = dataPro.source; _i < _a.length; _i++) {
                var source = _a[_i];
                WatcherUtils.removeFromObject(source);
            }
        }
    };
    WatcherUtils.removeFromObject = function (obj) {
        if (obj instanceof egret.EventDispatcher) {
            var event_1 = obj.$getEventMap();
            var list = event_1[eui.PropertyEvent.PROPERTY_CHANGE];
            if (list) {
                for (var index = list.length - 1; index >= 0; index--) {
                    var obj_1 = list[index];
                    if (obj_1.thisObject instanceof eui.Watcher) {
                        obj_1.thisObject.unwatch();
                        list.splice(index, 1);
                    }
                }
            }
        }
        else {
            var listeners = obj['__listeners__'];
            if (listeners && listeners.length) {
                for (var i = 0; i < listeners.length; i += 2) {
                    // let listener:Function = listeners[i];
                    var target = listeners[i + 1];
                    if (target instanceof eui.Watcher) {
                        target.unwatch();
                        // listeners.splice(i,2);  //在 eui.Watcher 中的 unwatch 已经移除
                        i -= 2;
                    }
                }
            }
        }
    };
    return WatcherUtils;
}());
__reflect(WatcherUtils.prototype, "WatcherUtils");
var BaseConfirm = (function (_super) {
    __extends(BaseConfirm, _super);
    function BaseConfirm() {
        var _this = _super.call(this) || this;
        _this.skinName = "confirm_skin";
        return _this;
    }
    BaseConfirm.show = function (msg, btnLabels, callBackIds, callBack, thisObj) {
    };
    return BaseConfirm;
}(BaseView));
__reflect(BaseConfirm.prototype, "BaseConfirm");
/**
 * cacheAsBitmap的替代方案，解决QQ浏览器在1G内存的机器上最多能使用20个Canvas的限制
 */
var RenderTextureManager = (function (_super) {
    __extends(RenderTextureManager, _super);
    /**
     * 构造函数
     */
    function RenderTextureManager() {
        var _this = _super.call(this) || this;
        _this._pool = [];
        _this._useNum = 0;
        if (_this.isLowerQQBrowser()) {
            _this._maxNum = 18;
        }
        else {
            _this._maxNum = -1;
        }
        return _this;
    }
    /**
     * 是否是低端手机的QQ浏览器
     * @returns {boolean}
     */
    RenderTextureManager.prototype.isLowerQQBrowser = function () {
        if (DeviceUtils.IsQQBrowser) {
            //判定机型，因为拿不到内存信息，现在只能根据机型进行判定
            var arr = [
                "2013022",
                "Lenovo A630t",
                "SM-G3818",
                "vivo X3t",
                "GT-I9100"
            ];
            var lower = false;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (navigator.userAgent.indexOf(arr[i]) != -1) {
                    lower = true;
                    break;
                }
            }
            return lower;
        }
        return false;
    };
    /**
     * 获取一个egret.RenderTexture
     * @returns {egret.RenderTexture}
     */
    RenderTextureManager.prototype.pop = function () {
        var result = this._pool.pop();
        if (!result) {
            if (this._maxNum == -1 || this._useNum < this._maxNum) {
                result = new egret.RenderTexture();
                this._useNum++;
            }
        }
        return result;
    };
    /**
     * 回收一个egret.RenderTexture
     * @param texture
     */
    RenderTextureManager.prototype.push = function (texture) {
        var exists = false;
        for (var i = 0, len = this._pool.length; i < len; i++) {
            if (this._pool[i] == texture) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            this._pool.push(texture);
        }
    };
    return RenderTextureManager;
}(BaseClass));
__reflect(RenderTextureManager.prototype, "RenderTextureManager");
var BaseItemRender = (function (_super) {
    __extends(BaseItemRender, _super);
    function BaseItemRender() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._selected = false;
        _this.itemIndex = -1;
        _this.touchCaptured = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        return _this;
    }
    /**
     * 淡入效果
     * showIndex 淡入个数
     */
    BaseItemRender.prototype.fadeIn = function (showIndex) {
        if (showIndex === void 0) { showIndex = -1; }
        var childIndex = this.parent.getChildIndex(this);
        //超过的不播放淡入效果
        if (showIndex != -1 && showIndex < childIndex) {
            return;
        }
        for (var i = 0; i < this.numChildren; i++) {
            var child = this.getChildAt(i);
            if (!child.visible)
                continue;
            var tx = child.x;
            child.x = tx - this.width;
            var tw = egret.Tween.get(child);
            tw.wait(200 * this.parent.getChildIndex(this)).to({ x: tx }, 200);
        }
    };
    BaseItemRender.prototype.onTouchCancle = function (event) {
        this.touchCaptured = false;
        var stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.invalidateState();
        this.invalidateDisplayList();
    };
    BaseItemRender.prototype.onTouchBegin = function (event) {
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchCaptured = true;
        this.invalidateState();
        event.updateAfterEvent();
    };
    BaseItemRender.prototype.onStageTouchEnd = function (event) {
        var stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchCaptured = false;
        this.invalidateState();
    };
    BaseItemRender.prototype.getCurrentState = function () {
        var state = "up";
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
    Object.defineProperty(BaseItemRender.prototype, "data", {
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
    BaseItemRender.prototype.dataChanged = function () {
    };
    Object.defineProperty(BaseItemRender.prototype, "selected", {
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
    return BaseItemRender;
}(BaseView));
__reflect(BaseItemRender.prototype, "BaseItemRender", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
eui.registerBindable(BaseItemRender.prototype, "data");
var BaseSpriteView = (function (_super) {
    __extends(BaseSpriteView, _super);
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    function BaseSpriteView($parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._myParent = $parent;
        _this._isInit = false;
        StageUtils.ins().getStage().addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        return _this;
    }
    /**
     * 设置初始加载资源
     * @param resources
     */
    BaseSpriteView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    Object.defineProperty(BaseSpriteView.prototype, "myParent", {
        /**
         * 获取我的父级
         * @returns {egret.DisplayObjectContainer}
         */
        get: function () {
            return this._myParent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    BaseSpriteView.prototype.isInit = function () {
        return this._isInit;
    };
    /**
     * 面板是否显示
     * @return
     *
     */
    BaseSpriteView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    /**
     * 添加到父级
     */
    BaseSpriteView.prototype.addToParent = function () {
        this._myParent.addChild(this);
    };
    /**
     * 从父级移除
     */
    BaseSpriteView.prototype.removeFromParent = function () {
        DisplayUtils.removeFromParent(this);
    };
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    BaseSpriteView.prototype.initUI = function () {
        this._isInit = true;
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    BaseSpriteView.prototype.initData = function () {
    };
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    BaseSpriteView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    BaseSpriteView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 销毁
     */
    BaseSpriteView.prototype.destroy = function () {
        this._myParent = null;
        this._resources = null;
    };
    /**
     * 屏幕尺寸变化时调用
     */
    BaseSpriteView.prototype.onResize = function () {
    };
    /**
     * 加载面板所需资源
     * @param loadComplete
     * @param initComplete
     */
    BaseSpriteView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            ResourceUtils.ins().loadResource(this._resources, [], function () {
                loadComplete();
                initComplete();
            }, null, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    /**
     * 设置是否隐藏
     * @param value
     */
    BaseSpriteView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseSpriteView.prototype.openCheck = function () {
        return true;
    };
    return BaseSpriteView;
}(egret.DisplayObjectContainer));
__reflect(BaseSpriteView.prototype, "BaseSpriteView", ["IBaseView"]);
var ResVersionManager = (function (_super) {
    __extends(ResVersionManager, _super);
    /**
     * 构造函数
     */
    function ResVersionManager() {
        var _this = _super.call(this) || this;
        _this.res_loadByVersion();
        _this.resVersionData = window["verData"];
        return _this;
    }
    ResVersionManager.ins = function () {
        return _super.ins.call(this);
    };
    ResVersionManager.prototype.has = function (url) {
        return this.resVersionData.hasOwnProperty(url);
    };
    ResVersionManager.prototype.getDir = function (url) {
        return this.resVersionData[url] & 0xff;
    };
    ResVersionManager.prototype.getVer = function (url) {
        return this.resVersionData[url] >> 8;
    };
    ResVersionManager.prototype.hasVer = function () {
        return !isNaN(LocationProperty.v);
    };
    /**
     * Res加载使用版本号的形式
     */
    ResVersionManager.prototype.res_loadByVersion = function () {
        // RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
        // 	let manager = ResVersionManager.ins();
        // 	if (manager.hasVer()) {
        // 		if (manager.has(url)) {
        // 			let dir: number = manager.getDir(url);
        // 			let v: number = manager.getVer(url);
        // 			url = `${LocationProperty.resAdd}${dir}/${url}?v=${v}`;
        // 		}
        // 		else
        // 			url = `${LocationProperty.resAdd}0/${url}`;
        // 	}
        // 	else
        // 		url = `${LocationProperty.resAdd}${url}`;
        // 	return url;
        // }
    };
    /**
     * 加载资源版本号配置文件
     * @param url 配置文件路径
     * @param complateFunc 加载完成执行函数
     * @param complateFuncTarget 加载完成执行函数所属对象
     */
    ResVersionManager.prototype.loadConfig = function (complateFunc, complateFuncTarget) {
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        if (this.resVersionData) {
            this.complateFunc.call(this.complateFuncTarget);
            return;
        }
        if (this.hasVer()) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        // let request: egret.HttpRequest = evt.currentTarget;
                        // let ab: ArrayBuffer = request.response;
                        // let verData: any = {};
                        // if (ab.byteLength) {
                        // 	let plain = new Uint8Array(ab);
                        // 	let inflate = new Zlib.Inflate(plain);
                        // 	let deplain = inflate.decompress();
                        // 	let b = new egret.ByteArray(deplain.buffer);
                        // 	let len = deplain.length;
                        // 	while (b.position < len) {
                        // 		verData[b.readUTF()] = b.readUnsignedInt();
                        // 	}
                        // }
                        // this.resVersionData = verData;
                        // this.complateFunc.call(this.complateFuncTarget);
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        DebugUtils.log("respHandler io error");
                        break;
                }
            };
            request.once(egret.Event.COMPLETE, respHandler, this);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
            request.open("" + LocationProperty.resAdd + LocationProperty.v + "/" + LocationProperty.v + ".ver", egret.HttpMethod.GET);
            request.send();
            return;
        }
        this.complateFunc.call(this.complateFuncTarget);
    };
    return ResVersionManager;
}(BaseClass));
__reflect(ResVersionManager.prototype, "ResVersionManager");
/**
 * 全局配置
 */
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    GlobalConfig.ins = function () {
        if (this._instance == null) {
            this._instance = new GlobalConfig();
        }
        return this._instance;
    };
    GlobalConfig.init = function () {
        // if (!this.configZip)
        // 	this.configZip = new JSZip(RES.getRes("config"));
        if (!this.config) {
            this.config = RES.getRes("config_json");
        }
    };
    GlobalConfig.prototype.getConfig = function (propName) {
        // if (this[propName] == null) {
        // 	let ziObj = GlobalConfig.configZip.file(`data/${propName}.json`);
        // 	if (ziObj) {
        // 		this[propName] = JSON.parse(ziObj.asText());
        // 	} else {
        // 		Debug.error(`!!!配置解析失败：[${propName}]`)
        // 	}
        // }
        // return this[propName];
        return GlobalConfig.config;
    };
    GlobalConfig.EquipStageConfig = function () {
        return GlobalConfig.ins().getConfig("equipstageconfig")['EquipStageConfig'];
    };
    GlobalConfig.MonsterConfig = function (id) {
        return GlobalConfig.ins().getConfig("monster")["Monster"][id];
    };
    GlobalConfig.EquipUpgradeConfig = function () {
        return GlobalConfig.ins().getConfig("equipupgradeconfig")["EquipUpgradeConfig"];
    };
    GlobalConfig.MoJieMiJingBossConfList = function () {
        return GlobalConfig.ins().getConfig("mojiemijingbossconf")["MoJieMiJingBossConf"];
    };
    /**
     * npc
     */
    GlobalConfig.getNpcConf = function (id) {
        return GlobalConfig.ins().getConfig("npc")["NpcConf"][id];
    };
    /**获取指定场景npc */
    GlobalConfig.getSceneNpcList = function (scene) {
        var list = [];
        var confList = GlobalConfig.ins().getConfig("npc")["NpcConf"];
        for (var id in confList) {
            var conf = confList[id];
            if (conf.scene == scene) {
                list.push(conf);
            }
        }
        return list;
    };
    return GlobalConfig;
}());
__reflect(GlobalConfig.prototype, "GlobalConfig");
var MonsterConf = (function () {
    function MonsterConf() {
    }
    return MonsterConf;
}());
__reflect(MonsterConf.prototype, "MonsterConf");
/**
 * 游戏主场景
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    /**
     * 进入场景调用
     */
    MainScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayerAt(LayerManager.Game_Bg, 1);
        this.addLayerAt(LayerManager.Game_Main, 2);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Main2);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Tips);
        GameApp.postLoginInit();
        SoundManager.ins().stopBg();
        new GameApp();
    };
    /**
     * 退出Scene调用
     */
    MainScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return MainScene;
}(BaseScene));
__reflect(MainScene.prototype, "MainScene");
var Jump = (function (_super) {
    __extends(Jump, _super);
    function Jump() {
        var _this = _super.call(this) || this;
        _this.canPass = [];
        _this.noPass = [];
        _this.canPassStone = [];
        _this.notPassStone = [];
        return _this;
    }
    Jump.ins = function () {
        return _super.ins.call(this);
    };
    Jump.prototype.initGame = function () {
        //打开主界面
        ViewManager.ins().open(JumpWin);
    };
    Jump.prototype.reset = function () {
        this.canPass = [];
        this.noPass = [];
        this.canPassStone = [];
        this.notPassStone = [];
    };
    //添加障碍物状态
    Jump.prototype.obstacles = function () {
        var i = Math.round(Math.random() * 10);
        var state = 0;
        if (i <= 5) {
            state = 0;
        }
        else if (i > 5 && i <= 7) {
            state = 1;
        }
        else if (i > 7 && i <= 9) {
            state = 2;
        }
        else if (i > 9 && i <= 10) {
            state = 3;
        }
        this.noPass.push(state);
    };
    Jump.prototype.createMap = function (map) {
        this.mapGrp = map;
        for (var i = 0; i < Jump.stoneNum; i++) {
            this.addStoneAndDis();
        }
    };
    Jump.prototype.mapMove = function () {
        this.removeStoneAndDis();
        var stoneW = this.canPassStone[0].width;
        var stoneH = this.canPassStone[0].height;
        var dis = this.canPass[0] ? -1 : 1;
        var endX = this.mapGrp.x + dis * (stoneW / 2);
        var endY = this.mapGrp.y + (stoneH - 26);
        var t = egret.Tween.get(this.mapGrp);
        var self = this;
        t.to({ x: endX, y: endY }, 200).call(function () {
            self.addStoneAndDis();
        });
    };
    Jump.prototype.addStoneAndDis = function () {
        var passStone = ObjectPool.pop('Stone', 0);
        this.mapGrp.addChildAt(passStone, 0);
        if (this.canPassStone[0] == null) {
            var stg = StageUtils.ins();
            passStone.x = stg.getWidth() - passStone.width >> 1;
            passStone.y = stg.getHeight() - (200 + passStone.height);
            this.canPass.push(-1);
        }
        else {
            var i = Math.round(Math.random() * 1);
            this.canPass.push(i);
            var dis = this.canPass[this.canPass.length - 1] ? 1 : -1;
            passStone.x = this.canPassStone[this.canPassStone.length - 1].x + dis * (passStone.width / 2);
            passStone.y = this.canPassStone[this.canPassStone.length - 1].y - (passStone.height - 26);
        }
        this.canPassStone.push(passStone);
        if (this.canPass.length >= 2) {
            this.obstacles();
            for (var j = 1; j <= this.noPass[this.noPass.length - 1]; j++) {
                var e = ObjectPool.pop('Stone', Math.floor(Math.random() * 4 + 1));
                this.mapGrp.addChildAt(e, 0);
                var dist = this.canPass[this.canPass.length - 1] ? -1 : 1;
                e.x = this.canPassStone[this.canPassStone.length - 2].x + dist * (passStone.width / 2) * (j);
                e.y = this.canPassStone[this.canPassStone.length - 2].y - (passStone.height - 26) * (j);
                this.notPassStone.push(e);
            }
        }
    };
    Jump.prototype.removeStoneAndDis = function () {
        var stone = this.canPassStone[0];
        var stoneY = stone.y;
        this.canPassStone.splice(0, 1);
        this.canPass.splice(0, 1);
        this.noPass.splice(0, 1);
        stone.stoneDown();
        for (var i = 0; i < this.notPassStone.length; i++) {
            if (this.notPassStone[i].y >= stoneY) {
                var s = this.notPassStone[i];
                this.notPassStone.splice(i, 1);
                s.stoneDown();
            }
        }
    };
    Jump.stoneNum = 10;
    return Jump;
}(BaseSystem));
__reflect(Jump.prototype, "Jump");
var StoneData = (function () {
    function StoneData() {
        this.index = 0;
        this.state = 0;
    }
    return StoneData;
}());
__reflect(StoneData.prototype, "StoneData");
var GameSystem;
(function (GameSystem) {
    GameSystem.jump = Jump.ins.bind(Jump);
})(GameSystem || (GameSystem = {}));
var JumpWin = (function (_super) {
    __extends(JumpWin, _super);
    function JumpWin() {
        var _this = _super.call(this) || this;
        _this.canPassStoneDis = [];
        _this.notPassStoneDis = [];
        _this.canPassStone = [];
        _this.notPassStone = [];
        _this.moveStone = [];
        _this.skinName = 'FrameSkin';
        return _this;
    }
    JumpWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.imgLeft2.y = this.imgLeft1.y - this.imgLeft2.height;
        this.imgRight2.y = this.imgRight1.y - this.imgRight2.height;
        this.jumpIns = Jump.ins();
        this.jumpIns.createMap(this.mapGrp);
        this.createScene();
    };
    JumpWin.prototype.createScene = function () {
        var stg = StageUtils.ins();
        this.stageW = stg.getWidth();
        this.stageH = stg.getHeight();
        var palyer = new Player();
        this.player = palyer;
        this.addChild(this.player);
        var firstStone = this.jumpIns.canPassStone[0];
        this.player.x = firstStone.x + 65;
        this.player.y = firstStone.y - 160;
        this.player.playMC(this.jumpIns.canPass[1]);
        this.addTouchEvent(this, this.playerJump);
    };
    JumpWin.prototype.playerJump = function (e) {
        // if (this.stoneDownTimer.running) {
        // 	this.stoneDownTimer.stop();
        // }
        this.canPassStoneDis = this.jumpIns.canPass;
        this.canPassStone = this.jumpIns.canPassStone;
        var downStone = this.canPassStone[0];
        var touchX = e.stageX;
        if (touchX <= this.stageW / 2) {
            this.player.playMC(1);
            if (this.canPassStoneDis[1] == 0) {
                this.jumpRight();
            }
            else {
                downStone.stoneDown();
                this.jumpDied();
            }
        }
        if (touchX > this.stageW / 2) {
            this.player.playMC(-1);
            if (this.canPassStoneDis[1] == 1) {
                this.jumpRight();
            }
            else {
                downStone.stoneDown();
                this.jumpDied();
            }
        }
    };
    JumpWin.prototype.jumpRight = function () {
        this.jumpIns.mapMove();
        var stgH = StageUtils.ins().getHeight();
        var _loop_2 = function (i) {
            var imgLeft = this_2["imgLeft" + i];
            var imgRight = this_2["imgRight" + i];
            var endY1 = imgLeft.y + 50;
            var endY2 = imgRight.y + 50;
            egret.Tween.removeTweens(imgLeft);
            egret.Tween.removeTweens(imgRight);
            var t1 = egret.Tween.get(imgLeft);
            t1.to({ y: endY1 }, 1000).call(function () {
                if (imgLeft.y >= stgH) {
                    imgLeft.y = -imgLeft.height * 2;
                }
            });
            var t2 = egret.Tween.get(imgRight);
            t2.to({ y: endY2 }, 1000).call(function () {
                if (imgRight.y >= stgH) {
                    imgRight.y = -imgRight.height * 2;
                }
            });
        };
        var this_2 = this;
        for (var i = 1; i < 3; i++) {
            _loop_2(i);
        }
    };
    JumpWin.prototype.jumpDied = function () {
        var vm = ViewManager.ins();
        this.jumpIns.reset();
        vm.close(this);
        vm.open(MainWin);
    };
    JumpWin.prototype.timeOver = function (e) {
        // this.stoneDownTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeOver, this);
        console.log("time is over !");
        this.canPassStone = this.jumpIns.canPassStone;
        var downStone = this.canPassStone[0];
        downStone.stoneDown();
        this.player.playerDied(1);
    };
    return JumpWin;
}(BaseEuiView));
__reflect(JumpWin.prototype, "JumpWin");
ViewManager.ins().reg(JumpWin, LayerManager.UI_Main);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.skinName = 'PlayerSkin';
        return _this;
    }
    Player.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.mc = new MovieClip();
        this.mcGrp.addChild(this.mc);
        this.mc.anchorOffsetX = this.width / 2;
        this.mc.anchorOffsetY = this.height / 2;
    };
    Player.prototype.playMC = function (dir) {
        this.mc.scaleX = dir;
        this.mc.playFile(RES_DIR_EFF + "robotJump", 1, null, false);
    };
    Player.prototype.playerDied = function (n) {
    };
    return Player;
}(BaseView));
__reflect(Player.prototype, "Player");
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
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var MainWin = (function (_super) {
    __extends(MainWin, _super);
    function MainWin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'MainSkin';
        return _this;
    }
    MainWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btnStart, function () {
            // ViewManager.ins().close(this);
            Jump.ins().initGame();
        });
    };
    return MainWin;
}(BaseEuiView));
__reflect(MainWin.prototype, "MainWin");
ViewManager.ins().reg(MainWin, LayerManager.UI_Main);
var WelcomeWin = (function (_super) {
    __extends(WelcomeWin, _super);
    function WelcomeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'WelcomeSkin';
        return _this;
    }
    WelcomeWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.imgTest.source = `${RES_MUST}cover.jpg`;
        var t = egret.Tween.get(this.labTip, { loop: true });
        t.to({ alpha: 0 }, 800).to({ alpha: 1 }, 800);
        this.addTouchEvent(this, function () {
            ViewManager.ins().close(WelcomeWin);
            ViewManager.ins().open(MainWin);
        });
    };
    return WelcomeWin;
}(BaseEuiView));
__reflect(WelcomeWin.prototype, "WelcomeWin");
ViewManager.ins().reg(WelcomeWin, LayerManager.UI_Main);
/**
 * Tips接口.使用Tips通过这里
 */
var TipsControl = (function (_super) {
    __extends(TipsControl, _super);
    /**
     * 构造函数
     */
    function TipsControl() {
        return _super.call(this) || this;
    }
    /**
     * 获取类的单例
     */
    TipsControl.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 显示提示
     */
    TipsControl.prototype.showTips = function (str) {
        var view = ViewManager.ins().open(TipsView);
        DelayOptManager.ins().addDelayOptFunction(view, view.showTips, str);
    };
    return TipsControl;
}(BaseClass));
__reflect(TipsControl.prototype, "TipsControl");
/**
 * 提示项
 */
var TipsItem = (function (_super) {
    __extends(TipsItem, _super);
    /**
     * 构造函数
     */
    function TipsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "tips_skin";
        return _this;
    }
    Object.defineProperty(TipsItem.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (str) {
            var _this = this;
            this._content = str;
            this.label.textFlow = TextFlowMaker.generateTextFlow(str);
            this.bg.y = 0;
            this.bg.alpha = 1;
            // this.bg.width = this.label.width + 80;
            this.bg.bottom = 0;
            this.label.alpha = 1;
            this.label.bottom = 0;
            var tween1 = egret.Tween.get(this.bg);
            tween1.to({ "bottom": 30 }, 500).wait(500).to({ "alpha": 0 }, 200).call(function () {
                DisplayUtils.removeFromParent(_this);
            }, this);
            var tween2 = egret.Tween.get(this.label);
            tween2.to({ "bottom": 30 }, 500).wait(500).to({ "alpha": 0 }, 200);
        },
        enumerable: true,
        configurable: true
    });
    return TipsItem;
}(BaseView));
__reflect(TipsItem.prototype, "TipsItem");
/**
 * 提示视图
 */
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    /**
     * 构造函数
     */
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.tipsList = [];
        return _this;
    }
    TipsView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.touchEnabled = false;
        this.touchChildren = false;
    };
    TipsView.prototype.showTips = function (str) {
        var tipsItem = ObjectPool.pop("TipsItem");
        //解析掉落物的文本信息
        if (str.indexOf("获得[<#c") != -1) {
            var tStr1 = str.split("[<");
            str = tStr1[0] + "<font color=";
            var tStr2 = tStr1[1].split("#");
            str += tStr2[1].slice(1) + ">";
            var tStr3 = tStr2[2].split("/");
            str += tStr3[0] + "</font> ";
            var tStr4 = tStr3[1].split("]");
            str += tStr4[1];
        }
        tipsItem.content = str;
        tipsItem.right = 0;
        this.addChild(tipsItem);
        this.tipsList.unshift(tipsItem);
        tipsItem.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTips, this);
        var size = this.tipsList.length;
        for (var i = size - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.tipsList[i]);
            var tween = egret.Tween.get(this.tipsList[i]);
            tween.to({ "bottom": 150 + i * 30 }, 100)
                .to({ "bottom": 150 + (i + 1) * 30 }, 4000);
        }
    };
    TipsView.prototype.removeTips = function (e) {
        var index = this.tipsList.indexOf(e.currentTarget);
        this.tipsList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTips, this);
        ObjectPool.push(e.currentTarget); //放入对象池
    };
    return TipsView;
}(BaseEuiView));
__reflect(TipsView.prototype, "TipsView");
ViewManager.ins().reg(TipsView, LayerManager.UI_Tips);
;window.Main = Main;