"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LifecycleHooks = (function () {
    function LifecycleHooks() {
        this.inputs = [];
        this.inputsReadyOnce = false;
    }
    LifecycleHooks.prototype.addInput = function (inputKey) {
        this.inputs.push(inputKey);
    };
    LifecycleHooks.prototype.checkInputs = function () {
        var _this = this;
        var allInputsReady = true;
        if (!this.inputsReadyOnce) {
            this.inputs.map(function (input) {
                if ((!_this.hasOwnProperty(input) || _this[input] === undefined || _this[input] === null)) {
                    console.error('missing input: ' + input, _this[input]);
                    allInputsReady = false;
                }
            });
            this.inputsReadyOnce = allInputsReady;
            if (this.inputsReadyOnce) {
                this.onAllInputsReady();
            }
        }
        return allInputsReady;
    };
    LifecycleHooks.prototype.ngAfterViewInit = function () {
        if (!this.inputsReadyOnce) {
            this.checkInputs();
        }
    };
    LifecycleHooks.prototype.ngOnInit = function () {
    };
    LifecycleHooks.prototype.ngDoCheck = function () {
        if (!this.inputsReadyOnce) {
            this.checkInputs();
        }
    };
    LifecycleHooks.prototype.ngAfterContentChecked = function () {
        if (!this.inputsReadyOnce) {
            this.checkInputs();
        }
    };
    LifecycleHooks.prototype.ngAfterViewChecked = function () {
        if (!this.inputsReadyOnce) {
            this.checkInputs();
        }
    };
    LifecycleHooks.prototype.ngOnChanges = function (changes) {
        if (!this.inputsReadyOnce) {
            this.checkInputs();
        }
    };
    LifecycleHooks.prototype.onAllInputsReady = function () {
        // TODO override
    };
    return LifecycleHooks;
}());
exports.LifecycleHooks = LifecycleHooks;
